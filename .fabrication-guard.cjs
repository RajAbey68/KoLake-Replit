const fs = require('fs');
const file = 'app/contact/page.tsx';
if (!fs.existsSync(file)) process.exit(0);
const s = fs.readFileSync(file, 'utf8');
// Check for actual placeholder values, not just the word "placeholder" in input attributes
if (/lorem ipsum|dummy|example\.com|test@example/i.test(s) || 
    (s.includes('placeholder') && !/Phone number|kolakevilla\.com/i.test(s))) {
  console.error(`❌ Build blocked: placeholder content detected in ${file}.`);
  process.exit(1);
}
// Ensure required Ko Lake Villa contact info is present
const requiredContacts = ['+94 71 776 5780', '+94 77 315 0602', '+94 71 173 0345'];
const hasAllContacts = requiredContacts.every(phone => s.includes(phone));
if (!hasAllContacts) {
  console.error(`❌ Build blocked: Missing required Ko Lake Villa contact information in ${file}.`);
  process.exit(1);
}
console.log('✓ Contact page validation passed');