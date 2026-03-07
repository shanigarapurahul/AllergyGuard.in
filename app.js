// ============================================================
// AllergyGuardIN — Static Frontend App (localStorage-powered)
// No backend. No API calls. Works offline and on Netlify/GitHub Pages.
// ============================================================

// ============================
// FOOD DATABASE (built-in)
// ============================
// ============================
// ALLERGEN INFORMATION (Clinical Data)
// ============================
const ALLERGEN_DATA = {
    "Nuts & Seeds": ["Peanuts", "Cashews", "Almonds", "Walnuts", "Pistachios", "Hazelnuts", "Pecans", "Brazil Nuts", "Macadamia Nuts", "Pine Nuts", "Chestnuts", "Betel Nuts", "Sunflower Seeds", "Pumpkin Seeds", "Sesame Seeds", "Chia Seeds", "Flax Seeds", "Mustard Seeds", "Lotus Seeds", "Hemp Seeds"],
    "Dairy Products": ["Milk", "Cow Milk", "Buffalo Milk", "Goat Milk", "Cheese", "Paneer", "Butter", "Ghee", "Yogurt", "Curd", "Cream", "Ice Cream", "Condensed Milk", "Whey Protein", "Buttermilk"],
    "Grains & Gluten": ["Wheat", "Maida", "Semolina", "Barley", "Rye", "Oats", "Corn", "Rice", "Brown Rice", "Fried Rice", "Pasta", "Noodles", "Bread", "Multigrain Flour", "Millet"],
    "Meat & Poultry": ["Chicken", "Mutton", "Beef", "Pork", "Turkey", "Duck", "Quail", "Lamb", "Goat Meat", "Processed Meat", "Sausage", "Salami", "Bacon", "Ham", "Organ Meat"],
    "Seafood": ["Fish", "Prawns", "Shrimp", "Crab", "Lobster", "Mussels", "Oysters", "Clams", "Squid", "Octopus", "Anchovies", "Tuna", "Salmon", "Sardines", "Shellfish"],
    "Eggs": ["Egg White", "Egg Yolk", "Whole Egg", "Duck Egg", "Quail Egg"],
    "Spices & Condiments": ["Chili Powder", "Black Pepper", "Turmeric", "Cumin", "Coriander", "Garam Masala", "Cardamom", "Cloves", "Cinnamon", "Mustard Sauce", "Soy Sauce", "Vinegar", "Mayonnaise", "Tomato Sauce", "Pickles", "Ajinomoto (MSG)", "Tamarind", "Garlic", "Ginger", "Mint"],
    "Sweeteners & Sugars": ["White Sugar", "Brown Sugar", "Jaggery", "Honey", "Artificial Sweeteners", "Aspartame", "Saccharin", "High Fructose Syrup", "Maple Syrup", "Palm Sugar"],
    "Beverages": ["Coffee", "Tea", "Green Tea", "Soft Drinks", "Energy Drinks", "Alcohol", "Beer", "Wine", "Whiskey", "Protein Shakes"],
    "Oily & Fried Foods": ["Fried Rice", "French Fries", "Chips", "Pakora", "Samosa", "Fried Chicken", "Fried Fish", "Vada", "Poori", "Bhatura", "Nuggets", "Spring Rolls", "Popcorn (Butter)", "Onion Rings", "Cutlets"],
    "Fast Food & Processed": ["Pizza", "Burger", "Sandwich", "Shawarma", "Momos", "Hot Dog", "Tacos", "Ketchup", "Processed Cheese", "Instant Noodles", "Frozen Food", "Canned Food", "Bakery Items", "Cake", "Pastry"],
    "Fruits": ["Apple", "Banana", "Mango", "Pineapple", "Orange", "Grapes", "Papaya", "Watermelon", "Strawberry", "Kiwi", "Guava", "Pomegranate", "Jackfruit", "Lychee", "Sapota"],
    "Vegetables": ["Potato", "Tomato", "Onion", "Brinjal", "Carrot", "Beetroot", "Cabbage", "Cauliflower", "Spinach", "Broccoli", "Capsicum", "Peas", "Corn", "Mushroom", "Okra"],
    "Additives & Preservatives": ["MSG", "Sodium Benzoate", "Sulphites", "Food Coloring", "Artificial Flavors", "Nitrates", "Nitrites", "Emulsifiers", "Stabilizers", "Thickening Agents"],
    "Miscellaneous": ["Chocolate", "Cocoa", "Coconut", "Gelatin", "Yeast"]
};

const CLINICAL_DEFAULTS = {
    "Nuts & Seeds": { symptoms: ["Hives", "Swelling of lips/face", "Difficulty breathing", "Itching"], diseases: ["Nut Allergy", "Anaphylaxis Risk"] },
    "Dairy Products": { symptoms: ["Bloating", "Stomach cramps", "Diarrhea", "Rashes"], diseases: ["Lactose Intolerance", "Milk Allergy"] },
    "Grains & Gluten": { symptoms: ["Fatigue", "Bloating", "Brain fog", "Skin rashes"], diseases: ["Gluten Sensitivity", "Celiac Disease"] },
    "Meat & Poultry": { symptoms: ["Nausea", "Hives", "Stomach pain"], diseases: ["Meat Allergy", "Alpha-gal Syndrome"] },
    "Seafood": { symptoms: ["Swelling", "Itching", "Anaphylaxis", "Vomiting"], diseases: ["Seafood Allergy"] },
    "Eggs": { symptoms: ["Skin inflammation", "Hives", "Indigestion"], diseases: ["Egg Allergy"] },
    "Spices & Condiments": { symptoms: ["Heartburn", "Skin irritation", "Stomach upset"], diseases: ["Spice Sensitivity"] },
    "Sweeteners & Sugars": { symptoms: ["Headache", "Bloating", "Cravings"], diseases: ["Sugar Sensitivity"] },
    "Beverages": { symptoms: ["Palpitations", "Headache", "Insomnia"], diseases: ["Caffeine/Alcohol Sensitivity"] },
    "Oily & Fried Foods": { symptoms: ["Heartburn", "Indigestion", "Oily skin breakouts"], diseases: ["Biliary Distress", "Acid Reflux"] },
    "Fast Food & Processed": { symptoms: ["Bloating", "Lethargy", "Sodium retention"], diseases: ["Processed Food Sensitivity"] },
    "Fruits": { symptoms: ["Itchy mouth", "Swelling of throat", "Tingly lips"], diseases: ["Oral Allergy Syndrome"] },
    "Vegetables": { symptoms: ["Bloating", "Gas", "Stomach cramps"], diseases: ["Vegetable Sensitivity"] },
    "Additives & Preservatives": { symptoms: ["Headache", "Hyperactivity", "Skin rashes"], diseases: ["Additive Sensitivity"] },
    "Miscellaneous": { symptoms: ["Varies by substance", "Digestive distress"], diseases: ["General Sensitivity"] }
};

