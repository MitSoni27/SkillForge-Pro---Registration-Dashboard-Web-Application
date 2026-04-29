// Location Data
const locationData = {
    "India": { states: ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat", "West Bengal", "Rajasthan", "Uttar Pradesh", "Telangana", "Kerala", "Punjab"], 
    cities: { "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"], "Delhi": ["New Delhi", "Dwarka", "Rohini"], "Karnataka": ["Bangalore", "Mysore", "Mangalore"], "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"], "Gujarat": ["Ahmedabad", "Surat", "Vadodara"], "West Bengal": ["Kolkata", "Howrah"], "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur"], "Uttar Pradesh": ["Lucknow", "Noida", "Agra"], "Telangana": ["Hyderabad", "Warangal"], "Kerala": ["Thiruvananthapuram", "Kochi"], "Punjab": ["Chandigarh", "Ludhiana"] } },
    "USA": { states: ["California", "Texas", "New York", "Florida"], cities: { "California": ["Los Angeles", "San Francisco", "San Diego"], "Texas": ["Houston", "Austin", "Dallas"], "New York": ["New York City", "Buffalo"], "Florida": ["Miami", "Orlando"] } },
    "UK": { states: ["England", "Scotland"], cities: { "England": ["London", "Manchester"], "Scotland": ["Edinburgh", "Glasgow"] } }
};

const skillsList = ["JavaScript", "React.js", "Python", "Node.js", "Java", "SQL", "UI/UX", "AWS", "Docker", "MongoDB"];
const hobbiesList = ["Reading", "Music", "Gaming", "Travel", "Photography", "Coding", "Chess", "Cooking"];

let currentStep = 1;
let userData = null;
let projectsArray = [{ name: "", description: "", startDate: "", endDate: "", role: "" }];

// DOM Elements
const registerPage = document.getElementById('registerPage');
const dashboardPage = document.getElementById('dashboardPage');
const navItems = document.querySelectorAll('.nav-item');
const themeToggle = document.getElementById('themeToggle');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const submitBtn = document.getElementById('submitBtn');
const steps = [document.getElementById('step1'), document.getElementById('step2'), document.getElementById('step3')];
const stepIndicators = document.querySelectorAll('.step-indicator');
const countrySelect = document.getElementById('country');
const stateSelect = document.getElementById('state');
const citySelect = document.getElementById('city');

// Populate countries
Object.keys(locationData).forEach(c => { countrySelect.innerHTML += `<option value="${c}">${c}</option>`; });

function updateStates() {
    const country = countrySelect.value;
    stateSelect.innerHTML = '<option value="">Select State</option>';
    citySelect.innerHTML = '<option value="">Select City</option>';
    if (country && locationData[country]) {
        locationData[country].states.forEach(s => { stateSelect.innerHTML += `<option value="${s}">${s}</option>`; });
    }
}

function updateCities() {
    const country = countrySelect.value;
    const state = stateSelect.value;
    citySelect.innerHTML = '<option value="">Select City</option>';
    if (country && state && locationData[country] && locationData[country].cities[state]) {
        locationData[country].cities[state].forEach(c => { citySelect.innerHTML += `<option value="${c}">${c}</option>`; });
    }
}

countrySelect.addEventListener('change', updateStates);
stateSelect.addEventListener('change', updateCities);

