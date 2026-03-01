// Main JavaScript file for Conference Website - VERSION DEBUG

// Define data at the beginning
const conferenceData = {
    "title": "Conference on Advances in Computer Science and Educational Technologies for Sustainable Development",
    "subtitle": "for Sustainable Development",
    "dates": "08-10 Juin 2026",
    "location": "Université de Yaoundé I, Yaoundé, Cameroun",
    "theme": "Innover dans le domaine de l'informatique et des technologies éducatives pour un avenir durable",
    "organizers": {
        "lite": "Laboratoire d'Informatique et des Technologies Éducatives",
        "scnef": "Société Camerounaise du Numérique pour l'Éducation et la Formation"
    },
    "registrationDeadline": "2026-05-15",
    "submissionDeadline": "2026-03-01"
};

// Countdown timer
function updateCountdown() {
    const conferenceDate = new Date("2026-06-08T09:00:00").getTime();
    const now = new Date().getTime();
    const timeLeft = conferenceDate - now;
    
    // Get DOM elements
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
    
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        return;
    }
    
    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        daysElement.textContent = days.toString().padStart(2, "0");
        hoursElement.textContent = hours.toString().padStart(2, "0");
        minutesElement.textContent = minutes.toString().padStart(2, "0");
        secondsElement.textContent = seconds.toString().padStart(2, "0");
    } else {
        document.getElementById("countdown").innerHTML = "<div class='col-12'><h4>La conférence a commencé !</h4></div>";
    }
}

// Initialize countdown when DOM is ready
document.addEventListener("DOMContentLoaded", function() {
    // Wait a bit to ensure everything is loaded
    setTimeout(() => {
        updateCountdown(); // Initial call
        setInterval(updateCountdown, 1000); // Update every second
    }, 100);
});

// DEBUG: Fonction pour logger les messages
function debugLog(message) {
    console.log('🔍 DEBUG:', message);
    const logDiv = document.getElementById('debug-log');
    if (logDiv) {
        const timestamp = new Date().toLocaleTimeString();
        logDiv.innerHTML += `<div>[${timestamp}] ${message}</div>`;
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: "smooth"
            });
        }
    });
});

// Scroll to registration function
function scrollToRegistration() {
    const registrationSection = document.getElementById("inscription");
    if (registrationSection) {
        window.scrollTo({
            top: registrationSection.offsetTop - 70,
            behavior: "smooth"
        });
    }
}

// Registration form handling
document.getElementById("registrationForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const formData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        institution: document.getElementById("institution").value,
        category: document.getElementById("category").value,
        days: [],
        comments: document.getElementById("comments").value,
        terms: document.getElementById("terms").checked
    };
    
    // Collect selected days
    if (document.getElementById("day1Check").checked) formData.days.push("day1");
    if (document.getElementById("day2Check").checked) formData.days.push("day2");
    if (document.getElementById("day3Check").checked) formData.days.push("day3");
    
    // Validate form
    if (!validateRegistrationForm(formData)) {
        return;
    }
    
    // Submit form data
    submitRegistration(formData);
});

// Form validation
function validateRegistrationForm(data) {
    const errors = [];
    
    if (!data.firstName.trim()) {
        errors.push("Le prénom est requis");
    }
    
    if (!data.lastName.trim()) {
        errors.push("Le nom est requis");
    }
    
    if (!data.email.trim() || !isValidEmail(data.email)) {
        errors.push("L'email est invalide");
    }
    
    if (!data.institution.trim()) {
        errors.push("L'institution est requise");
    }
    
    if (!data.category) {
        errors.push("Veuillez sélectionner une catégorie");
    }
    
    if (data.days.length === 0) {
        errors.push("Veuillez sélectionner au moins un jour de participation");
    }
    
    if (!data.terms) {
        errors.push("Vous devez accepter les conditions générales");
    }
    
    if (errors.length > 0) {
        showFormErrors(errors);
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form errors
function showFormErrors(errors) {
    const errorContainer = document.createElement("div");
    errorContainer.className = "alert alert-danger";
    errorContainer.innerHTML = "<strong>Erreurs de validation :</strong><ul>" + 
        errors.map(error => `<li>${error}</li>`).join("") + 
        "</ul>";
    
    const form = document.getElementById("registrationForm");
    form.parentNode.insertBefore(errorContainer, form);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        errorContainer.remove();
    }, 5000);
}

