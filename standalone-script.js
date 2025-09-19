// Données du portfolio en mode démo
const portfolioData = [
    {
        id: 'demo-1',
        title: 'Résidence Moderne Les Jardins',
        description: 'Construction d\'un complexe résidentiel de 45 appartements avec espaces verts intégrés et équipements modernes.',
        createdAt: new Date('2024-01-15').toISOString()
    },
    {
        id: 'demo-2', 
        title: 'Villa Contemporaine Montfermeil',
        description: 'Rénovation complète d\'une villa avec extension moderne et aménagements écologiques.',
        createdAt: new Date('2024-02-28').toISOString()
    },
    {
        id: 'demo-3',
        title: 'Centre Commercial Rosny',
        description: 'Construction d\'un centre commercial de 8000m² avec parking souterrain et aménagements extérieurs.',
        createdAt: new Date('2024-03-10').toISOString()
    }
];

// Fonctions utilitaires
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Gestion du menu mobile
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Fermer le menu mobile lors du clic sur un lien
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.getElementById('navMenu');
            navMenu.classList.remove('active');
        });
    });
});

// Gestion du scroll pour le header
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.9)';
    }
});

// Chargement du portfolio
function loadPortfolio() {
    const portfolioList = document.getElementById('portfolioList');
    
    if (portfolioData.length === 0) {
        portfolioList.innerHTML = `
            <div class="loading">
                <p>Aucun projet dans le portfolio pour le moment.</p>
            </div>
        `;
        return;
    }

    portfolioList.innerHTML = portfolioData.map((item, index) => `
        <div class="portfolio-item">
            <div class="portfolio-content">
                <div class="portfolio-number">${index + 1}</div>
                <div class="portfolio-text">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="portfolio-date">${formatDate(item.createdAt)}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// Gestion du modal de licence
function openLicenseModal() {
    document.getElementById('licenseModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLicenseModal() {
    document.getElementById('licenseModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fermer le modal en cliquant à l'extérieur
window.addEventListener('click', function(event) {
    const modal = document.getElementById('licenseModal');
    if (event.target === modal) {
        closeLicenseModal();
    }
});

// Fermer le modal avec la touche Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLicenseModal();
    }
});

// Gestion du formulaire de contact
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validation simple
    if (!data.name || !data.email || !data.subject || !data.message) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
    }
    
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Veuillez entrer une adresse email valide.');
        return;
    }
    
    // Simuler l'envoi du message
    console.log('Message envoyé:', data);
    
    // Afficher le message de succès
    showSuccessMessage();
    
    // Réinitialiser le formulaire
    form.reset();
}

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'flex';
    
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

// Panneau d'administration simple
function showAdminPanel() {
    const password = prompt('Mot de passe administrateur:');
    if (password === 'FGROUP-ADMIN-2024') {
        alert('Accès administrateur accordé!\n\nFonctionnalités disponibles:\n- Gestion du portfolio via l\'interface React\n- Modification des informations de contact\n- Gestion des messages clients\n\nPour accéder à toutes les fonctionnalités, utilisez la version React du site.');
    } else if (password !== null) {
        alert('Mot de passe incorrect.');
    }
}

// Animation des éléments au scroll
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.feature-card, .portfolio-item, .stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach((element) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Gestion des liens de navigation avec smooth scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Gestion du responsive
function handleResize() {
    const navMenu = document.getElementById('navMenu');
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
    }
}

window.addEventListener('resize', handleResize);

// Performance: Lazy loading des images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Fonction de nettoyage pour éviter les fuites mémoire
function cleanup() {
    // Nettoyer les event listeners si nécessaire
    window.removeEventListener('scroll', function() {});
    window.removeEventListener('resize', handleResize);
}

// Fonction de débogage
function debugInfo() {
    console.log('FGROUP Website Debug Info:');
    console.log('- Portfolio items:', portfolioData.length);
    console.log('- Current page:', window.location.href);
    console.log('- Viewport:', window.innerWidth + 'x' + window.innerHeight);
    console.log('- User agent:', navigator.userAgent);
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('FGROUP Website - Version HTML/CSS Standalone');
    
    // Charger le portfolio
    loadPortfolio();
    
    // Configurer les animations
    animateOnScroll();
    
    // Configurer le scroll smooth
    setupSmoothScroll();
    
    // Configurer le lazy loading
    setupLazyLoading();
    
    // Log de débogage en mode développement
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        debugInfo();
    }
    
    console.log('Site FGROUP initialisé avec succès!');
});

// Gestion des erreurs globales
window.addEventListener('error', function(event) {
    console.error('Erreur détectée:', event.error);
    
    // En production, vous pourriez envoyer ces erreurs à un service de monitoring
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        // Envoyer l'erreur à un service de monitoring
        // trackError(event.error);
    }
});

// Fonctions utilitaires supplémentaires
const Utils = {
    // Valider un email
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Valider un numéro de téléphone français
    validatePhoneFR: function(phone) {
        const re = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        return re.test(phone);
    },
    
    // Nettoyer le texte des caractères dangereux
    sanitizeText: function(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    // Générer un ID unique
    generateId: function() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    // Formater un numéro de téléphone
    formatPhone: function(phone) {
        return phone.replace(/(\d{2})(?=\d)/g, '$1 ');
    }
};

// Export pour utilisation externe si nécessaire
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        scrollToSection,
        formatDate,
        toggleMobileMenu,
        openLicenseModal,
        closeLicenseModal,
        handleFormSubmit,
        showAdminPanel,
        Utils
    };
}