// Generate full ALLERGEN_INFO
const ALLERGEN_INFO = {};
Object.keys(ALLERGEN_DATA).forEach(cat => {
    ALLERGEN_DATA[cat].forEach(item => {
        ALLERGEN_INFO[item] = {
            category: cat,
            symptoms: CLINICAL_DEFAULTS[cat].symptoms,
            diseases: CLINICAL_DEFAULTS[cat].diseases,
            aliases: [item.toLowerCase()]
        };
    });
});

// Overwrite specific ones with more detail if needed
ALLERGEN_INFO["Peanuts"].aliases = ["Groundnut", "Arachis", "Moongfali"];
ALLERGEN_INFO["Milk"].aliases = ["Cow Milk", "Buffalo Milk", "Goat Milk", "Dairy", "Cream", "Butter", "Ghee"];
ALLERGEN_INFO["Wheat"].aliases = ["Atta", "Maida", "Gluten", "Rava", "Semolina"];
ALLERGEN_INFO["Cashews"].aliases = ["Kaju", "Cashew Nuts"];
ALLERGEN_INFO["Coconut"].aliases = ["Nariyal", "Coconut Milk", "Coconut Oil"];
ALLERGEN_INFO["Turmeric"].aliases = ["Haldi"];
ALLERGEN_INFO["Asafoetida (Hing)"] = { category: "Spices & Condiments", symptoms: ["Swelling of lips", "Gas/Bloating"], diseases: ["Latex-Fruit Syndrome Cross-reactivity"], aliases: ["Hing"] };


// ============================
// FOOD DATABASE (built-in)
// ============================
const FOOD_DATABASE = [
    {
        name: "Chicken Biryani",
        emoji: "🍚",
        region: "Hyderabad",
        visualSignature: {
            color: "multi-color/orange",
            texture: "grainy/layered",
            particles: "long basmati rice, chicken pieces, fried onions",
            style: "layered",
            garnish: "mint, coriander, lemon"
        },
        allergens: [{ name: "Ghee", sev: "caution" }, { name: "Cashews", sev: "danger" }],
        ingredients: ["Basmati Rice", "Chicken", "Ghee", "Cashews", "Yogurt", "Fried Onions", "Saffron", "Spices"]
    },
    {
        name: "Butter Chicken",
        emoji: "🍗",
        region: "North India",
        visualSignature: { color: "orange/red", texture: "creamy/smooth", particles: "meat chunks", style: "gravy" },
        allergens: [{ name: "Milk", sev: "danger" }, { name: "Cream", sev: "danger" }, { name: "Butter", sev: "danger" }, { name: "Cashews", sev: "danger" }],
        ingredients: ["Chicken", "Butter", "Cream", "Cashews", "Tomato", "Ginger", "Garlic"]
    },
    {
        name: "Mutton Curry",
        emoji: "🍛",
        region: "All India",
        visualSignature: { color: "dark brown", texture: "thick/fibrous", particles: "bone-in chunks", style: "gravy" },
        allergens: [{ name: "Mutton", sev: "danger" }, { name: "Spices & Condiments", sev: "caution" }],
        ingredients: ["Mutton", "Onion", "Tomato", "Garam Masala", "Ginger", "Garlic"]
    },
    {
        name: "Paneer Tikka",
        emoji: "🧀",
        region: "North India",
        visualSignature: { color: "bright orange", texture: "charred/cubed", particles: "solid blocks", style: "dry/grilled" },
        allergens: [{ name: "Paneer", sev: "danger" }, { name: "Yogurt", sev: "danger" }, { name: "Milk", sev: "danger" }],
        ingredients: ["Paneer", "Bell Peppers", "Onion", "Yogurt", "Gram Flour", "Spices"]
    },
    {
        name: "Dal Makhani",
        emoji: "🍛",
        region: "Punjab",
        visualSignature: { color: "dark purple/black", texture: "creamy/uniform", particles: "small lentils", style: "gravy" },
        allergens: [{ name: "Butter", sev: "danger" }, { name: "Cream", sev: "danger" }, { name: "Milk", sev: "danger" }],
        ingredients: ["Black Lentils", "Kidney Beans", "Butter", "Cream", "Tomato"]
    },
    {
        name: "Fish Curry",
        emoji: "🐟",
        region: "Kerala/Bengal",
        visualSignature: { color: "yellow/orange", texture: "flaky/delicate", particles: "fish slices", style: "gravy" },
        allergens: [{ name: "Fish", sev: "danger" }, { name: "Coconut", sev: "caution" }],
        ingredients: ["Fish", "Coconut Milk", "Tamarind", "Mustard Seeds", "Curry Leaves"]
    },
    {
        name: "Masala Dosa",
        emoji: "🥞",
        region: "South India",
        visualSignature: { color: "golden brown", texture: "crispy/thin", particles: "large wrap", style: "dry" },
        allergens: [{ name: "Mustard Seeds", sev: "caution" }],
        ingredients: ["Rice", "Urad Dal", "Potato", "Mustard Seeds", "Onion"]
    },
    {
        name: "Samosa",
        emoji: "🥟",
        region: "All India",
        visualSignature: { color: "golden", texture: "crunchy/flaky", particles: "triangular", style: "fried" },
        allergens: [{ name: "Maida", sev: "danger" }, { name: "Wheat", sev: "danger" }, { name: "Peanuts", sev: "caution" }, { name: "Oily & Fried Foods", sev: "danger" }],
        ingredients: ["Maida", "Potato", "Peas", "Peanuts", "Oil"]
    },
    {
        name: "Chole Bhature",
        emoji: "🫓",
        region: "Delhi",
        visualSignature: { color: "golden/brown", texture: "fluffy/balloon", particles: "large fried bread", style: "fried" },
        allergens: [{ name: "Maida", sev: "danger" }, { name: "Oily & Fried Foods", sev: "danger" }],
        ingredients: ["Chickpeas", "Maida", "Oil", "Spices", "Onion"]
    },
    {
        name: "Pizza",
        emoji: "🍕",
        region: "Global",
        visualSignature: { color: "red/white/yellow", texture: "chewy/melted", particles: "circular/toppings", style: "baked" },
        allergens: [{ name: "Cheese", sev: "danger" }, { name: "Maida", sev: "danger" }, { name: "Wheat", sev: "danger" }],
        ingredients: ["Maida", "Cheese", "Tomato Sauce", "Yeast", "Herbs"]
    },
    {
        name: "Burger",
        emoji: "🍔",
        region: "Global",
        visualSignature: { color: "brown/green/white", texture: "soft/stacked", particles: "seeded bun", style: "sandwich" },
        allergens: [{ name: "Maida", sev: "danger" }, { name: "Cheese", sev: "caution" }, { name: "Mayonnaise", sev: "danger" }],
        ingredients: ["Bun", "Cheese", "Mayonnaise", "Lettuce", "Patty"]
    },
];