// Submit registration data
function submitRegistration(data) {
    // Show loading state
    const submitBtn = document.querySelector("#registrationForm button[type='submit']");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Envoi en cours...";
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // In a real application, this would be an actual API call
        console.log("Registration data:", data);
        
        // Show success message
        const successMessage = document.createElement("div");
        successMessage.className = "alert alert-success";
        successMessage.innerHTML = "<strong>Inscription réussie !</strong><br>Merci de vous être inscrit à la conférence. Vous recevrez un email de confirmation sous peu.";
        
        const form = document.getElementById("registrationForm");
        form.parentNode.insertBefore(successMessage, form);
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
        
    }, 2000);
}

// Admin login functionality - VERSION DEBUG
// Only add event listener if the element exists
const adminLoginBtn = document.getElementById("adminLoginBtn");
if (adminLoginBtn) {
    adminLoginBtn.addEventListener("click", function() {
        debugLog('🎯 Admin login button clicked!');
        
        const username = document.getElementById("adminUsername").value;
        const password = document.getElementById("adminPassword").value;
        
        debugLog(`👤 Username: ${username}`);
        debugLog(`🔑 Password: ${password}`);
        
        if (!username || !password) {
            debugLog('❌ Username or password missing');
            showAdminError("Veuillez saisir un nom d'utilisateur et un mot de passe");
            return;
        }
        
        debugLog('🔄 Calling authenticateAdmin...');
        // Call the API authentication function
        authenticateAdmin(username, password);
    });
}

// Admin authentication - uses API integration
function authenticateAdmin(username, password) {
    debugLog('📡 authenticateAdmin called with:', { username, password });
    
    // Call the real API authentication function from api-integration.js
    if (typeof authenticateAdminAPI === 'function') {
        debugLog('✅ authenticateAdminAPI function found');
        authenticateAdminAPI(username, password);
    } else {
        debugLog('❌ authenticateAdminAPI function NOT found!');
        showAdminError("Erreur: Fonction d'authentification non disponible");
    }
}

// Show admin error
function showAdminError(message) {
    debugLog(`❌ Admin error: ${message}`);
    
    const modalBody = document.querySelector("#adminModal .modal-body");
    if (!modalBody) {
        debugLog('❌ Modal body not found');
        return;
    }
    
    const errorContainer = document.createElement("div");
    errorContainer.className = "alert alert-danger mt-3";
    errorContainer.textContent = message;
    
    // Remove existing error if any
    const existingError = modalBody.querySelector(".alert-danger");
    if (existingError) {
        existingError.remove();
    }
    
    modalBody.appendChild(errorContainer);
    
    // Remove error after 3 seconds
    setTimeout(() => {
        if (errorContainer.parentNode) {
            errorContainer.remove();
        }
    }, 3000);
}

// Check if admin is authenticated
function checkAdminAuth() {
    debugLog('🔍 checkAdminAuth called');
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
    if (isAuthenticated) {
        showAdminPanel();
    }
}

// Show admin panel
function showAdminPanel() {
    debugLog('👁️ showAdminPanel called');
    
    // Store admin session in localStorage
    localStorage.setItem('adminAuthenticated', 'true');
    localStorage.setItem('adminUsername', 'admin');

}

