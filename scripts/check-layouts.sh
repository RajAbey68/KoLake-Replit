#!/bin/bash
# === Next.js Pre-Deployment Layout Fixer ===
# Scans for all page.tsx files and auto-creates layout.tsx if missing

set -euo pipefail

echo "🔍 Checking all Next.js pages for layouts..."

for page in $(find app -name "page.tsx"); do
  dir=$(dirname "$page")

  # If this directory has no layout.tsx, create one
  if [[ ! -f "$dir/layout.tsx" ]]; then
    echo "⚠️  Missing layout in $dir → creating layout.tsx"
    cat > "$dir/layout.tsx" <<'EOF'
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section style={{ padding: "1rem" }}>
      {children}
    </section>
  );
}
EOF
  else
    echo "✅ Layout already exists in $dir"
  fi
done

echo "🎉 All pages now have layouts. Safe to deploy."