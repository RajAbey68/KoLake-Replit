const BASE = process.env.BASE_URL || "http://localhost:5000";
const T = (name, method, path, body, expect=200) => ({ name, method, path, body, expect });

const tests = [
  T("Home", "GET", "/"),
  T("Health", "GET", "/api/health"),
  T("Contact Enquiries", "GET", "/api/enquiries"),
  T("Admin Users", "GET", "/api/admin/users"),
  T("Gallery Hero", "GET", "/api/admin/gallery/hero"),
  T("Gallery Management", "GET", "/api/admin/gallery"),
  T("CMS Content", "GET", "/api/admin/cms-content"),
  T("Object Upload", "POST", "/api/objects/upload"),
  T("PMS Availability GET", "GET", "/api/pms/availability"),
  T("PMS Pricing GET", "GET", "/api/pms/pricing"),
  // Functional POSTs
  T("PMS Availability POST", "POST", "/api/pms/availability", { start:"2025-01-01", end:"2025-01-07", rooms:2 }),
  T("PMS Pricing POST", "POST", "/api/pms/pricing", { start:"2025-01-01", end:"2025-01-07", base:350, weekendMarkup:0.25 }),
  T("AI Image Analysis", "POST", "/api/admin/analyze-image", { image:"data:image/jpeg;base64,test", context:"Ko Lake Villa test" }),
  T("AI SEO Generation", "POST", "/api/admin/generate-seo", { content:"Ko Lake Villa luxury lakeside accommodation", pageType:"homepage" }),
  // CORS preflight (expect 204)
  T("CORS OPTIONS /api/pms/pricing", "OPTIONS", "/api/pms/pricing", null, 204)
];

async function runOne({name, method, path, body, expect}) {
  const url = BASE + path;
  try {
    const res = await fetch(url, {
      method,
      headers: body ? { "Content-Type": "application/json" } :
               method==="OPTIONS" ? { "Access-Control-Request-Method":"POST", Origin:"https://test.example" } : undefined,
      body: body ? JSON.stringify(body) : undefined
    });
    const status = res.status;
    let txt = await res.text();
    try { txt = JSON.stringify(JSON.parse(txt)); } catch {}
    const pass = status === expect;
    console.log(`${pass?"✅":"❌"} ${name} [${status} expected ${expect}] ${url}`);
    if (!pass) console.log("  Body:", txt.slice(0,300));
    return pass;
  } catch (e) {
    console.log(`❌ ${name} [ERROR] ${url} ${e.message}`);
    return false;
  }
}

let pass=0;
for (const t of tests) { if (await runOne(t)) pass++; }
console.log(`RESULT: ${pass}/${tests.length} passing`);
console.log(pass === tests.length ? "🚀 ALL SYSTEMS GO - Ready for Vercel deployment" : "⚠️ Some endpoints need attention");