// Create admin panel
function createAdminPanel() {
    const adminPanel = document.createElement("div");
    adminPanel.id = "adminPanel";
    adminPanel.className = "admin-panel";
    adminPanel.style.display = "none";
    
    adminPanel.innerHTML = `
        <div class="row">
            <div class="col-12">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h3>Tableau de Bord Administrateur</h3>
                    <div>
                        <span class="badge bg-success me-2">Connecté</span>
                        <button class="btn btn-outline-secondary btn-sm" id="logoutBtn">Déconnexion</button>
                    </div>
                </div>
            </div>
        </div>
        
        <ul class="nav nav-tabs mb-4" id="adminTabs">
            <li class="nav-item">
                <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#contentManagement">Gestion Contenu</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#registrations">Inscriptions</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#submissions">Soumissions</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#settings">Paramètres</button>
            </li>
        </ul>
        
        <div class="tab-content">
            <div class="tab-pane fade show active" id="contentManagement">
                <div class="row">
                    <div class="col-md-6">
                        <div class="admin-card">
                            <h5>Gestion des Sections</h5>
                            <p>Modifiez le contenu de chaque section du site web.</p>
                            <button class="btn btn-admin" onclick="openContentEditor()">Modifier le Contenu</button>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="admin-card">
                            <h5>Gestion des Images</h5>
                            <p>Gérez les images utilisées sur le site web.</p>
                            <button class="btn btn-admin" onclick="openImageManager()">Gérer les Images</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="tab-pane fade" id="registrations">
                <div class="admin-card">
                    <h5>Liste des Inscriptions</h5>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Email</th>
                                    <th>Catégorie</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="registrationsTable">
                                <!-- Data will be loaded here -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div class="tab-pane fade" id="submissions">
                <div class="admin-card">
                    <h5>Liste des Soumissions</h5>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Titre</th>
                                    <th>Auteur</th>
                                    <th>Type</th>
                                    <th>Statut</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="submissionsTable">
                                <!-- Data will be loaded here -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div class="tab-pane fade" id="settings">
                <div class="admin-card">
                    <h5>Paramètres du Site</h5>
                    <form id="settingsForm">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label">Titre du Site</label>
                                    <input type="text" class="form-control" id="siteTitle" value="Conférence IA & TE 2026">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label">Dates de la Conférence</label>
                                    <input type="text" class="form-control" id="conferenceDates" value="08-10 Juin 2026">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Description</label>
                            <textarea class="form-control" id="siteDescription" rows="3">Conference on Advances in Computer Science and Educational Technologies for Sustainable Development</textarea>
                        </div>
                        <button type="submit" class="btn btn-admin">Enregistrer les Modifications</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Insert admin panel after the hero section
    const heroSection = document.querySelector(".hero-section");
    if (heroSection) {
        heroSection.parentNode.insertBefore(adminPanel, heroSection.nextSibling);
    }
    
    // Add event listeners
    setTimeout(() => {
        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", logoutAdmin);
            debugLog('✅ Logout button event listener attached');
        }
        
        const settingsForm = document.getElementById("settingsForm");
        if (settingsForm) {
            settingsForm.addEventListener("submit", saveSettings);
            debugLog('✅ Settings form event listener attached');
        }
    }, 100);
}

// Add admin navigation
function addAdminNavigation() {
    debugLog('➕ addAdminNavigation called');
    // Add admin button to navigation
    const navItems = document.querySelector(".navbar-nav");
    if (!navItems) {
        debugLog('❌ Navbar not found');
        return;
    }
    
    const adminNavItem = document.createElement("li");
    adminNavItem.className = "nav-item ms-2";
    adminNavItem.innerHTML = '<button class="btn btn-outline-primary btn-sm" onclick="toggleAdminPanel()">Espace Admin</button>';
    
    // Check if admin button already exists
    if (!document.querySelector(".navbar-nav .btn-outline-primary")) {
        navItems.appendChild(adminNavItem);
        debugLog('✅ Admin button added to navigation');
    }
}

// Toggle admin panel
function toggleAdminPanel() {
    debugLog('👁️ toggleAdminPanel called');
    const adminPanel = document.getElementById("adminPanel");
    if (adminPanel) {
        const isVisible = adminPanel.style.display === "block";
        adminPanel.style.display = isVisible ? "none" : "block";
        debugLog(`📱 Admin panel toggled: ${adminPanel.style.display}`);
    } else {
        debugLog('❌ Admin panel not found');
    }
}

// Logout admin
function logoutAdmin() {
    debugLog('👋 logoutAdmin called');
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminUsername");
    
    const adminPanel = document.getElementById("adminPanel");
    if (adminPanel) {
        adminPanel.style.display = "none";
    }
    
    // Remove admin button from navigation
    const adminBtn = document.querySelector(".btn-outline-primary");
    if (adminBtn) {
        adminBtn.parentNode.remove();
    }
    
    debugLog('✅ Logout completed');
}

// Open content editor
function openContentEditor() {
    alert("Éditeur de contenu - Cette fonctionnalité nécessiterait une intégration avec une base de données pour fonctionner pleinement.");
}

// Open image manager
function openImageManager() {
    alert("Gestionnaire d'images - Cette fonctionnalité nécessiterait une intégration avec un système de stockage pour fonctionner pleinement.");
}

// Save settings
function saveSettings(e) {
    e.preventDefault();
    
    const settings = {
        title: document.getElementById("siteTitle").value,
        dates: document.getElementById("conferenceDates").value,
        description: document.getElementById("siteDescription").value
    };
    
    // In a real application, this would save to a database
    console.log("Settings saved:", settings);
    
    // Show success message
    const form = document.getElementById("settingsForm");
    const successMessage = document.createElement("div");
    successMessage.className = "alert alert-success mt-3";
    successMessage.textContent = "Paramètres enregistrés avec succès !";
    
    form.parentNode.insertBefore(successMessage, form.nextSibling);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

// Initialize admin check when page loads - DISABLED
// document.addEventListener("DOMContentLoaded", function() {
//     debugLog('📄 DOMContentLoaded - Page fully loaded');
//
//     // Add debug log div if it doesn't exist
//     if (!document.getElementById('debug-log')) {
//         const debugDiv = document.createElement('div');
//         debugDiv.id = 'debug-log';
//         debugDiv.style.cssText = 'position: fixed; top: 10px; right: 10px; width: 300px; height: 200px; background: rgba(0,0,0,0.8); color: white; padding: 10px; overflow-y: auto; z-index: 9999; font-family: monospace; font-size: 12px;';
//         document.body.appendChild(debugDiv);
//     }
//
//     checkAdminAuth();
//
//     // Add admin login button to footer or navigation - DISABLED
//     // const footer = document.querySelector(".footer");
//     // if (footer) {
//     //     const adminLink = document.createElement("div");
//     //     adminLink.className = "mt-3 text-center";
//     //     adminLink.innerHTML = '<a href="#" class="text-white" data-bs-toggle="modal" data-bs-target="#adminModal">Espace Administrateur</a>';
//     //     footer.querySelector(".container .row").appendChild(adminLink);
//     //     debugLog('✅ Admin link added to footer');
//     // } else {
//     //     debugLog('⚠️ Footer not found');
//     // }
//
//     // Test if adminLoginBtn exists
//     const loginBtn = document.getElementById('adminLoginBtn');
//     if (loginBtn) {
//         debugLog('✅ adminLoginBtn found and ready');
//     } else {
//         debugLog('❌ adminLoginBtn NOT found - modal may not be loaded yet');
//     }
// });

// Keyboard shortcuts for admin - DISABLED
// document.addEventListener("keydown", function(e) {
//     // Ctrl + Alt + A to open admin panel
//     if (e.ctrlKey && e.altKey && e.key === "a") {
//         if (localStorage.getItem("adminAuthenticated") === "true") {
//             toggleAdminPanel();
//         } else {
//             const modal = new bootstrap.Modal(document.getElementById("adminModal"));
//             modal.show();
//         }
//     }
// });

// Responsive navigation fix
window.addEventListener("resize", function() {
    const navbar = document.querySelector(".navbar");
    if (window.innerWidth > 992) {
        navbar.classList.remove("fixed-top");
    } else {
        navbar.classList.add("fixed-top");
    }
});

// Lazy loading for images
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll("img[loading='lazy']");
    
    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove("lazy");
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
});

// Accessibility improvements
document.addEventListener("DOMContentLoaded", function() {
    // Add ARIA labels to navigation
    const nav = document.querySelector(".navbar");
    if (nav) {
        nav.setAttribute("aria-label", "Navigation principale");
    }
    
    // Add skip link for screen readers
    const skipLink = document.createElement("a");
    skipLink.href = "#accueil";
    skipLink.textContent = "Aller au contenu principal";
    skipLink.className = "sr-only sr-only-focusable";
    skipLink.style.position = "absolute";
    skipLink.style.left = "-9999px";
    skipLink.style.top = "auto";
    skipLink.style.width = "1px";
    skipLink.style.height = "1px";
    skipLink.style.overflow = "hidden";
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Remove skip link styles when focused
    skipLink.addEventListener("focus", function() {
        this.style.left = "10px";
        this.style.width = "auto";
        this.style.height = "auto";
        this.style.overflow = "visible";
    });
});

// Performance optimizations
(function() {
    // Debounce function for scroll events
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Throttle scroll events
    const handleScroll = debounce(function() {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 100) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }, 100);
    
    window.addEventListener("scroll", handleScroll);
})();

// Language translation functionality using Google Translate
function translatePage(lang) {
    console.log('🌍 translatePage called with language:', lang);
    
    // Store the language preference in localStorage
    localStorage.setItem('preferredLanguage', lang);
    
    // Method 1: Try Google Translate first
    tryGoogleTranslate(lang);
    
    // Method 2: Fallback to page reload with language parameter
    setTimeout(() => {
        if (lang !== 'fr') { // Only reload if not already French
            const currentUrl = window.location.href.split('?')[0]; // Remove existing params
            window.location.href = currentUrl + '?lang=' + lang;
        }
    }, 2000); // Give Google Translate a chance first
}

// Try Google Translate method
function tryGoogleTranslate(lang) {
    console.log('🔧 Attempting Google Translate method...');
    
    // Check if Google Translate script is already loaded
    if (!document.getElementById('google-translate-script')) {
        console.log('📥 Loading Google Translate script...');
        // Load Google Translate script
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);
    }
    
    // Initialize Google Translate
    window.googleTranslateElementInit = function() {
        console.log('🔧 Initializing Google Translate element...');
        new google.translate.TranslateElement({
            pageLanguage: 'fr',
            includedLanguages: 'en,fr',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
        }, 'google_translate_element');
        
        // Force language change after initialization
        setTimeout(() => {
            forceGoogleTranslateLanguage(lang);
        }, 1000);
    };
    
    // Add a container for Google Translate if it doesn't exist
    if (!document.getElementById('google_translate_element')) {
        const translateContainer = document.createElement('div');
        translateContainer.id = 'google_translate_element';
        translateContainer.style.display = 'none';
        document.body.appendChild(translateContainer);
    }
}

// Force language change in Google Translate
function forceGoogleTranslateLanguage(lang) {
    console.log('🔄 Attempting to force Google Translate language to:', lang);
    
    try {
        // Try to set language via Google Translate API
        if (window.google && window.google.translate) {
            const translateElement = document.querySelector('.goog-te-combo');
            if (translateElement) {
                console.log('✅ Found Google Translate combo box');
                translateElement.value = lang;
                translateElement.dispatchEvent(new Event('change'));
                
                // Click the translate button to force translation
                const translateButton = document.querySelector('.goog-te-button');
                if (translateButton) {
                    console.log('🔘 Clicking translate button');
                    translateButton.click();
                }
            }
        }
        
    } catch (error) {
        console.error('❌ Error with Google Translate:', error);
    }
}

// Handle page load with language parameter
function handleLanguageTranslation() {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang');
    
    if (lang === 'en') {
        console.log('🌐 Page loaded with English language parameter');
        
        // Show loading indicator
        showTranslationLoading();
        
        // Try to translate the page content
        translatePageContent();
        
        // Remove the language parameter from URL after translation
        setTimeout(() => {
            const cleanUrl = window.location.href.split('?')[0];
            window.history.replaceState({}, document.title, cleanUrl);
        }, 3000);
    }
}

// Show translation loading indicator
function showTranslationLoading() {
    const loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'translation-loading';
    loadingIndicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #3498db;
        color: white;
        padding: 15px;
        text-align: center;
        z-index: 9999;
        font-weight: bold;
    `;
    loadingIndicator.textContent = '🌍 Translating page to English...';
    
    document.body.prepend(loadingIndicator);
    
    // Remove after 5 seconds
    setTimeout(() => {
        loadingIndicator.remove();
    }, 5000);
}