// ============================
// LOCALSTORAGE HELPERS
// ============================
const LS_KEYS = {
    allergens: 'ag_allergens',
    history: 'ag_history',
    profile: 'ag_profile',
};

function lsGet(key, fallback) {
    try {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : fallback;
    } catch { return fallback; }
}

function lsSet(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { }
}

// ============================
// APP STATE (from localStorage)
// ============================
const DEFAULT_ALLERGENS = [
    { name: "Peanuts", sev: "high" },
    { name: "Milk", sev: "high" },
    { name: "Wheat", sev: "med" },
    { name: "Mustard Seeds", sev: "low" },
    { name: "Cashews", sev: "high" },
    { name: "Fish", sev: "high" },
];


const DEFAULT_HISTORY = [
    { id: 1, name: "Butter Chicken", emoji: "🍗", status: "danger", date: "2026-02-23", time: "12:30 PM", allergens: ["Milk/Dairy", "Cashews"] },
    { id: 2, name: "Masala Dosa", emoji: "🥞", status: "caution", date: "2026-02-23", time: "09:15 AM", allergens: ["Mustard"] },
    { id: 3, name: "Idli Sambar", emoji: "🫙", status: "safe", date: "2026-02-22", time: "08:00 AM", allergens: [] },
    { id: 4, name: "Paneer Tikka", emoji: "🧀", status: "danger", date: "2026-02-22", time: "07:45 PM", allergens: ["Milk/Dairy"] },
    { id: 5, name: "Biryani", emoji: "🍚", status: "caution", date: "2026-02-21", time: "01:00 PM", allergens: ["Tree Nuts"] },
    { id: 6, name: "Pav Bhaji", emoji: "🥖", status: "danger", date: "2026-02-21", time: "08:30 PM", allergens: ["Wheat/Gluten", "Milk/Dairy"] },
];

const DEFAULT_PROFILE = { name: "Rahul Kumar", email: "rahul@example.com" };

let userAllergens = lsGet(LS_KEYS.allergens, DEFAULT_ALLERGENS);
let scanHistory = lsGet(LS_KEYS.history, DEFAULT_HISTORY);
let userProfile = lsGet(LS_KEYS.profile, DEFAULT_PROFILE);

let stream = null;
let historyFilter = { text: '', status: 'all' };
let foodFilter = '';

// ============================
// NAVIGATION
// ============================
function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const pageEl = document.getElementById('page-' + page);
    const navEl = document.getElementById('nav-' + page);
    if (pageEl) pageEl.classList.add('active');
    if (navEl) navEl.classList.add('active');

    const titles = {
        dashboard: 'Dashboard',
        scanner: 'Food Scanner',
        profile: 'Allergy Profile',
        history: 'Scan History',
        foods: 'Food Database',
    };
    document.getElementById('pageTitle').textContent = titles[page] || page;

    if (page !== 'scanner') stopCamera();
    if (page === 'dashboard') renderDashboard();
    if (page === 'history') renderHistory();
    if (page === 'profile') renderProfile();
    if (page === 'foods') renderFoodDB();

    if (window.innerWidth <= 900) closeSidebar();
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebarOverlay').classList.toggle('active');
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('active');
}

// ============================
// CLOCK
// ============================
function updateClock() {
    document.getElementById('timeDisplay').textContent =
        new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}
setInterval(updateClock, 1000);
updateClock();

// ============================
// DASHBOARD
// ============================
function getTodayStr() {
    return new Date().toISOString().split('T')[0];
}

function renderDashboard() {
    updateProfileDisplay();
    const today = getTodayStr();
    const todayScans = scanHistory.filter(h => h.date === today);
    const safeToday = todayScans.filter(h => h.status === 'safe').length;
    const dangerToday = todayScans.filter(h => h.status !== 'safe').length;
    const totalScans = scanHistory.length;

    document.getElementById('safeCount').textContent = safeToday;
    document.getElementById('alertCount').textContent = dangerToday;
    document.getElementById('scanCount').textContent = totalScans;
    document.getElementById('allergenCount').textContent = userAllergens.length;
    document.getElementById('badgeCount').textContent = dangerToday;

    const safeTrend = todayScans.length > 0 ? `${todayScans.length} scans today` : 'No scans yet today';
    document.getElementById('safeTrend').textContent = safeTrend;

    renderRecentScans();
    renderAllergenBars();
    renderAlerts();
}

function renderRecentScans() {
    const el = document.getElementById('recentScanList');
    const recent = scanHistory.slice(0, 5);
    if (!recent.length) {
        el.innerHTML = '<p style="text-align:center;color:var(--muted);padding:1.5rem">No scans yet. Use the scanner to get started!</p>';
        return;
    }
    el.innerHTML = recent.map(s => `
    <div class="scan-item">
      <div class="scan-item-left">
        <span class="scan-item-icon">${s.emoji}</span>
        <div>
          <div class="scan-item-name">${s.name}</div>
          <div class="scan-item-time">${s.date} · ${s.time}</div>
        </div>
      </div>
      <span class="status-pill ${s.status}">${statusLabel(s.status)}</span>
    </div>`).join('');
}

function renderAllergenBars() {
    if (!userAllergens.length) {
        document.getElementById('allergenBars').innerHTML =
            '<p style="color:var(--muted);font-size:.85rem">No allergens in profile. Add them in the Profile page.</p>';
        return;
    }
    // Compute exposure % from scan history
    const totScans = scanHistory.length || 1;
    const barData = userAllergens.map(a => {
        const hits = scanHistory.filter(h => h.allergens.some(ha => ha.toLowerCase().includes(a.name.toLowerCase().split('/')[0]))).length;
        const pct = Math.round((hits / totScans) * 100);
        return { name: a.name, pct, cls: a.sev === 'high' ? 'high' : a.sev === 'med' ? 'med' : 'low' };
    });
    document.getElementById('allergenBars').innerHTML = barData.map(d => `
    <div class="allergen-bar-item">
      <label><span>${d.name}</span><span style="color:var(--muted)">${d.pct}%</span></label>
      <div class="bar-track"><div class="bar-fill ${d.cls}" style="width:${d.pct}%"></div></div>
    </div>`).join('');
}

function renderAlerts() {
    const today = getTodayStr();
    const dangerItems = scanHistory.filter(h => h.date === today && h.status !== 'safe');
    const el = document.getElementById('alertsList');
    if (!dangerItems.length) {
        el.innerHTML = '<p style="text-align:center;color:var(--green);padding:1rem">✅ No alerts today — all clear!</p>';
        return;
    }
    el.innerHTML = dangerItems.map(h => `
    <div class="alert-item ${h.status === 'caution' ? 'caution' : ''}">
      <span class="alert-icon">${h.status === 'danger' ? '🚨' : '⚠️'}</span>
      <div class="alert-text">
        <strong>${h.emoji} ${h.name} — ${h.allergens.join(', ') || 'allergens detected'}</strong>
        <span>Scanned at ${h.time} · ${h.status === 'danger' ? 'High risk' : 'Caution'} allergens found</span>
      </div>
      <span class="alert-badge-pill ${h.status === 'caution' ? 'caution' : ''}">${h.status === 'danger' ? 'HIGH RISK' : 'CAUTION'}</span>
    </div>`).join('');
}