// Projects Form - FIXED SPACING
function renderProjectsForm() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;
    container.innerHTML = '';
    projectsArray.forEach((proj, idx) => {
        const div = document.createElement('div');
        div.className = 'project-item';
        div.style.marginBottom = '20px';
        div.style.padding = '18px';
        div.style.background = 'var(--bg)';
        div.style.borderRadius = '20px';
        div.style.border = '1px solid var(--border)';
        div.innerHTML = `
            <h4 style="margin-bottom: 15px; color: var(--primary); font-size: 1rem;">📌 Project ${idx+1}</h4>
            <div class="form-group" style="margin-bottom: 15px;">
                <label style="font-size: 0.85rem; margin-bottom: 6px;">Project Name</label>
                <input type="text" class="proj-name" placeholder="E-Commerce App" value="${(proj.name || '').replace(/"/g, '&quot;')}" style="width: 100%; padding: 10px 14px; border-radius: 16px;">
            </div>
            <div class="form-group" style="margin-bottom: 15px;">
                <label style="font-size: 0.85rem; margin-bottom: 6px;">Description</label>
                <textarea class="proj-desc" rows="2" placeholder="What did you build?" style="width: 100%; padding: 10px 14px; border-radius: 16px;">${proj.description || ''}</textarea>
            </div>
            <div class="form-row" style="display: flex; gap: 15px; margin-bottom: 15px;">
                <div class="form-group" style="flex: 1;">
                    <label style="font-size: 0.85rem; margin-bottom: 6px;">Start Date</label>
                    <input type="month" class="proj-start" value="${proj.startDate || ''}" style="width: 100%; padding: 10px 14px; border-radius: 16px;">
                </div>
                <div class="form-group" style="flex: 1;">
                    <label style="font-size: 0.85rem; margin-bottom: 6px;">End Date</label>
                    <input type="month" class="proj-end" value="${proj.endDate || ''}" style="width: 100%; padding: 10px 14px; border-radius: 16px;">
                </div>
            </div>
            <div class="form-group" style="margin-bottom: 12px;">
                <label style="font-size: 0.85rem; margin-bottom: 6px;">Your Role</label>
                <input type="text" class="proj-role" placeholder="Full Stack Developer" value="${(proj.role || '').replace(/"/g, '&quot;')}" style="width: 100%; padding: 10px 14px; border-radius: 16px;">
            </div>
            ${idx > 0 ? `<button class="remove-btn" data-idx="${idx}" style="margin-top: 10px; padding: 6px 14px; background: #ef4444; color: white; border: none; border-radius: 25px; cursor: pointer;"><i class="fas fa-trash"></i> Remove Project</button>` : ''}
        `;
        container.appendChild(div);
    });
    
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.onclick = () => { projectsArray.splice(parseInt(btn.dataset.idx), 1); renderProjectsForm(); };
    });
    
    document.querySelectorAll('.proj-name, .proj-desc, .proj-start, .proj-end, .proj-role').forEach((input) => {
        input.addEventListener('change', (e) => {
            const projDiv = e.target.closest('.project-item');
            const projIdx = Array.from(container.children).indexOf(projDiv);
            if (e.target.classList.contains('proj-name')) projectsArray[projIdx].name = e.target.value;
            else if (e.target.classList.contains('proj-desc')) projectsArray[projIdx].description = e.target.value;
            else if (e.target.classList.contains('proj-start')) projectsArray[projIdx].startDate = e.target.value;
            else if (e.target.classList.contains('proj-end')) projectsArray[projIdx].endDate = e.target.value;
            else if (e.target.classList.contains('proj-role')) projectsArray[projIdx].role = e.target.value;
        });
    });
}

document.getElementById('addProjectBtn').onclick = () => {
    projectsArray.push({ name: "", description: "", startDate: "", endDate: "", role: "" });
    renderProjectsForm();
};

// Collect Data
function collectFormData() {
    return {
        firstName: document.getElementById('firstName')?.value || '',
        middleName: document.getElementById('middleName')?.value || '',
        lastName: document.getElementById('lastName')?.value || '',
        email: document.getElementById('email')?.value || '',
        mobile: document.getElementById('mobile')?.value || '',
        dob: document.getElementById('dob')?.value || '',
        gender: document.getElementById('gender')?.value || 'Male',
        city: document.getElementById('city')?.value || '',
        state: document.getElementById('state')?.value || '',
        country: document.getElementById('country')?.value || '',
        address: document.getElementById('address')?.value || '',
        school10: document.getElementById('school10')?.value || '',
        board10: document.getElementById('board10')?.value || '',
        percentage10: document.getElementById('percentage10')?.value || '',
        school12: document.getElementById('school12')?.value || '',
        board12: document.getElementById('board12')?.value || '',
        stream12: document.getElementById('stream12')?.value || '',
        percentage12: document.getElementById('percentage12')?.value || '',
        qualification: document.getElementById('qualification')?.value || '',
        collegeName: document.getElementById('collegeName')?.value || '',
        passYear: document.getElementById('passYear')?.value || '',
        percentage: document.getElementById('percentage')?.value || '',
        internship: document.getElementById('internship')?.value || '',
        certificates: document.getElementById('certificates')?.value || '',
        selectedSkills: Array.from(document.querySelectorAll('#skillsContainer .skill-tag.selected')).map(el => el.innerText.split(' ').pop()),
        selectedHobbies: Array.from(document.querySelectorAll('#hobbiesContainer .hobby-tag.selected')).map(el => el.innerText.split(' ').pop()),
        projects: projectsArray.filter(p => p.name && p.name.trim() !== ""),
        resumeFile: document.getElementById('resumeFile')?.files[0],
        profileNewFile: document.getElementById('profilePhoto')?.files[0]
    };
}

function readFileAsDataURL(file) {
    return new Promise((resolve) => {
        if (!file) resolve(null);
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
    });
}

function showLoading(callback) {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = '<div class="spinner"></div><p style="color:white; margin-top:1rem;">Saving profile...</p>';
    document.body.appendChild(overlay);
    setTimeout(() => { overlay.remove(); callback(); }, 800);
}

