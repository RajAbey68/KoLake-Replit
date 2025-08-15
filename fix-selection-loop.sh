#!/usr/bin/env bash
set -euo pipefail

echo "▶ Fix 1: Stabilize selection across refresh (enhanced-gallery-manager.tsx)"
F1="components/admin/enhanced-gallery-manager.tsx"
test -f "$F1" || { echo "⚠️ $F1 not found, skipping Fix 1"; }

if [ -f "$F1" ]; then
  cp "$F1" "$F1.bak"

  # 1) Add selectedImageId and keep selection after fetch/refresh
  awk '
    BEGIN{doneSelId=0; doneKeepFx=0}
    /useState\(/ && /selectedImage/ && doneSelId==0 {
      print;
      print "  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);";
      doneSelId=1; next
    }
    /async function fetchGallery/ && doneKeepFx==0 {
      print;
      print "    const prevId = selectedImageId;";
      print "    // keep selection if same id exists after refresh";
      doneKeepFx=1; next
    }
    /setImages\(/ && doneKeepFx==1 {
      print;
      print "      // try to restore selection";
      print "      if (prevId) {";
      print "        const keep = Array.isArray(data) ? data.find((it:any)=> it.id === prevId || it.filename === prevId) : null;";
      print "        if (keep) { setSelectedImage(keep); setSelectedImageId(keep.id || keep.filename || null); }";
      print "      }";
      next
    }
    {print}
  ' "$F1" > "$F1.tmp" && mv "$F1.tmp" "$F1"

  # 2) Whenever we select an image, also remember its id
  perl -0777 -pe '
    s/onClick=\{\(e\) => \{\s*e\.preventDefault\(\);\s*e\.stopPropagation\(\);\s*setSelectedImage\(([^}]+)\);\s*\}\}/onClick={(e)=>{e.preventDefault();e.stopPropagation();const img=\1; setSelectedImage(img); setSelectedImageId(img?.id||img?.filename||null);}}/gs
  ' -i "$F1" || true

  # 3) Stop propagation on hero toggle + edit buttons so they don't clear selection
  perl -0777 -pe '
    s/(<button[^>]*className="[^"]*hero[^"]*"[^>]*onClick=\{)([^\}]+)\}/$1(e)=>{e.stopPropagation(); ($2)}\}/g;
    s/(<button[^>]*className="[^"]*edit[^"]*"[^>]*onClick=\{)([^\}]+)\}/$1(e)=>{e.stopPropagation(); ($2)}\}/g;
  ' -i "$F1" || true
fi

echo "▶ Fix 2: Add onChange handlers to controlled fields (enhanced-gallery-uploader.tsx)"
F2="components/admin/enhanced-gallery-uploader.tsx"
test -f "$F2" || { echo "⚠️ $F2 not found, skipping Fix 2"; }

if [ -f "$F2" ]; then
  cp "$F2" "$F2.bak"

  # Ensure we have local editable state named selectedGallery + setter
  if ! grep -q "useState" "$F2" | grep -q "setSelectedGallery"; then
    awk '
      BEGIN{done=0}
      /function EnhancedGalleryUploader/ && done==0 {print; next}
      /useState\(/ && done==0 {print; print "  const [selectedGallery, setSelectedGallery] = useState<any>(selectedGallery || null);"; done=1; next}
      {print}
    ' "$F2" > "$F2.tmp" && mv "$F2.tmp" "$F2" || true
  fi

  # Title input -> add onChange
  perl -0777 -pe '
    s/(<input[^>]*type="text"[^>]*\n\s*value=\{selectedGallery\.title[^\}]*\})/$1\n            onChange={(e)=> setSelectedGallery((g:any)=>({...g, title:e.target.value}))}/g
  ' -i "$F2"

  # Alt Text textarea -> add onChange
  perl -0777 -pe '
    s/(<textarea[^>]*\n\s*value=\{selectedGallery\.altText[^\}]*\})/$1\n            onChange={(e)=> setSelectedGallery((g:any)=>({...g, altText:e.target.value}))}/g
  ' -i "$F2"

  # SEO Description textarea -> add onChange
  perl -0777 -pe '
    s/(<textarea[^>]*\n\s*value=\{selectedGallery\.seoDescription[^\}]*\})/$1\n            onChange={(e)=> setSelectedGallery((g:any)=>({...g, seoDescription:e.target.value}))}/g
  ' -i "$F2"

  # Safety: coalesce to empty string so never uncontrolled
  sed -i 's/value={selectedGallery\.title || ""}/value={selectedGallery?.title ?? ""}/g' "$F2"
  sed -i 's/value={selectedGallery\.altText || ""}/value={selectedGallery?.altText ?? ""}/g' "$F2"
  sed -i 's/value={selectedGallery\.seoDescription || ""}/value={selectedGallery?.seoDescription ?? ""}/g' "$F2"
fi

echo "▶ Type check (non-blocking)"
npx tsc --noEmit || true

echo "✅ Done. Now **Stop ▶ Run** in Replit and hard-refresh the admin page."
echo "   Expect: no controlled-input warnings, selection survives refresh, Hero/Edit clicks don't clear selection."