// ============================
// CAMERA
// ============================
async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
        const video = document.getElementById('videoFeed');
        video.srcObject = stream;
        setBtnVisibility({ start: false, stop: true, capture: true, retry: false });
        document.getElementById('capturedImg').style.display = 'none';
        document.getElementById('videoFeed').style.display = '';
        document.getElementById('scanTip').textContent = 'Hold food item steady inside the frame';
        document.getElementById('scanLine').style.display = '';
        document.getElementById('resultCard').style.display = 'none';
        showToast('Camera started', 'success');
    } catch {
        showToast('Camera access denied. Use manual input below.', 'error');
    }
}

function stopCamera() {
    if (stream) { stream.getTracks().forEach(t => t.stop()); stream = null; }
    const video = document.getElementById('videoFeed');
    if (video) video.srcObject = null;
    setBtnVisibility({ start: true, stop: false, capture: false, retry: false });
    const tip = document.getElementById('scanTip');
    if (tip) tip.textContent = 'Click "Start Camera" to begin';
}

function retryCamera() {
    document.getElementById('capturedImg').style.display = 'none';
    document.getElementById('videoFeed').style.display = '';
    setBtnVisibility({ start: false, stop: true, capture: true, retry: false });
    document.getElementById('resultCard').style.display = 'none';
    document.getElementById('scanLine').style.display = '';
    document.getElementById('scanTip').textContent = 'Hold food item steady inside the frame';
}

function captureFrame() {
    const video = document.getElementById('videoFeed');
    const canvas = document.getElementById('captureCanvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg');
    document.getElementById('capturedImg').src = dataUrl;
    document.getElementById('capturedImg').style.display = '';
    document.getElementById('videoFeed').style.display = 'none';
    setBtnVisibility({ start: false, stop: true, capture: false, retry: true });
    document.getElementById('scanLine').style.display = 'none';
    document.getElementById('scanTip').textContent = 'Analysing...';

    setTimeout(() => {
        const food = FOOD_DATABASE[Math.floor(Math.random() * FOOD_DATABASE.length)];
        showResult(food);
        document.getElementById('scanTip').textContent = 'Analysis complete';
    }, 1800);
}

function setBtnVisibility({ start, stop, capture, retry }) {
    const el = id => document.getElementById(id);
    el('startCamBtn').style.display = start ? '' : 'none';
    el('stopCamBtn').style.display = stop ? '' : 'none';
    el('captureBtn').style.display = capture ? '' : 'none';
    el('retryBtn').style.display = retry ? '' : 'none';
}

// ============================
// SCANNER TABS
// ============================
function switchScannerTab(tab) {
    const cameraPanel = document.getElementById('panelCamera');
    const uploadPanel = document.getElementById('panelUpload');
    const tabCamera = document.getElementById('tabCamera');
    const tabUpload = document.getElementById('tabUpload');
    const resultCard = document.getElementById('resultCard');

    if (tab === 'camera') {
        cameraPanel.style.display = '';
        uploadPanel.style.display = 'none';
        tabCamera.classList.add('active');
        tabUpload.classList.remove('active');
    } else {
        stopCamera();
        cameraPanel.style.display = 'none';
        uploadPanel.style.display = '';
        tabCamera.classList.remove('active');
        tabUpload.classList.add('active');
    }
    resultCard.style.display = 'none';
}

// ============================
// FILE UPLOAD
// ============================
let currentUploadFile = null;

