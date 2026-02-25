/**
 * GESTION DU SCROLL : Changement d'apparence de la Navbar
 */
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY >= 80) {
            header.classList.add("navbarDark");
        } else {
            header.classList.remove("navbarDark");
        }
    });
}

/**
 * FERMETURE AUTO DU MENU MOBILE : Après un clic sur un lien
 */
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-link");
    const menuToggle = document.getElementById("navbarNav");
    const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (menuToggle.classList.contains("show")) {
                bsCollapse.hide();
            }
        });
    });
}

/**
 * INITIALISATION DES PARTICULES (Background dynamique)
 */
function load() {
    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        particles: {
            number: { 
                value: 80, 
                density: { enable: true, area: 800 } 
            },
            color: { value: "#6366f1" },
            shape: { type: "circle" },
            opacity: { 
                value: 0.3,
                random: true 
            },
            size: { 
                value: { min: 1, max: 3 } 
            },
            links: {
                enable: true,
                distance: 150,
                color: "#6366f1",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                random: false,
                straight: false,
                outModes: { default: "out" }
            }
        },
        interactivity: {
            events: { 
                onHover: { enable: true, mode: "grab" },
                onClick: { enable: true, mode: "push" } 
            },
            modes: { 
                grab: { distance: 200, links: { opacity: 0.5 } },
                push: { quantity: 4 }
            }
        },
        detectRetina: true
    });
}

/**
 * CHARGEMENT DES COMPÉTENCES (SKILLS)
 */
function createSkillsFromJSON() {
    const container = document.querySelector("#skills .row");

    fetch("data/skills.json")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "col-md-6", "mb-4");
                // On ajoute un délai progressif pour l'animation AOS
                card.setAttribute("data-aos", "fade-up");
                card.setAttribute("data-aos-delay", (index * 100).toString());

                card.innerHTML = `
                    <div class="card skillsText">
                        <div class="card-body">
                            <img src="./images/${item.image}" alt="${item.title}" />
                            <h3 class="card-title">${item.title}</h3>
                            <p class="card-text">${item.text}</p>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        });
}

/**
 * CHARGEMENT DU PORTFOLIO (PROJETS)
 */
function createPortfolioFromJSON() {
    const container = document.querySelector("#portfolio .row");
document.getElementById("year").textContent = new Date().getFullYear();
    fetch("data/portfolio.json")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "col-md-6", "mb-4");
                card.setAttribute("data-aos", "zoom-in");
                card.setAttribute("data-aos-delay", (index * 100).toString());

                card.innerHTML = `
                    <div class="card portfolioContent">
                        <img class="card-img-top" src="images/${item.image}" alt="${item.title}">
                        <div class="card-body">
                            <h3 class="card-title text-gradient">${item.title}</h3>
                            <p class="card-text">${item.text}</p>
                            
                            <div class="qa-status mt-3 mb-3">
                                <small><i class="fas fa-shield-check"></i> Stabilité QA : 100%</small>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width: 100%"></div>
                                </div>
                            </div>

                            <div class="text-center mt-auto">
                                <a href="${item.link}" target="_blank" class="btn btn-primary btn-sm w-100">
                                    <i class="fab fa-github"></i> Explorer le Repo
                                </a>
                            </div>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        });
}

/**
 * GESTION DES LIENS ACTIFS AU SCROLL
 */
function handleActiveNavLink() {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    /* --- ACTIVE AU CLIC --- */
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
        });
    });

    /* --- ACTIVE AU SCROLL --- */
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => link.classList.remove("active"));

                    const activeLink = document.querySelector(
                        `.nav-link[href="#${entry.target.id}"]`
                    );

                    if (activeLink) {
                        activeLink.classList.add("active");
                    }
                }
            });
        },
        {
            rootMargin: "-30% 0px -60% 0px"
        }
    );

    sections.forEach(section => observer.observe(section));
}


// Initialisation de toutes les fonctions au chargement du DOM
document.addEventListener("DOMContentLoaded", () => {
    handleNavbarScroll();
    handleNavbarCollapse();
    load();
    createSkillsFromJSON();
    createPortfolioFromJSON();
    handleActiveNavLink();
});