async function onSubmitRegistration() {
    const form = collectFormData();
    if (!form.firstName || !form.lastName) { alert("❌ First & Last Name required!"); return; }
    if (!form.email || !form.mobile) { alert("❌ Email & Mobile required!"); return; }
    
    let finalPhoto = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='130' height='130' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23e2e8f0'/%3E%3Ctext x='50' y='67' font-size='40' text-anchor='middle' fill='%2394a3b8'%3E📷%3C/text%3E%3C/svg%3E";
    if (form.profileNewFile) finalPhoto = await readFileAsDataURL(form.profileNewFile);
    let resumeName = form.resumeFile ? form.resumeFile.name : null;
    
    const newUser = { ...form, profilePhoto: finalPhoto, resumeName: resumeName };
    showLoading(() => {
        localStorage.setItem('userProfile', JSON.stringify(newUser));
        userData = newUser;
        renderDashboard();
        showDashboard();
    });
}

function renderDashboard() {
    if (!userData) return;
    const fullName = `${userData.firstName} ${userData.middleName} ${userData.lastName}`.trim();
    document.getElementById('welcomeMsg').innerHTML = `🎉 Welcome, ${userData.firstName}! 🚀`;
    document.getElementById('fullNameDisplay').innerHTML = `<strong>${fullName}</strong>`;
    document.getElementById('emailDisplay').innerHTML = userData.email || 'N/A';
    document.getElementById('mobileDisplay').innerHTML = userData.mobile || 'N/A';
    if (userData.profilePhoto) document.getElementById('dashPhoto').src = userData.profilePhoto;
    
    document.getElementById('personalInfoCard').innerHTML = `
        <p><i class="fas fa-calendar-alt"></i> <strong>DOB:</strong> ${userData.dob || 'N/A'}</p>
        <p><i class="fas fa-map-marker-alt"></i> <strong>Location:</strong> ${userData.city || ''}, ${userData.state || ''}, ${userData.country || ''}</p>
        <p><i class="fas fa-home"></i> <strong>Address:</strong> ${userData.address || 'N/A'}</p>
    `;
    
    document.getElementById('educationCard').innerHTML = `
        <p><i class="fas fa-school"></i> <strong>10th:</strong> ${userData.school10 || 'N/A'} (${userData.board10 || 'N/A'}) - ${userData.percentage10 || 'N/A'}%</p>
        <p><i class="fas fa-graduation-cap"></i> <strong>12th:</strong> ${userData.school12 || 'N/A'} (${userData.board12 || 'N/A'}) - ${userData.stream12 || 'N/A'} - ${userData.percentage12 || 'N/A'}%</p>
        <p><i class="fas fa-university"></i> <strong>${userData.qualification || 'N/A'}</strong> from ${userData.collegeName || 'N/A'} (${userData.passYear || 'N/A'} | ${userData.percentage || 'N/A'})</p>
        <p><i class="fas fa-briefcase"></i> <strong>Internship:</strong> ${userData.internship || 'N/A'}</p>
        <p><i class="fas fa-certificate"></i> <strong>Certifications:</strong> ${userData.certificates || 'N/A'}</p>
    `;
    
    document.getElementById('skillsBadges').innerHTML = `
        <div class="badge-list">${(userData.selectedSkills || []).map(s => `<span class="badge"><i class="fas fa-code"></i> ${s}</span>`).join('') || '<span>None</span>'}</div>
        <div style="margin-top: 20px;"><strong><i class="fas fa-heart"></i> Hobbies:</strong></div>
        <div class="badge-list">${(userData.selectedHobbies || []).map(h => `<span class="badge"><i class="fas fa-smile"></i> ${h}</span>`).join('') || '<span>None</span>'}</div>
    `;
    
    document.getElementById('projectsList').innerHTML = (userData.projects || []).map(p => `
        <div class="single-project-card" style="margin-bottom: 12px; padding: 12px; background: var(--bg); border-radius: 16px; border-left: 4px solid var(--primary);">
            <h4 style="margin-bottom: 8px;"><i class="fas fa-folder-open"></i> ${p.name}</h4>
            <p style="margin: 5px 0;"><i class="fas fa-user-tag"></i> <strong>Role:</strong> ${p.role} | <i class="fas fa-calendar"></i> ${p.startDate || 'N/A'} - ${p.endDate || 'N/A'}</p>
            <p style="margin: 5px 0;"><i class="fas fa-align-left"></i> ${p.description || 'No description'}</p>
        </div>
    `).join('') || '<p>No projects added</p>';
    
    document.getElementById('resumeDisplay').innerHTML = userData.resumeName ? `<div class="resume-link"><i class="fas fa-file-pdf"></i> ${userData.resumeName}</div>` : '<p>No resume uploaded</p>';
}

