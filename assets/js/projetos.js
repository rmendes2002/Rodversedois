window.initProjetos = function () {
    // 1. Generate Placeholder Projects
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = '';

    const projectData = [
        {
            id: 1,
            title: 'Shopping Leblon X Rio Open',
            category: 'Reels',
            image: 'assets/images/project1.webp',
            videoSrc: 'assets/videos/slb-rio-open.webm',
            descPt: 'E se o mascote do Shopping Leblon invadisse um dos maiores eventos esportivos do Brasil? Foi exatamente isso que fizemos! Para celebrar a parceria com o Rio Open, levamos o Afrânio diretamente para o universo do torneio e transformamos o Jockey Club em palco para uma intervenção criativa e divertida. Usando inteligência artificial como ferramenta de produção, criamos um vídeo que mistura o ambiente real do evento com uma narrativa inesperada, colocando o mascote do shopping no centro da ação e aproximando ainda mais a marca do clima vibrante do maior torneio de tênis da América do Sul.',
            descEn: 'What if the Shopping Leblon mascot invaded one of the biggest sports events in Brazil? That\'s exactly what we did! To celebrate the partnership with the Rio Open, we brought Afrânio directly into the tournament\'s universe and transformed the Jockey Club into a stage for a creative and fun intervention. Using artificial intelligence as a production tool, we created a video that blends the actual event environment with an unexpected narrative, placing the mall\'s mascot at the center of the action and bringing the brand even closer to the vibrant atmosphere of South America\'s biggest tennis tournament.',
            delay: 0.0
        },
        {
            id: 2,
            title: 'Corrida Prio',
            category: 'Ads',
            image: 'assets/images/project2.webp',
            videoSrc: 'assets/videos/corrida-prio.webm',
            descPt: 'Como levar a história da Lebe e do Coelho para o universo de uma corrida? Esse foi o ponto de partida do projeto criado para a PRIO. Para anunciar a Corrida PRIO, realizada no Jockey Club, desenvolvemos um vídeo especial que transforma a narrativa desses personagens em um convite para a experiência do evento. O filme foi produzido 100% com inteligência artificial, criando um pequeno curta dinâmico e envolvente que ajudou a construir expectativa para a corrida e a conectar o público com o espírito de movimento, energia e superação que marca a prova.',
            descEn: 'How do you bring the story of Lebe and the Rabbit into the universe of a race? That was the starting point of the project created for PRIO. To announce the PRIO Race, held at the Jockey Club, we developed a special video that transforms the narrative of these characters into an invitation to the event experience. The film was produced 100% with artificial intelligence, creating a dynamic and engaging short film that helped build anticipation for the race and connect the audience with the spirit of movement, energy, and perseverance that marks the competition.',
            delay: 0.1
        },
        {
            id: 3,
            title: 'Halloween Elena',
            category: 'Product',
            image: 'assets/images/project3.webp',
            videoSrc: 'assets/videos/halloween-elena.webm',
            descPt: 'E se um restaurante no Rio de Janeiro virasse cenário de um anime? Para divulgar o evento de Halloween do Elena, no Horto, criamos um vídeo especial que mistura animação e o ambiente real do restaurante. O projeto acompanha um personagem desenvolvido para a história explorando o espaço do Elena e toda a decoração temática preparada para a noite. Produzido com o uso de inteligência artificial, o vídeo transforma o restaurante em parte da narrativa e apresenta o evento de uma forma criativa, divertida e inesperada.',
            descEn: 'What if a restaurant in Rio de Janeiro turned into an anime setting? To promote the Halloween event at Elena, located in Horto, we created a special video that mixes animation with the real environment of the restaurant. The project follows a character developed for the story exploring Elena\'s space and all the thematic decoration prepared for the night. Produced using artificial intelligence, the video turns the restaurant into part of the narrative and presents the event in a creative, fun, and unexpected way.',
            delay: 0.2
        },
        {
            id: 4,
            title: 'Acessa Black',
            category: 'AR',
            image: 'assets/images/project4.webp',
            videoSrc: 'assets/videos/Vídeo%20campanha%20AW%202025%20V1.webm',
            descPt: 'Como mostrar que as promoções da Black Friday são realmente gigantes? Para anunciar a campanha Acessa Black do Acessa Agro, criamos um vídeo que leva os influenciadores Os Primos Agro para um cenário de ficção no campo. Na narrativa, um deles aparece como um gigante caminhando pela paisagem rural, revelando de forma impactante o tamanho das promoções enquanto sua presença transforma o ambiente ao redor. Produzido com inteligência artificial, o projeto apresenta os descontos da campanha de uma maneira visual e inesperada, conectando o universo do agro com uma linguagem criativa pensada para chamar atenção nas redes.',
            descEn: 'How do you show that Black Friday promotions are truly giant? To announce the Acessa Black campaign by Acessa Agro, we created a video that takes the influencers Os Primos Agro to a fiction setting in the countryside. In the narrative, one of them appears as a giant walking through the rural landscape, strikingly revealing the size of the promotions while his presence transforms the surrounding environment. Produced with artificial intelligence, the project presents the campaign discounts in an unexpected, visual way, connecting the farming universe with creative language designed to grab attention on social media.',
            delay: 0.3
        },
        {
            id: 5,
            title: 'Rio Galeão X Rio Open',
            category: 'Reels',
            image: 'assets/images/project5.webp',
            videoSrc: 'assets/videos/galeao-rio-open.webm',
            descPt: 'Para celebrar o Rio Open dentro de um dos principais pontos de chegada da cidade, criamos um conteúdo especial para o Aeroporto Internacional do Rio Galeão. O projeto transforma o clima do torneio em uma peça visual envolvente dentro do aeroporto, conectando o universo do tênis com a experiência de quem chega ao Rio de Janeiro. Produzido com inteligência artificial, o vídeo cria uma intervenção criativa que aproxima o evento do público e reforça a atmosfera esportiva que toma conta da cidade durante o torneio.',
            descEn: 'To celebrate the Rio Open inside one of the main arrival points in the city, we created special content for the Rio Galeão International Airport. The project turns the tournament\'s atmosphere into an engaging visual piece inside the airport, connecting the tennis universe with the experience of those arriving in Rio de Janeiro. Produced with artificial intelligence, the video creates a creative intervention that brings the event closer to the audience and reinforces the sports atmosphere that takes over the city during the tournament.',
            delay: 0.4
        },
        {
            id: 6,
            title: 'Prio Conference',
            category: 'Ads',
            image: 'assets/images/project6.webp',
            videoSrc: 'assets/videos/prio-conference.webm',
            descPt: 'Como traduzir temas complexos do setor de energia em histórias visuais envolventes? Para a PRIO Conference, desenvolvemos uma série de curtas produzidos 100% com inteligência artificial, pensados para introduzir diferentes temas ligados ao universo do petróleo. Cada filme foi criado com uma linguagem visual própria, explorando estilos distintos para tornar cada narrativa única e memorável. O projeto envolveu toda a jornada criativa, desde o desenvolvimento cuidadoso dos roteiros até a produção e finalização das peças.',
            descEn: 'How do you translate complex energy sector topics into engaging visual stories? For the PRIO Conference, we developed a series of short films produced 100% with artificial intelligence, designed to introduce different themes related to the oil universe. Each film was created with its own visual language, exploring distinct styles to make each narrative unique and memorable. The project involved the entire creative journey, from the careful development of scripts to the production and finalization of the pieces.',
            delay: 0.5
        },
        {
            id: 7,
            title: 'Prio OTC',
            category: 'Product',
            image: 'assets/images/project7.webp',
            videoSrc: 'assets/videos/prio-otc.webm',
            descPt: 'Para a OTC no Rio de Janeiro, desenvolvemos uma animação especial criada para um telão anamórfico curvo de 180 graus. O projeto trouxe o CEO, mascote da PRIO, entrando em cena e interagindo com o espaço e com o público que passava pelo estande. Pensada para explorar o efeito imersivo do formato anamórfico, a peça cria a sensação de que o personagem realmente ocupa o ambiente. O resultado foi uma intervenção visual leve e divertida dentro de um grande evento do setor de óleo e gás.',
            descEn: 'For OTC in Rio de Janeiro, we developed a special animation created for a 180-degree curved anamorphic screen. The project brought the CEO, PRIO\'s mascot, entering the scene and interacting with the space and the audience passing by the booth. Designed to explore the immersive effect of the anamorphic format, the piece creates the sensation that the character actually occupies the environment. The result was a light and fun visual intervention inside a major oil and gas sector event.',
            delay: 0.6
        },
        {
            id: 8,
            title: 'Barra Shopping X Stranger Things',
            category: 'AR',
            image: 'assets/images/project8.webp',
            videoSrc: 'assets/videos/barra-shopping-stranger-things.webm',
            descPt: 'E se o Mundo Invertido invadisse um dos maiores shoppings do Rio? Para anunciar a ativação especial de Stranger Things no BarraShopping, criamos um vídeo em que o Devorador de Mentes surge invadindo o espaço do shopping, trazendo o clima misterioso e cinematográfico da série para o mundo real. Produzido com o uso de inteligência artificial, o projeto apresenta a chegada da ativação de forma impactante e conecta o universo de Stranger Things ao cotidiano da cidade.',
            descEn: 'What if the Upside Down invaded one of the biggest malls in Rio? To announce the special Stranger Things activation at BarraShopping, we created a video in which the Mind Flayer appears invading the mall space, bringing the mysterious and cinematic vibe of the series to the real world. Produced using artificial intelligence, the project impressively presents the arrival of the activation and connects the universe of Stranger Things to the daily life of the city.',
            delay: 0.7
        }
    ];

    // Populate Grid
    projectData.forEach(proj => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-category', proj.category.toLowerCase());
        card.style.animationDelay = `${proj.delay}s`;

        let title = proj.title;
        let imageSrc = proj.image;

        card.innerHTML = `
            <div class="card-image-wrapper">
                <img src="${imageSrc}" alt="${title}" class="card-image" loading="lazy">
                <div class="card-glare"></div>
            </div>
            <div class="card-title">${title}</div>
        `;

        // 3D Tilt and Glare Effect (Attached individually via mousemove)
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            gsap.to(card, {
                rotationY: x * 15,
                rotationX: -y * 15,
                ease: 'power2.out',
                duration: 0.5,
                transformPerspective: 1000
            });

            const glareX = 100 - ((e.clientX - rect.left) / rect.width * 100);
            const glareY = 100 - ((e.clientY - rect.top) / rect.height * 100);
            card.style.setProperty('--glare-x', `${glareX}%`);
            card.style.setProperty('--glare-y', `${glareY}%`);
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationY: 0,
                rotationX: 0,
                ease: 'elastic.out(1, 0.3)',
                duration: 1.2
            });
        });

        card.addEventListener('click', () => openModal(proj));
        projectsGrid.appendChild(card);
    });

    // 3. Modal Logic
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    const closeBtn = document.querySelector('.modal-close');
    const backBtn = document.querySelector('.modal-back-btn');
    const backdrop = document.querySelector('.modal-backdrop');
    const videoContainer = document.querySelector('.modal-video-container');

    // Initially hide modal setup
    modal.style.display = 'none';

    function openModal(project) {
        let title = project.title;
        let videoSrc = project.videoSrc;

        document.querySelector('.modal-title').textContent = title;

        const lang = window.langManager ? window.langManager.currentLang : 'pt';
        const desc = lang === 'en' ? project.descEn : project.descPt;

        document.querySelector('.modal-description').textContent = desc;

        // Layout handling — keep horizontal class for wide videos
        modal.classList.remove('modal-horizontal');
        if (project.id === 2 || project.id === 6) {
            modal.classList.add('modal-horizontal');
        }

        // Inject video
        if (videoContainer) {
            // Using controls so users can toggle sound, keeping auto-play logic.
            videoContainer.innerHTML = `<video src="${videoSrc}" autoplay loop muted controls playsinline></video>`;
        }

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // GSAP Popup Animation
        gsap.killTweensOf([modal, '.modal-content', '#persistent-navbar']);

        // Hide Navbar ONLY on mobile devices
        if (window.innerWidth <= 768) {
            gsap.to('#persistent-navbar', { y: -100, opacity: 0, duration: 0.4, ease: "power2.inOut" });
        }

        gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        gsap.fromTo('.modal-content',
            { scale: 0.85, y: 40, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.2)", delay: 0.1 }
        );
    }

    function closeModal() {
        // Show Navbar ONLY if it was hidden (i.e., on mobile)
        if (window.innerWidth <= 768) {
            gsap.to('#persistent-navbar', { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.2 });
        }

        gsap.to('.modal-content', { scale: 0.9, y: 20, opacity: 0, duration: 0.3, ease: "power2.in" });
        gsap.to(modal, {
            opacity: 0, duration: 0.3, delay: 0.1, onComplete: () => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
                videoContainer.innerHTML = ''; // Stop video playback
            }
        });
    }

    // Attach listeners strictly once, delegating to the global tracker to prevent SPA leaks
    if (!modal.dataset.eventsAttached) {
        if (closeBtn) {
            window.addTrackedEventListener(closeBtn, 'click', closeModal);
        }
        if (backdrop) {
            window.addTrackedEventListener(backdrop, 'click', closeModal);
        }
        if (backBtn) {
            window.addTrackedEventListener(backBtn, 'click', closeModal);
        }

        const escHandler = (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeModal();
            }
        };
        window.addTrackedEventListener(document, 'keydown', escHandler);

        modal.dataset.eventsAttached = 'true';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.initProjetos();
});