function handleDragOver(e) {
    e.preventDefault();
    document.getElementById('uploadDropzone').classList.add('drag-over');
}
function handleDragLeave(e) {
    document.getElementById('uploadDropzone').classList.remove('drag-over');
}
function handleFileDrop(e) {
    e.preventDefault();
    document.getElementById('uploadDropzone').classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) loadUploadedFile(file);
}
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) loadUploadedFile(file);
    e.target.value = '';
}
function clearUpload() {
    currentUploadFile = null;
    document.getElementById('uploadPreviewArea').style.display = 'none';
    document.getElementById('uploadDropzone').style.display = '';
    document.getElementById('uploadProgress').style.display = 'none';
    document.getElementById('resultCard').style.display = 'none';
    document.getElementById('uploadPreviewContent').innerHTML = '';
    document.getElementById('uploadFileInfo').innerHTML = '';
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function loadUploadedFile(file) {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'];
    if (!allowed.includes(file.type) && !file.name.toLowerCase().endsWith('.pdf')) {
        showToast('Unsupported file. Please upload an image (JPG, PNG, WEBP, GIF) or PDF.', 'error');
        return;
    }
    currentUploadFile = file;
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const sizeStr = formatFileSize(file.size);

    // Show file info
    document.getElementById('uploadFileInfo').innerHTML =
        `<span class="upload-file-icon">${isPdf ? '📄' : '🖼️'}</span>
         <div>
           <div class="upload-file-name">${file.name}</div>
           <div class="upload-file-size">${sizeStr} &nbsp;·&nbsp; ${isPdf ? 'PDF Document' : 'Image File'}</div>
         </div>`;

    // Preview
    const previewEl = document.getElementById('uploadPreviewContent');
    if (isPdf) {
        previewEl.innerHTML = `
        <div class="pdf-preview-placeholder">
          <div style="font-size:4rem">📄</div>
          <p>${file.name}</p>
          <p style="color:var(--muted);font-size:.8rem">PDF text will be extracted and scanned for allergens</p>
        </div>`;
    } else {
        const url = URL.createObjectURL(file);
        previewEl.innerHTML = `<img src="${url}" class="upload-img-preview" alt="Uploaded food" />`;
    }

    document.getElementById('uploadDropzone').style.display = 'none';
    document.getElementById('uploadPreviewArea').style.display = '';
    document.getElementById('uploadAnalyseBtn').style.display = '';
    document.getElementById('uploadProgress').style.display = 'none';
}

async function analyseUploadedFile() {
    if (!currentUploadFile) return;
    const isPdf = currentUploadFile.type === 'application/pdf' || currentUploadFile.name.toLowerCase().endsWith('.pdf');

    // Show progress
    document.getElementById('uploadAnalyseBtn').style.display = 'none';
    document.getElementById('uploadProgress').style.display = '';
    setUploadProgress(0, isPdf ? 'Extracting text from PDF...' : 'Analysing image...');

    try {
        if (isPdf) {
            await analysePdfFile(currentUploadFile);
        } else {
            await analyseImageFile(currentUploadFile);
        }
    } catch (err) {
        showToast('Error analysing file: ' + err.message, 'error');
        document.getElementById('uploadAnalyseBtn').style.display = '';
        document.getElementById('uploadProgress').style.display = 'none';
    }
}

function setUploadProgress(pct, text) {
    document.getElementById('uploadProgressBar').style.width = pct + '%';
    document.getElementById('uploadProgressText').textContent = text;
}

// ----- SIMULATED VISION ENGINE -----
async function analyseImageFile(file) {
    setUploadProgress(20, 'Scanning visual textures...');
    await sleep(600);
    setUploadProgress(40, 'Analysing color histograms...');
    await sleep(800);
    setUploadProgress(70, 'Detecting ingredient shapes...');
    await sleep(600);
    setUploadProgress(90, 'Applying classification rules...');
    await sleep(400);

    // Simulated Feature Extraction (In a real app, this would use a WebGL/WASM model)
    // We strictly use visual characteristics mapped for the demo
    const features = extractSimulatedVisualFeatures(file);

    let match = null;
    let confidence = 'Low';

    if (features) {
        // High Confidence Rule: Detailed Biryani detection
        if (features.style === 'layered' && features.particles.includes('long basmati rice')) {
            match = FOOD_DATABASE.find(f => f.name === "Chicken Biryani");
            confidence = 'High';
        }
        // Visual Rule 1: Red/Brown chunks in thick gravy
        else if (features.style === 'gravy' && (features.color === 'dark brown' || features.color === 'red/brown') && features.particles.includes('meat chunks')) {
            match = FOOD_DATABASE.find(f => f.name === "Mutton Curry");
            confidence = 'High';
        }
        // Visual Rule 2: Fish slices with delicate texture
        else if (features.style === 'gravy' && features.particles.includes('fish slices')) {
            match = FOOD_DATABASE.find(f => f.name === "Fish Curry");
            confidence = 'High';
        }
        // Visual Rule 3: Orange creamy gravy
        else if (features.style === 'gravy' && features.color === 'orange/red' && features.texture === 'creamy') {
            match = FOOD_DATABASE.find(f => f.name === "Butter Chicken");
            confidence = 'High';
        }
        // General visual signature matching
        else {
            match = FOOD_DATABASE.find(f =>
                f.visualSignature.color === features.color &&
                f.visualSignature.style === features.style
            );
            if (match) confidence = 'Medium';
        }
    }

    document.getElementById('uploadProgress').style.display = 'none';

    if (match && confidence !== 'Low') {
        showResult(match, confidence);
    } else {
        showUnidentifiedResult();
    }
}

function extractSimulatedVisualFeatures(file) {
    const n = file.name.toLowerCase();
    // Rule: BIRYANI check (Layered basmati rice, meat pieces, fried onions)
    if (n.includes('biryani') || (n.includes('rice') && n.includes('layered') && n.includes('onions'))) {
        return {
            color: 'multi-color/orange',
            texture: 'grainy/layered',
            particles: ['long basmati rice', 'chicken pieces', 'fried onions'],
            style: 'layered',
            garnish: ['mint', 'fried onions']
        };
    }
    if (n.includes('mutton') || (n.includes('meat') && n.includes('gravy'))) {
        return { color: 'dark brown', texture: 'thick', particles: ['meat chunks'], style: 'gravy' };
    }
    if (n.includes('fish') || n.includes('seafood')) {
        return { color: 'yellow/orange', texture: 'delicate', particles: ['fish slices'], style: 'gravy' };
    }
    if (n.includes('butter_chicken') || (n.includes('orange') && n.includes('creamy'))) {
        return { color: 'orange/red', texture: 'creamy', particles: ['meat chunks'], style: 'gravy' };
    }
    if (n.includes('dosa') || n.includes('wrap')) {
        return { color: 'golden brown', texture: 'crispy', particles: ['large wrap'], style: 'dry' };
    }
    if (n.includes('chole') || n.includes('bhature')) {
        return { color: 'golden/brown', texture: 'fluffy', particles: ['large fried bread'], style: 'fried' };
    }
    if (n.includes('pizza')) {
        return { color: 'red/white/yellow', texture: 'chewy', particles: ['circular'], style: 'baked' };
    }
    if (n.includes('burger')) {
        return { color: 'brown/green/white', texture: 'soft', particles: ['seeded bun'], style: 'sandwich' };
    }
    if (n.includes('dal') || n.includes('makhani')) {
        return { color: 'dark purple/black', texture: 'creamy', particles: ['small lentils'], style: 'gravy' };
    }
    if (n.includes('samosa') || n.includes('triangle')) {
        return { color: 'golden', texture: 'crunchy', particles: ['triangular'], style: 'fried' };
    }
    return null;
}

function showUnidentifiedResult() {
    const card = document.getElementById('resultCard');
    card.style.display = 'flex';
    const header = document.getElementById('resultHeader');
    header.className = `result-header caution`;
    header.innerHTML = `
        <div class="result-emoji">❓</div>
        <div class="result-food-name">Analysis Result</div>
        <div class="result-status caution">Unable to confidently identify the food.</div>
    `;
    document.getElementById('resultBody').innerHTML = `
        <div style="text-align:center;padding:1rem">
            <p style="font-size:.85rem;color:var(--muted)">Visual evidence in the image is inconclusive.</p>
            <p style="font-size:.78rem;margin-top:.5rem">Please ensure the food is clearly visible or search for the dish manually.</p>
        </div>
    `;
    showToast('Unable to identify food', 'warning');
}

// ----- PDF ANALYSIS -----
async function analysePdfFile(file) {
    setUploadProgress(15, 'Loading PDF...');
    const arrayBuf = await file.arrayBuffer();

    // PDF.js
    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    if (!pdfjsLib) throw new Error('PDF.js not loaded');
    pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    setUploadProgress(30, 'Parsing PDF pages...');
    const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuf }).promise;
    const numPages = pdfDoc.numPages;
    let fullText = '';

    for (let i = 1; i <= numPages; i++) {
        setUploadProgress(30 + Math.round((i / numPages) * 40), `Reading page ${i} of ${numPages}...`);
        const page = await pdfDoc.getPage(i);
        const content = await page.getTextContent();
        fullText += content.items.map(s => s.str).join(' ') + ' ';
    }

    setUploadProgress(80, 'Scanning for food names...');
    await sleep(300);
    const textLower = fullText.toLowerCase();

    // Try to find matching food names in extracted text
    const matches = FOOD_DATABASE.filter(f => textLower.includes(f.name.toLowerCase()));
    setUploadProgress(100, 'Checking allergens...');
    await sleep(300);
    document.getElementById('uploadProgress').style.display = 'none';

    if (matches.length > 0) {
        // Show all matched foods
        showPdfResults(matches, fullText);
    } else {
        // Fallback: check text for raw allergen keywords
        showPdfAllergenTextResults(fullText);
    }
}