function loadDataToForm() {
    if (!userData) return;
    const fields = ['firstName', 'middleName', 'lastName', 'email', 'mobile', 'dob', 'address', 'school10', 'board10', 'percentage10', 'school12', 'board12', 'stream12', 'percentage12', 'qualification', 'collegeName', 'passYear', 'percentage', 'internship', 'certificates'];
    fields.forEach(f => { const el = document.getElementById(f); if (el && userData[f]) el.value = userData[f]; });
    if (userData.gender) document.getElementById('gender').value = userData.gender;
    if (userData.country) {
        document.getElementById('country').value = userData.country;
        updateStates();
        setTimeout(() => {
            document.getElementById('state').value = userData.state;
            updateCities();
            document.getElementById('city').value = userData.city;
        }, 50);
    }
    if (userData.profilePhoto) document.getElementById('photoPreview').src = userData.profilePhoto;
    projectsArray = userData.projects?.length ? userData.projects : [{ name: "", description: "", startDate: "", endDate: "", role: "" }];
    renderProjectsForm();
    populateSkills();
    setTimeout(() => {
        (userData.selectedSkills || []).forEach(s => { const el = Array.from(document.querySelectorAll('.skill-tag')).find(t => t.innerText.includes(s)); if (el) el.classList.add('selected'); });
        (userData.selectedHobbies || []).forEach(h => { const el = Array.from(document.querySelectorAll('.hobby-tag')).find(t => t.innerText.includes(h)); if (el) el.classList.add('selected'); });
    }, 100);
}

function showDashboard() {
    registerPage.style.display = 'none';
    dashboardPage.style.display = 'block';
    updateActiveNav('dashboard');
}

function showRegister() {
    dashboardPage.style.display = 'none';
    registerPage.style.display = 'block';
    updateActiveNav('register');
    currentStep = 1;
    updateStepUI();
}

function updateActiveNav(page) {
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === page) item.classList.add('active');
    });
}

function updateStepUI() {
    steps.forEach((step, idx) => {
        if (idx + 1 === currentStep) step.classList.add('active-step');
        else step.classList.remove('active-step');
    });
    stepIndicators.forEach((ind, idx) => {
        if (idx + 1 === currentStep) ind.classList.add('active');
        else ind.classList.remove('active');
    });
    prevBtn.disabled = currentStep === 1;
    if (currentStep === 3) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
    } else {
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
    }
}

function nextStep() { if (currentStep < 3) { currentStep++; updateStepUI(); } }
function prevStep() { if (currentStep > 1) { currentStep--; updateStepUI(); } }

function populateSkills() {
    const skillsDiv = document.getElementById('skillsContainer');
    const hobbiesDiv = document.getElementById('hobbiesContainer');
    if (!skillsDiv || !hobbiesDiv) return;
    skillsDiv.innerHTML = '';
    hobbiesDiv.innerHTML = '';
    skillsList.forEach(s => { const tag = document.createElement('div'); tag.className = 'skill-tag'; tag.innerHTML = `<i class="fas fa-cog"></i> ${s}`; tag.onclick = () => tag.classList.toggle('selected'); skillsDiv.appendChild(tag); });
    hobbiesList.forEach(h => { const tag = document.createElement('div'); tag.className = 'hobby-tag'; tag.innerHTML = `<i class="fas fa-star"></i> ${h}`; tag.onclick = () => tag.classList.toggle('selected'); hobbiesDiv.appendChild(tag); });
}

function loadUserFromStorage() {
    const stored = localStorage.getItem('userProfile');
    if (stored) {
        userData = JSON.parse(stored);
        renderDashboard();
        showDashboard();
    } else {
        showRegister();
    }
}

// Event Listeners
document.getElementById('photoUploadArea').onclick = () => document.getElementById('profilePhoto').click();
document.getElementById('profilePhoto').onchange = (e) => {
    if (e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = ev => document.getElementById('photoPreview').src = ev.target.result;
        reader.readAsDataURL(e.target.files[0]);
    }
};
nextBtn.onclick = nextStep;
prevBtn.onclick = prevStep;
submitBtn.onclick = onSubmitRegistration;
document.getElementById('editProfileBtn').onclick = () => { loadDataToForm(); currentStep = 1; updateStepUI(); showRegister(); };
document.getElementById('logoutBtn').onclick = () => { localStorage.removeItem('userProfile'); location.reload(); };
navItems.forEach(item => {
    item.onclick = () => {
        if (item.dataset.page === 'register') showRegister();
        else if (item.dataset.page === 'dashboard') {
            if (userData) showDashboard();
            else alert("⚠️ Please register first!");
        }
    };
});
themeToggle.onclick = () => document.body.classList.toggle('dark');

// Initialize
populateSkills();
renderProjectsForm();
updateStepUI();
loadUserFromStorage();