// Translate page content using simple dictionary-based approach
function translatePageContent() {
    console.log('📝 Translating page content...');
    
    // Comprehensive translations for all page elements
    const translations = {
        // Navigation
        'Accueil': 'Home',
        'À propos': 'About',
        'Soumission': 'Submission',
        'Programme': 'Program',
        'Conférenciers': 'Speakers',
        'Inscription': 'Registration',
        'Contact': 'Contact',
        'S\'inscrire': 'Register',
        'Langue': 'Language',
        'Français': 'French',
        'English': 'English',
        
        // Hero Section
        'Conférenciers Principaux (Keynote Speakers)': 'Keynote Speakers',
        'Experts internationaux en informatique et technologies éducatives': 'International experts in computer science and educational technologies',
        'Juin 2026': 'June 2026',
        'Première Édition': 'First Edition',
        'Institution hôte :': 'Host Institution:',
        'Laboratoire d\'Informatique et des Technologies Éducatives': 'Laboratory of Computer Science and Educational Technologies',
        'École Normale Supérieure, Université de Yaoundé I – Cameroun': 'Normal Superior School, University of Yaoundé I – Cameroon',
        'Format': 'Format',
        'Hybride': 'Hybrid',
        '(Présentiel + En ligne)': '(In-person + Online)',
        'S\'inscrire Maintenant': 'Register Now',
        'Soumettre un article': 'Submit Paper',
        'Compte à rebours': 'Countdown',
        'Jours': 'Days',
        'Heures': 'Hours',
        'Minutes': 'Minutes',
        'Secondes': 'Seconds',
        
        // About Section
        'À propos': 'About',
        'La 1ère Conférence sur les Avancées en Informatique et Technologies Éducatives (EdTech) pour le Développement Durable (CAITED) vise à rassembler les chercheurs, éducateurs, technologues et décideurs pour explorer l\'intersection de l\'informatique, de l\'EdTech et des objectifs de développement durable (ODD).': 'The 1st Conference on Advances in Computer Science and Educational Technologies (EdTech) for Sustainable Development (CAITED) aims to bring together researchers, educators, technologists and decision-makers to explore the intersection of computer science, EdTech and the Sustainable Development Goals (SDGs).',
        'Elle sert de plateforme pour le dialogue interdisciplinaire entre les informaticiens, les spécialistes de l\'éducation, les praticiens du développement et les experts Tech 4 Society.': 'It serves as a platform for interdisciplinary dialogue between computer scientists, education specialists, development practitioners and Tech 4 Society experts.',
        'Lieu': 'Location',
        'Université de Yaoundé I': 'University of Yaoundé I',
        'Yaoundé, Cameroun': 'Yaoundé, Cameroon',
        'Dates': 'Dates',
        'Début Juin 2026': 'Early June 2026',
        'Partenaires de Publication': 'Publication Partners',
        'Conférence': 'Conference',
        'Cette conférence vise à rassembler les chercheurs, éducateurs, technologues et décideurs pour explorer l\'intersection de l\'informatique, de l\'EdTech et des objectifs de développement durable (ODD).': 'This conference aims to bring together researchers, educators, technologists and decision-makers to explore the intersection of computer science, EdTech and the Sustainable Development Goals (SDGs).',
        'Certification': 'Certification',
        'Certificat de participation délivré à tous les participants': 'Certificate of participation awarded to all participants',
        
        // Submission Section
        'Soumission d\'Articles': 'Paper Submission',
        'Soumettez vos travaux de recherche pour présentation à la conférence': 'Submit your research papers for conference presentation',
        'Axes thématiques (TRACK Thématiques)': 'Thematic Areas (TRACK Themes)',
        'T1 : Numérique et développement durable': 'T1: Digital and Sustainable Development',
        'T2 : Technologies éducatives et innovation pédagogique': 'T2: Educational Technologies and Pedagogical Innovation',
        'T3 : Inclusion numérique, jeunesse et autonomisation des femmes': 'T3: Digital Inclusion, Youth and Women Empowerment',
        'T4 : Technologies informatiques émergentes et applications': 'T4: Emerging Computer Technologies and Applications',
        'T5 : Intelligence artificielle, modèles éducatifs et générations d\'apprenants': 'T5: Artificial Intelligence, Educational Models and Learner Generations',
        'T6 : Gouvernance numérique, éthique et cybersécurité': 'T6: Digital Governance, Ethics and Cybersecurity',
        'T7 : Innovation, entrepreneuriat numérique et leadership des jeunes et des femmes': 'T7: Innovation, Digital Entrepreneurship and Youth and Women Leadership',
        'Types de Soumission': 'Submission Types',
        'Articles Complets': 'Full Papers',
        'Articles Courts': 'Short Papers',
        'Posters & Démonstrations': 'Posters & Demonstrations',
        'Instructions aux Auteurs': 'Author Instructions',
        'Les soumissions doivent être originales et non publiées ailleurs': 'Submissions must be original and not published elsewhere',
        'Format : PDF conforme au modèle Springer LNCS': 'Format: PDF compliant with Springer LNCS template',
        'Langues : Français ou Anglais': 'Languages: French or English',
        'Soumission via Ms CMT': 'Submission via Ms CMT',
        'lien à venir': 'link coming soon',
        'Publications et Résultats': 'Publications and Outcomes',
        'Les articles seront publiés dans :': 'Papers will be published in:',
        'Actes de conférence :': 'Conference Proceedings:',
        'Numéros spéciaux :': 'Special Issues:',
        'Autres :': 'Others:',
        
        // Program Section
        'Programme de la Conférence': 'Conference Program',
        'Trois jours d\'échanges, d\'apprentissage et de networking': 'Three days of exchanges, learning and networking',
        'Jour 1': 'Day 1',
        'Jour 2': 'Day 2',
        'Jour 3': 'Day 3',
        'Accueil et enregistrement des participants': 'Welcome and participant registration',
        'Hall principal de l\'Université de Yaoundé': 'Main hall of the University of Yaoundé',
        'Cérémonie d\'ouverture': 'Opening Ceremony',
        'Discours d\'ouverture par les autorités universitaires et gouvernementales': 'Opening speeches by university and government authorities',
        'Conférence plénière': 'Plenary Conference',
        'À compléter': 'To be completed',
        'Sessions parallèles': 'Parallel Sessions',
        'Présentations de recherches': 'Research Presentations',
        'Atelier pratique': 'Practical Workshop',
        'Introduction aux outils de création de contenus éducatifs numériques': 'Introduction to digital educational content creation tools',
        'Table ronde': 'Round Table',
        'Ministres, décideurs et experts discutent': 'Ministers, decision-makers and experts discuss',
        'Événement EdTech Day : Démonstrations de solutions': 'EdTech Day Event: Solution Demonstrations',
        'Présentation des dernières innovations en technologies éducatives par des startups': 'Presentation of the latest innovations in educational technologies by startups',
        'Session posters et networking': 'Poster Session and Networking',
        'Présentation de recherches sous forme de posters et échanges informels': 'Presentation of research in poster form and informal exchanges',
        'Cérémonie de clôture et remise des prix': 'Closing Ceremony and Awards',
        'Synthèse des travaux, annonce des meilleures présentations et mot de clôture': 'Summary of work, announcement of best presentations and closing remarks',
        
        // Registration Section
        'Inscription à la Conférence': 'Conference Registration',
        'Réservez votre place dès maintenant pour participer à cet événement international. Tarifs spéciaux pour les étudiants et groupes.': 'Book your spot now to participate in this international event. Special rates for students and groups.',
        'Tableau des Tarifs': 'Price Table',
        'Catégorie': 'Category',
        'Mode Présentiel': 'In-Person',
        'Mode En Ligne': 'Online',
        'CEMAC': 'CEMAC',
        'International (€)': 'International (€)',
        'Étudiant': 'Student',
        'PLEG & PCEG': 'PLEG & PCEG',
        'Académie': 'Academia',
        'Professionnel': 'Professional',
        'Auditeur': 'Listener',
        'FCFA': 'XAF',
        'Gratuit': 'Free',
        'Formulaire d\'inscription': 'Registration Form',
        'Prénom *': 'First Name *',
        'Nom *': 'Last Name *',
        'Email *': 'Email *',
        'Institution/Organisation *': 'Institution/Organization *',
        'Catégorie *': 'Category *',
        'Sélectionnez une catégorie': 'Select a category',
        'Jours de participation *': 'Participation Days *',
        'Jour 1 (Début Juin)': 'Day 1 (Early June)',
        'Jour 2 (Mi-Juin)': 'Day 2 (Mid-June)',
        'Jour 3 (Fin Juin)': 'Day 3 (Late June)',
        'Commentaires ou exigences particulières': 'Special requirements or comments',
        'J\'accepte les conditions générales et la politique de confidentialité *': 'I accept the terms and conditions and privacy policy *',
        'S\'inscrire Maintenant': 'Register Now',
        
        // Footer
        'CAITED 2026': 'CAITED 2026',
        'Conférence sur les Avancées en Informatique et Technologies Éducatives pour une Société et un Développement Durables.': 'Conference on Advances in Computer Science and Educational Technologies for Society and Sustainable Development.',
        'Organisée par le': 'Organized by',
        'Laboratoire LITE': 'LITE Laboratory',
        'École Normale Supérieure (ENS)': 'Normal Superior School (ENS)',
        'Université de Yaoundé I – Cameroun': 'University of Yaoundé I – Cameroon',
        'Liens rapides': 'Quick Links',
        'Dates importantes': 'Important Dates',
        'Décembre 2025': 'December 2025',
        'Lancement appel à communications': 'Call for papers launch',
        'Mars 2026': 'March 2026',
        'Soumission articles complets': 'Full paper submission',
        'Avril 2026': 'April 2026',
        'Notification d\'acceptation': 'Notification of acceptance',
        'Début Mai 2026': 'Early May 2026',
        'Soumission version finale': 'Final paper submission',
        'Mi-Mai 2026': 'Mid-May 2026',
        'Date limite inscription': 'Registration deadline',
        'Suivez-nous': 'Follow Us',
        'Newsletter': 'Newsletter',
        'Votre email': 'Your email',
        'S\'abonner': 'Subscribe',
        'Statistiques des Visiteurs': 'Visitor Statistics',
        'Voir les Statistiques': 'View Statistics',
        'Total des consultations:': 'Total visits:',
        '© 2026 Conférence CAITED 2026. Tous droits réservés.': '© 2026 CAITED 2026 Conference. All rights reserved.',
        'Organisé par le Laboratoire LITE et l\'ENS, Université de Yaoundé I': 'Organized by LITE Laboratory and ENS, University of Yaoundé I',
        'Développeur du site :': 'Website Developer:',
        'Politique de confidentialité': 'Privacy Policy',
        'Conditions d\'utilisation': 'Terms of Use'
    };
    
    // Translate text content
    document.querySelectorAll('*').forEach(element => {
        if (element.children.length === 0) {
            const text = element.textContent.trim();
            if (translations[text]) {
                element.textContent = translations[text];
            }
        }
    });
    
    // Translate placeholder text
    document.querySelectorAll('[placeholder]').forEach(element => {
        const placeholder = element.getAttribute('placeholder');
        if (translations[placeholder]) {
            element.setAttribute('placeholder', translations[placeholder]);
        }
    });
    
    // Translate button text
    document.querySelectorAll('button').forEach(button => {
        const text = button.textContent.trim();
        if (translations[text]) {
            button.textContent = translations[text];
        }
    });
    
    // Translate form options
    document.querySelectorAll('option').forEach(option => {
        const text = option.textContent.trim();
        if (translations[text]) {
            option.textContent = translations[text];
        }
    });
    
    // Translate table headers
    document.querySelectorAll('th').forEach(header => {
        const text = header.textContent.trim();
        if (translations[text]) {
            header.textContent = translations[text];
        }
    });
    
    // Translate section titles
    document.querySelectorAll('.section-title').forEach(title => {
        const text = title.textContent.trim();
        if (translations[text]) {
            title.textContent = translations[text];
        }
    });
    
    console.log('✅ Page translation completed');
}

// Initialize language handling when page loads
document.addEventListener('DOMContentLoaded', handleLanguageTranslation);