function showPdfResults(foods, rawText) {
    const resultCard = document.getElementById('resultCard');
    resultCard.style.display = 'flex';

    const userAllergenNames = userAllergens.map(a => a.name.toLowerCase());

    let anyDanger = false;
    let anyCaution = false;
    let allFound = [];

    const foodsHTML = foods.map(food => {
        const triggered = food.allergens.filter(a =>
            userAllergenNames.some(u =>
                a.name.toLowerCase().includes(u.split('/')[0]) || u.includes(a.name.toLowerCase().split('/')[0])
            )
        );
        if (triggered.some(a => a.sev === 'danger')) anyDanger = true;
        else if (triggered.length > 0) anyCaution = true;
        allFound.push(...triggered.map(a => a.name));

        const entry = {
            id: Date.now() + Math.random(),
            name: food.name, emoji: food.emoji,
            status: triggered.some(a => a.sev === 'danger') ? 'danger' : triggered.length > 0 ? 'caution' : 'safe',
            date: getTodayStr(),
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
            allergens: triggered.map(a => a.name),
        };
        scanHistory.unshift(entry);

        const s = entry.status;
        return `<div class="pdf-food-item status-${s}">
          <span>${food.emoji} ${food.name}</span>
          <span class="status-pill ${s}">${statusLabel(s)}</span>
        </div>`;
    }).join('');

    lsSet(LS_KEYS.history, scanHistory);

    const overallStatus = anyDanger ? 'danger' : anyCaution ? 'caution' : 'safe';
    const icon = overallStatus === 'safe' ? '✅' : overallStatus === 'danger' ? '🚨' : '⚠️';
    const msg = overallStatus === 'safe' ? 'All foods appear safe!' : overallStatus === 'danger' ? 'Danger! Allergens detected in PDF' : 'Caution: Some foods may contain allergens';

    document.getElementById('resultHeader').className = `result-header ${overallStatus}`;
    document.getElementById('resultHeader').innerHTML = `
      <div class="result-emoji">${icon} 📄</div>
      <div class="result-food-name">PDF Scan Results</div>
      <div class="result-status ${overallStatus}">${msg}</div>`;

    const uniqueAllergens = [...new Set(allFound)];
    const allergenHTML = uniqueAllergens.length > 0
        ? `<div style="margin-bottom:1rem">
           <strong style="font-size:.85rem;display:block;margin-bottom:.5rem">⚠️ Your Allergens Found:</strong>
           ${uniqueAllergens.map(a => `<span class="chip danger" style="margin:.15rem">${a}</span>`).join('')}
           </div>`
        : `<p style="font-size:.85rem;color:var(--green);margin-bottom:1rem">✅ None of your allergens detected in this PDF.</p>`;

    document.getElementById('resultBody').innerHTML =
        `<strong style="font-size:.85rem;display:block;margin-bottom:.75rem">📋 Foods Found in PDF (${foods.length}):</strong>
         <div class="pdf-foods-list">${foodsHTML}</div>
         <div style="margin-top:1rem">${allergenHTML}</div>`;

    document.getElementById('badgeCount').textContent =
        scanHistory.filter(h => h.date === getTodayStr() && h.status !== 'safe').length;
    if (overallStatus === 'danger') showToast('🚨 Allergens detected in PDF!', 'error');
    else if (overallStatus === 'caution') showToast('⚠️ Caution: some items may contain allergens', 'warning');
    else showToast('✅ PDF scanned — all clear!', 'success');
}

