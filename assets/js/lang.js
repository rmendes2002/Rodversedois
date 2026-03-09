// assets/js/lang.js
// Dicionário Centralizado de Internacionalização (i18n)

const translations = {
    // ==========================================
    // NAVBAR & GERAL
    // ==========================================
    nav_home: {
        pt: "HOME",
        en: "HOME"
    },
    nav_projetos: {
        pt: "PROJETOS",
        en: "PROJECTS"
    },
    nav_sobre: {
        pt: "SOBRE",
        en: "ABOUT"
    },
    nav_contato: {
        pt: "CONTATO",
        en: "CONTACT"
    },
    btn_start: {
        pt: "COMECE AGORA",
        en: "START NOW"
    },

    // ==========================================
    // HOME PAGE
    // ==========================================
    home_headline_1: {
        pt: "Testando os novos limites",
        en: "Testing the new limits"
    },
    home_headline_2: {
        pt: "da criatividade",
        en: "of creativity"
    },
    home_subheadline: {
        pt: "Elevando o padrão audiovisual para marcas e criadores de conteúdo com edição de vídeos curtos.",
        en: "Elevating the audiovisual standard for brands and content creators with short-form video editing."
    },
    home_reel_btn: {
        pt: "ASSISTA O REEL",
        en: "WATCH REEL"
    },

    // ==========================================
    // PROJECTS PAGE
    // ==========================================
    projects_title: {
        pt: "Projetos em destaque",
        en: "Featured Projects"
    },
    projects_more_btn: {
        pt: "Ver mais projetos",
        en: "View more projects"
    },

    // ==========================================
    // ABOUT PAGE
    // ==========================================
    about_title: {
        pt: "A Alma da Rodverse",
        en: "The Rodverse Soul"
    },
    about_story_title: {
        pt: "Nossa Jornada",
        en: "Our Journey"
    },
    about_p1: {
        pt: "Somos um estúdio criativo que existe para tirar ideias do território do “isso não dá pra fazer”. Acreditamos especialmente naquelas ideias que você normalmente descarta logo no começo, por parecerem impossíveis ou boas demais para serem reais. Para nós, é justamente aí que mora o que realmente vale a pena explorar.",
        en: "We are a creative studio that exists to pull ideas out of the “that can’t be done” territory. We especially believe in those ideas that you normally discard right at the beginning, because they seem impossible or too good to be true. For us, that is exactly where what is truly worth exploring lies."
    },
    about_philosophy_title: {
        pt: "Nossa Filosofia Criativa",
        en: "Our Creative Philosophy"
    },
    about_p2: {
        pt: "Nosso trabalho é simples de explicar: usamos tudo o que for possível para trazer uma ideia à vida. Inteligência artificial, 3D, realidade virtual e qualquer técnica que ajude a transformar sua ideia em algo real.",
        en: "Our work is simple to explain: we use everything possible to bring an idea to life. Artificial intelligence, 3D, virtual reality, and any technique that helps transform your idea into something real."
    },
    about_p3: {
        pt: "Gostamos de criar coisas que parecem impossíveis — aquelas que fazem alguém parar por um segundo e pensar: “espera… isso é real?”",
        en: "We like to create things that seem impossible — the ones that make someone stop for a second and think: “wait… is this real?”"
    },
    about_p4: {
        pt: "A Rodverse também nasce da curiosidade. Testamos, exploramos e aprendemos constantemente, porque as ferramentas mudam o tempo todo e novas possibilidades aparecem todos os dias.",
        en: "Rodverse is also born from curiosity. We constantly test, explore, and learn, because tools change all the time and new possibilities appear every day."
    },
    about_p5: {
        pt: "E se você chegar com uma ideia que a gente ainda não sabe fazer… pode deixar que a gente aprende.",
        en: "And if you come to us with an idea that we still don't know how to do... rest assured that we will learn."
    },
    about_stat1_value: { pt: "50M+", en: "50M+" },
    about_stat1_label: { pt: "Views Geradas", en: "Views Generated" },
    about_stat2_value: { pt: "20+", en: "20+" },
    about_stat2_label: { pt: "Marcas Elevadas", en: "Elevated Brands" },
    about_stat3_value: { pt: "100%", en: "100%" },
    about_stat3_label: { pt: "Foco em Retenção", en: "Retention Focus" },

    // ==========================================
    // CONTACT PAGE
    // ==========================================
    contact_title: {
        pt: "Entre em Contato",
        en: "Get in Touch"
    },
    contact_subtitle: {
        pt: "Converse conosco diretamente pelo WhatsApp para projetos e parcerias.",
        en: "Chat with us directly via WhatsApp for projects and partnerships."
    },
    contact_whatsapp_btn: {
        pt: "Enviar Mensagem pelo WhatsApp",
        en: "Send Message via WhatsApp"
    },
    contact_helper: {
        pt: "Clique para abrir o WhatsApp e iniciar a conversa. Responderemos o mais breve possível.",
        en: "Click to open WhatsApp and start the conversation. We will reply as soon as possible."
    },
    contact_hours: {
        pt: "Horário de Atendimento: Seg–Sex, 9h–18h",
        en: "Business Hours: Mon–Fri, 9am–6pm"
    }
};

// Language Engine Core
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('rodverse_lang') || 'pt';
        this.init();
    }

    init() {
        // Find toggles in the DOM when Barba transitions occur
        this.bindEvents();
        // Apply current lang
        this.applyTranslations();
    }

    setLanguage(lang) {
        if (lang !== 'pt' && lang !== 'en') return;
        this.currentLang = lang;
        localStorage.setItem('rodverse_lang', lang);

        // Update DOM active classes
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Add a smooth fade-out fade-in transition using GSAP if available
        if (typeof gsap !== 'undefined') {
            gsap.to('[data-i18n]', {
                opacity: 0,
                duration: 0.2,
                y: -5,
                onComplete: () => {
                    this.applyTranslations();
                    gsap.to('[data-i18n]', { opacity: 1, duration: 0.3, y: 0 });
                }
            });
        } else {
            this.applyTranslations();
        }
    }

    applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.dataset.i18n;
            if (translations[key] && translations[key][this.currentLang]) {
                // If the element is an input/textarea, update the placeholder
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[key][this.currentLang];
                } else {
                    el.innerHTML = translations[key][this.currentLang];
                }
            }
        });
    }

    bindEvents() {
        // Set up the toggle buttons
        const toggles = document.querySelectorAll('.lang-btn');
        toggles.forEach(btn => {
            // Set initial active state based on storage
            btn.classList.toggle('active', btn.dataset.lang === this.currentLang);

            // Avoid duplicate listeners
            if (btn.dataset.langBound) return;
            btn.dataset.langBound = 'true';

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.setLanguage(e.target.dataset.lang);
            });
        });
    }
}

// Global initialization
window.langManager = null;

window.initLanguageToggle = function () {
    if (!window.langManager) {
        window.langManager = new LanguageManager();
    } else {
        window.langManager.init();
    }
}

// Ensure it binds correctly on first load
document.addEventListener('DOMContentLoaded', window.initLanguageToggle);
