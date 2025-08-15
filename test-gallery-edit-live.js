// Live Gallery Manager Test Suite
// Run in browser console at /admin/ai-gallery

console.log("🧪 GALLERY MANAGER - COMPREHENSIVE TEST SUITE");

// Test 1: Basic Component Health Check
function testComponentHealth() {
  console.log("\n📋 TEST 1: Component Health Check");
  
  const galleryGrid = document.querySelector('[data-testid="gallery-grid"]');
  const editPanel = document.querySelector('[data-testid="gallery-edit-panel"]');
  const uploadTab = document.querySelector('[data-value="upload"]');
  const editTab = document.querySelector('[data-value="edit"]');
  
  console.log("✅ Gallery grid:", galleryGrid ? "Found" : "❌ Missing");
  console.log("✅ Edit panel:", editPanel ? "Found" : "Not displayed (expected if no selection)");
  console.log("✅ Upload tab:", uploadTab ? "Found" : "❌ Missing");
  console.log("✅ Edit tab:", editTab ? "Found" : "❌ Missing");
  
  return {
    galleryGrid: !!galleryGrid,
    uploadTab: !!uploadTab,
    editTab: !!editTab
  };
}

// Test 2: Image Selection Workflow
function testImageSelection() {
  console.log("\n🖱️ TEST 2: Image Selection Workflow");
  
  const images = document.querySelectorAll('[data-testid="gallery-grid"] img');
  console.log(`📊 Found ${images.length} images in gallery`);
  
  if (images.length > 0) {
    console.log("🎯 Clicking first image...");
    images[0].click();
    
    setTimeout(() => {
      const editPanel = document.querySelector('[data-testid="gallery-edit-panel"]');
      const titleField = document.querySelector('input[placeholder*="title" i]');
      const categorySelect = document.querySelector('select');
      
      console.log("✅ Edit panel appeared:", !!editPanel);
      console.log("✅ Title field:", !!titleField);
      console.log("✅ Category dropdown:", !!categorySelect);
      
      if (categorySelect) {
        console.log("📝 Category options:", Array.from(categorySelect.options).map(o => o.text));
      }
    }, 500);
  } else {
    console.log("⚠️ No images found - upload some images first");
  }
}

// Test 3: Category Dropdown Test
function testCategoryDropdown() {
  console.log("\n📝 TEST 3: Category Dropdown");
  
  const categorySelect = document.querySelector('select');
  if (categorySelect) {
    console.log("✅ Category dropdown found");
    console.log("📋 Options:", Array.from(categorySelect.options).map(opt => ({
      value: opt.value,
      text: opt.text
    })));
    
    // Test if it's actually a dropdown (not displaying as text)
    const computedStyle = window.getComputedStyle(categorySelect);
    console.log("🎨 Appearance:", computedStyle.appearance || computedStyle.webkitAppearance);
    
    return true;
  } else {
    console.log("❌ Category dropdown not found - select an image first");
    return false;
  }
}

// Test 4: Save Functionality Test
function testSaveButton() {
  console.log("\n💾 TEST 4: Save Button Test");
  
  const saveButton = document.querySelector('button:has-text("Save Changes"), button[type="submit"]');
  const titleField = document.querySelector('input[placeholder*="title" i]');
  
  if (saveButton && titleField) {
    console.log("✅ Save button found");
    console.log("✅ Title field found");
    
    // Test form interaction
    const originalValue = titleField.value;
    const testValue = "TEST TITLE " + Date.now();
    
    console.log("📝 Changing title to:", testValue);
    titleField.value = testValue;
    titleField.dispatchEvent(new Event('input', { bubbles: true }));
    
    console.log("💾 Clicking save button...");
    saveButton.click();
    
    // Monitor console for API calls
    console.log("👀 Watch browser console for API request logs");
    
    setTimeout(() => {
      console.log("🔄 Restoring original value:", originalValue);
      titleField.value = originalValue;
      titleField.dispatchEvent(new Event('input', { bubbles: true }));
    }, 2000);
    
  } else {
    console.log("❌ Save button or title field not found");
    console.log("- Save button:", !!saveButton);
    console.log("- Title field:", !!titleField);
  }
}

// Test 5: Hero Toggle Test
function testHeroToggle() {
  console.log("\n⭐ TEST 5: Hero Toggle Test");
  
  const heroButtons = document.querySelectorAll('button:has([data-testid="star-icon"]), .hero-toggle, button[aria-label*="hero" i]');
  console.log(`🌟 Found ${heroButtons.length} potential hero toggle buttons`);
  
  if (heroButtons.length > 0) {
    const firstHeroButton = heroButtons[0];
    console.log("🎯 Testing first hero toggle...");
    firstHeroButton.click();
    console.log("👀 Watch for visual changes and console logs");
  }
}

// Run all tests
async function runAllTests() {
  console.log("🚀 STARTING COMPREHENSIVE GALLERY TESTS\n");
  
  const health = testComponentHealth();
  
  if (health.galleryGrid) {
    await new Promise(resolve => {
      testImageSelection();
      setTimeout(resolve, 1000);
    });
    
    await new Promise(resolve => {
      testCategoryDropdown();
      setTimeout(resolve, 500);
    });
    
    await new Promise(resolve => {
      testSaveButton();
      setTimeout(resolve, 500);
    });
    
    testHeroToggle();
  }
  
  console.log("\n✅ TEST SUITE COMPLETE");
  console.log("📊 Check above for any ❌ failures");
}

// Auto-run if in gallery page
if (window.location.pathname.includes('/admin/ai-gallery')) {
  runAllTests();
} else {
  console.log("⚠️ Navigate to /admin/ai-gallery first, then run: runAllTests()");
}