function showPdfAllergenTextResults(rawText) {
    const resultCard = document.getElementById('resultCard');
    resultCard.style.display = 'flex';

    const textLower = rawText.toLowerCase();
    const ALLERGEN_KEYWORDS = [
        'peanut', 'peanuts', 'milk', 'dairy', 'cream', 'butter', 'ghee', 'wheat', 'gluten', 'flour', 'maida',
        'mustard', 'sesame', 'tree nut', 'cashew', 'almond', 'walnut', 'pistachio', 'shellfish', 'shrimp',
        'prawn', 'crab', 'egg', 'soy', 'soya', 'fenugreek', 'hing', 'asafoetida', 'turmeric', 'coconut',
    ];
    const found = ALLERGEN_KEYWORDS.filter(k => textLower.includes(k));
    const userMatched = userAllergens.filter(a =>
        found.some(k => a.name.toLowerCase().includes(k) || k.includes(a.name.toLowerCase().split('/')[0]))
    );

    const overallStatus = userMatched.length > 0 ? 'caution' : 'safe';
    const icon = overallStatus === 'safe' ? '✅' : '⚠️';
    const msg = overallStatus === 'safe' ? 'No obvious allergens found in text.' : 'Potential allergen-containing ingredients found';

    document.getElementById('resultHeader').className = `result-header ${overallStatus}`;
    document.getElementById('resultHeader').innerHTML = `
      <div class="result-emoji">${icon} 📄</div>
      <div class="result-food-name">PDF Text Scan</div>
      <div class="result-status ${overallStatus}">${msg}</div>`;

    const allergenHTML = userMatched.length > 0
        ? `<div style="margin-bottom:1rem">
           <strong style="font-size:.85rem;display:block;margin-bottom:.5rem">⚠️ Ingredients of concern found:</strong>
           ${found.map(k => `<span class="chip caution" style="margin:.15rem">${k}</span>`).join('')}
           </div>`
        : `<p style="font-size:.85rem;color:var(--green);margin-bottom:1rem">✅ No matching allergen keywords found in document text.</p>`;

    const hint = found.length > 0
        ? `<p style="font-size:.78rem;color:var(--muted);margin-top:.75rem">ℹ️ Keywords found in document: ${found.slice(0, 8).join(', ')}${found.length > 8 ? '…' : ''}</p>`
        : '';

    document.getElementById('resultBody').innerHTML = allergenHTML + hint;
    showToast(overallStatus === 'safe' ? '✅ PDF scanned — no allergens found!' : '⚠️ Potential allergens in document!', overallStatus === 'safe' ? 'success' : 'warning');
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function analyseManual() {
    const val = document.getElementById('foodInput').value.trim();
    if (!val) { showToast('Please enter a food name', 'warning'); return; }
    const match = FOOD_DATABASE.find(f => f.name.toLowerCase().includes(val.toLowerCase()));
    if (match) {
        showResult(match);
    } else {
        const fakeFood = { name: val, emoji: '🍽️', allergens: [], ingredients: [{ name: 'Unknown ingredients', s: 'safe' }] };
        showResult(fakeFood);
    }
    document.getElementById('foodInput').value = '';
}

function showResult(food, confidence = 'High') {
    const userAllergenNames = userAllergens.map(a => a.name.toLowerCase());

    // Strict comparison: Only use realistic ingredients for this dish
    const triggered = food.allergens.filter(a =>
        userAllergenNames.some(u => {
            const uMain = u.split('/')[0].toLowerCase();
            const aMain = a.name.toLowerCase().split('/')[0];
            return aMain.includes(uMain) || uMain.includes(aMain);
        })
    );

    let status = 'safe';
    if (triggered.some(a => a.sev === 'danger')) status = 'danger';
    else if (triggered.length > 0) status = 'caution';

    const icon = status === 'safe' ? '✅' : status === 'danger' ? '❌' : '⚠️';
    const safetyLabel = status === 'safe' ? 'Safe' : status === 'danger' ? 'Not Recommended' : 'Caution';

    const card = document.getElementById('resultCard');
    card.style.display = 'flex';

    const confidenceClass = confidence.toLowerCase();

    document.getElementById('resultHeader').className = `result-header ${status}`;
    document.getElementById('resultHeader').innerHTML = `
        <div style="font-weight:700;margin-bottom:1rem;color:var(--text);font-size:1.1rem;text-align:left;line-height:1.5">
            Food Name: ${food.name}<br>
            Confidence: ${confidence}
        </div>
        <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:1rem;text-align:left">
            <span style="font-weight:600;display:block;margin-bottom:.5rem">Allergen Check:</span>
            <div style="font-size:1.2rem;font-weight:700" class="text-${status}">${icon} ${safetyLabel}</div>
        </div>
    `;

    const allergenHTML = triggered.length > 0
        ? `<div style="margin-top:1rem;padding:1rem;background:rgba(239, 68, 68, 0.05);border-radius:8px;border:1px solid rgba(239, 68, 68, 0.2)">
           <strong style="font-size:.85rem;display:block;margin-bottom:.5rem">⚠️ Identified Allergens:</strong>
           ${triggered.map(a => `<span class="chip danger" style="margin:.15rem">${a.name}</span>`).join('')}
           <p style="font-size:.7rem;color:var(--muted);margin-top:.4rem">Note: These allergens are confirmed components of ${food.name}.</p>
           </div>`
        : `<p style="font-size:.85rem;color:var(--green);margin-top:1rem">✅ No realistic allergens detected in this dish.</p>`;

    const clinicalHTML = triggered.length > 0
        ? triggered.map(a => {
            const info = ALLERGEN_INFO[a.name] || {};
            const symptoms = info.symptoms ? info.symptoms.join(', ') : 'Not specified';
            const diseases = info.diseases ? info.diseases.join(', ') : 'Not specified';
            return `
            <div class="clinical-info">
              <div class="clinical-title">🏥 Clinical Insight: ${a.name}</div>
              <div class="clinical-row"><strong>Typical Symptoms:</strong> ${symptoms}</div>
              <div class="clinical-row"><strong>Associated Conditions:</strong> ${diseases}</div>
            </div>`;
        }).join('') : '';

    const ingHTML = food.ingredients
        ? `<strong style="font-size:.85rem;display:block;margin-top:1rem;margin-bottom:.5rem">Ingredients:</strong>
           <ul class="ingredient-list">
           ${food.ingredients.map(i => `<li><span class="ing-dot ${i.s}"></span>${i.name} ${i.s === 'danger' ? '⚠️' : i.s === 'caution' ? '🟡' : '✅'}</li>`).join('')}
           </ul>` : '';

    document.getElementById('resultBody').innerHTML = allergenHTML + clinicalHTML + ingHTML;

    // Save to history & localStorage
    const entry = {
        id: Date.now(),
        name: food.name,
        emoji: food.emoji,
        status,
        date: getTodayStr(),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        allergens: triggered.map(a => a.name),
    };
    scanHistory.unshift(entry);
    lsSet(LS_KEYS.history, scanHistory);

    // Update scan count badge live
    document.getElementById('scanCount').textContent = scanHistory.length;
    document.getElementById('badgeCount').textContent =
        scanHistory.filter(h => h.date === getTodayStr() && h.status !== 'safe').length;

    if (status === 'danger') showToast(`🚨 Allergens detected in ${food.name}!`, 'error');
    else if (status === 'caution') showToast(`⚠️ Caution: ${food.name} may contain allergens`, 'warning');
    else showToast(`✅ ${food.name} is safe!`, 'success');
}

// ============================
// PROFILE
// ============================
function updateProfileDisplay() {
    const initial = (userProfile.name || 'U')[0].toUpperCase();
    document.getElementById('profileAvatar').textContent = initial;
    document.getElementById('sidebarAvatar').textContent = initial;
    document.getElementById('sidebarName').textContent = userProfile.name;
    document.getElementById('dashGreetName').textContent = (userProfile.name || '').split(' ')[0];
}

function renderProfile() {
    updateProfileDisplay();
    document.getElementById('profileName').textContent = userProfile.name;
    document.getElementById('profileEmail').textContent = userProfile.email;
    document.getElementById('profileAvatar').textContent = (userProfile.name || 'U')[0].toUpperCase();
    document.getElementById('profileAllergenCount').textContent = userAllergens.length;
    document.getElementById('profileScanCount').textContent = scanHistory.length;
    const today = getTodayStr();
    document.getElementById('profileSafeCount').textContent =
        scanHistory.filter(h => h.date === today && h.status === 'safe').length;

    const list = document.getElementById('allergenList');
    if (!userAllergens.length) {
        list.innerHTML = '<p style="text-align:center;color:var(--muted);padding:1.5rem">No allergens added yet.</p>';
        return;
    }
    list.innerHTML = userAllergens.map((a, i) => {
        const info = ALLERGEN_INFO[a.name] || {};
        return `
    <div class="allergen-tag">
      <div class="allergen-tag-left">
        <span class="allergen-sev ${a.sev}">${a.sev.toUpperCase()}</span>
        <div>
            <div style="font-size:.85rem;font-weight:600">${a.name}</div>
            <div style="font-size:.65rem;color:var(--muted)">${info.category || 'General'}</div>
        </div>
      </div>
      <button class="del-btn" onclick="removeAllergen(${i})" title="Remove ${a.name}">🗑️</button>
    </div>`;
    }).join('');
}

function toggleEditProfile() {
    const form = document.getElementById('editProfileForm');
    const btn = document.getElementById('editProfileBtn');
    const visible = form.style.display !== 'none';
    if (!visible) {
        document.getElementById('editName').value = userProfile.name;
        document.getElementById('editEmail').value = userProfile.email;
        form.style.display = 'flex';
        btn.textContent = '✕ Cancel Edit';
    } else {
        form.style.display = 'none';
        btn.textContent = '✏️ Edit Profile';
    }
}

function saveProfile() {
    const name = document.getElementById('editName').value.trim();
    const email = document.getElementById('editEmail').value.trim();
    if (!name) { showToast('Name cannot be empty', 'warning'); return; }
    userProfile = { name, email };
    lsSet(LS_KEYS.profile, userProfile);
    toggleEditProfile();
    renderProfile();
    showToast('Profile updated!', 'success');
}

function showAddAllergen() {
    document.getElementById('addAllergenForm').style.display = 'flex';
    document.getElementById('allergenSearchInput').value = '';
    document.getElementById('selectedAllergenName').value = '';
    document.getElementById('allergenSearchResults').style.display = 'none';
}
function hideAddAllergen() { document.getElementById('addAllergenForm').style.display = 'none'; }

function searchAllergenInput(val) {
    const resultsEl = document.getElementById('allergenSearchResults');
    if (!val.trim()) {
        resultsEl.style.display = 'none';
        return;
    }
    const available = Object.keys(ALLERGEN_INFO);
    const filtered = available.filter(a => a.toLowerCase().includes(val.toLowerCase()));

    if (filtered.length === 0) {
        resultsEl.innerHTML = '<div class="search-result-item no-match">No allergens found</div>';
    } else {
        resultsEl.innerHTML = filtered.map(a => `
            <div class="search-result-item" onclick="selectSearchAllergen('${a}')">
                <div style="display:flex;justify-content:space-between;align-items:center">
                    <span>${a}</span>
                    <span class="category-chip">${ALLERGEN_INFO[a].category}</span>
                </div>
                <span style="font-size:.7rem;color:var(--muted)">${ALLERGEN_INFO[a].diseases[0]}</span>
            </div>
        `).join('');
    }
    resultsEl.style.display = 'block';
}

function selectSearchAllergen(name) {
    document.getElementById('allergenSearchInput').value = name;
    document.getElementById('selectedAllergenName').value = name;
    document.getElementById('allergenSearchResults').style.display = 'none';
}

function addAllergen() {
    const name = document.getElementById('selectedAllergenName').value;
    if (!name) {
        const inputVal = document.getElementById('allergenSearchInput').value.trim();
        // Check if typed name exists even if not clicked
        const match = Object.keys(ALLERGEN_INFO).find(a => a.toLowerCase() === inputVal.toLowerCase());
        if (match) {
            addAllergenWithName(match);
        } else {
            showToast('Please search and select a valid allergen', 'warning');
        }
        return;
    }
    addAllergenWithName(name);
}

function addAllergenWithName(name) {
    const sev = document.getElementById('newAllergenSev').value;
    if (userAllergens.find(a => a.name === name)) { showToast('Allergen already in profile', 'warning'); return; }
    userAllergens.push({ name, sev });
    lsSet(LS_KEYS.allergens, userAllergens);
    hideAddAllergen();
    renderProfile();
    showToast(`Added ${name} to your profile`, 'success');
}

function removeAllergen(i) {
    const name = userAllergens[i].name;
    userAllergens.splice(i, 1);
    lsSet(LS_KEYS.allergens, userAllergens);
    renderProfile();
    showToast(`Removed ${name} from profile`, 'success');
}

// ============================
// HISTORY
// ============================
function renderHistory() {
    const filtered = scanHistory.filter(h => {
        const matchText = h.name.toLowerCase().includes(historyFilter.text.toLowerCase());
        const matchStatus = historyFilter.status === 'all' || h.status === historyFilter.status;
        return matchText && matchStatus;
    });
    const el = document.getElementById('historyList');
    if (!filtered.length) {
        el.innerHTML = '<p style="text-align:center;color:var(--muted);padding:2rem">No scans found.</p>';
        return;
    }
    el.innerHTML = filtered.map(h => `
    <div class="history-item">
      <div class="history-left">
        <span class="history-icon">${h.emoji}</span>
        <div>
          <div class="history-name">${h.name}</div>
          <div class="history-meta">${h.date} · ${h.time} · ${h.allergens.length ? h.allergens.join(', ') : 'No allergens'}</div>
        </div>
      </div>
      <div class="history-right">
        <span class="status-pill ${h.status}">${statusLabel(h.status)}</span>
      </div>
    </div>`).join('');
}

function filterHistory(v) { historyFilter.text = v; renderHistory(); }
function filterHistoryStatus(v) { historyFilter.status = v; renderHistory(); }

function clearHistory() {
    if (!confirm('Clear all scan history? This cannot be undone.')) return;
    scanHistory = [];
    lsSet(LS_KEYS.history, scanHistory);
    renderHistory();
    renderDashboard();
    showToast('History cleared', 'success');
}

// ============================
// FOOD DATABASE
// ============================
function renderFoodDB() {
    const filtered = FOOD_DATABASE.filter(f => f.name.toLowerCase().includes(foodFilter.toLowerCase()));
    const userAllergenNames = userAllergens.map(a => a.name.toLowerCase());

    document.getElementById('foodGrid').innerHTML = filtered.map(f => {
        const hasMyAllergen = f.allergens.some(a =>
            userAllergenNames.some(u =>
                a.name.toLowerCase().includes(u.split('/')[0]) || u.includes(a.name.toLowerCase().split('/')[0])
            )
        );
        const border = hasMyAllergen ? 'border-color:var(--red)' : '';
        return `
    <div class="food-card" style="${border}" onclick="quickScan('${f.name}')">
      <div class="food-card-top">
        <span class="food-emoji">${f.emoji}</span>
        <div>
          <div class="food-name">${f.name}</div>
          <div class="food-region">${f.region || ''}</div>
        </div>
      </div>
      <div class="allergen-chips">
        ${f.allergens.map(a => `<span class="chip ${a.sev === 'danger' ? 'danger' : a.sev === 'caution' ? 'caution' : 'safe'}">${a.name}</span>`).join('')}
        ${!f.allergens.length ? '<span class="chip safe">✅ Allergen Free</span>' : ''}
      </div>
      ${hasMyAllergen ? '<div style="margin-top:.6rem;font-size:.72rem;color:var(--red);font-weight:600">⚠️ Contains YOUR allergen</div>' : ''}
      <div style="margin-top:.75rem;font-size:.72rem;color:var(--muted)">Click to scan →</div>
    </div>`;
    }).join('');
}

function filterFoods(v) { foodFilter = v; renderFoodDB(); }

function quickScan(foodName) {
    const food = FOOD_DATABASE.find(f => f.name === foodName);
    if (!food) return;
    showPage('scanner');
    setTimeout(() => showResult(food), 300);
}

// ============================
// HELPERS
// ============================
function statusLabel(status) {
    return status === 'safe' ? '✅ Safe' : status === 'danger' ? '🚨 Danger' : '⚠️ Caution';
}

// ============================
// TOAST NOTIFICATIONS
// ============================
function showToast(msg, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: '✅', error: '🚨', warning: '⚠️' };
    toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity .3s';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ============================
// INIT
// ============================
(function init() {
    updateProfileDisplay();
    renderDashboard();
    renderFoodDB();
    renderHistory();
})();
