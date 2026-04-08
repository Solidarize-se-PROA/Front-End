// Função para ocultar a header ao navegar pela página
let lastScrollY = 0;
const header = document.querySelector(".header");

function handleScroll () {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 200) {
        header.classList.add("hidden");
    } else {
        header.classList.remove("hidden");
    }

    lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
}

window.addEventListener("scroll", handleScroll);

// Função para abrir e fechar modal do usuário
const modal = document.querySelector(".userModal");
const userBtns = document.querySelectorAll(".userBtn");

let isModalOpen = false;

function openModal() {
    modal.classList.add("activeModal");

    isModalOpen = true;
}

function closeModal() {
    modal.classList.remove("activeModal");
    isModalOpen = false;
}

userBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();

        if (isModalOpen) {
            closeModal();
        } else {
            openModal(btn);
        }
    })
})

document.addEventListener("click", (e) => {
    if (!modal.contains(e.target)) {
        closeModal();
    }
});

window.addEventListener("scroll", () => {
    if (isModalOpen) closeModal();
})

// Função para abrir e fechar o menu lateral | Travar o scroll da página ao abrir o menu lateral
const sideMenu = document.getElementById("sideMenu")
const openBtn = document.getElementById("openMenuBtn");
const closeBtn = document.getElementById("closeMenuBtn");
const overlay = document.getElementById("overlay");
const body = document.body;

let isMenuVisible = false;
let scrollPosition = 0;

function openMenu() {
    scrollPosition = window.scrollY;

    body.style.top = `-${scrollPosition}px`;
    body.classList.add("noscroll");

    sideMenu.style.display = "flex";
    sideMenu.classList.remove("close");
    sideMenu.classList.add("open");

    isMenuVisible = true;
};

function closeMenu() {
    sideMenu.classList.remove("open");
    sideMenu.classList.add("close");

    isMenuVisible = false;

    setTimeout(() => {
        sideMenu.style.display = "none";

        body.classList.remove("noscroll");

        const scrollY = -parseInt(body.style.top || "0");
        body.style.top = "";

        window.scrollTo(0, scrollY);
    }, 300);
};

openBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);


// Função para o Carrossel
const track = document.querySelector(".carouselTrack");
const slides = document.querySelectorAll(".carouselBox");
const nextBtn = document.querySelector(".arrow.right");
const prevBtn = document.querySelector(".arrow.left");
const indicatorsContainer = document.querySelector(".indicators");
const carouselWrapper = document.querySelector(".carouselWrapper");

let currentIndex = 0;
let autoSlideInterval;
const AUTO_SLIDE_TIME = 10000;

// Criar as bolinhas indicativas do slide
slides.forEach((_, index) => {
    const dot = document.createElement("span");

    dot.setAttribute("aria-label", `Ir para o slide ${index + 1}`);
    dot.setAttribute("role", "button");
    dot.setAttribute("tabindex", "0")

    dot.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel();
        resetAutoSlide();
    });

    indicatorsContainer.appendChild(dot);
});

const indicators = document.querySelectorAll(".indicators span");

function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    indicators.forEach(dot => dot.classList.remove("active"));
    indicators[currentIndex].classList.add("active");
};

// Ir ao slide posterior
function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
};

// Ir ao slide anterior
function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
};

// Iniciar autoplay do carrossel
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, AUTO_SLIDE_TIME);
};

// Resetar autoplay do carrossel
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Botão para avançar
nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
});

// Botão para voltar
prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
});

// Pausar carrossel ao passar o mouse sobre o elemento
carouselWrapper.addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval);
});

// Retomar carrossel ao retirar o mouse sobre o elemento
carouselWrapper.addEventListener("mouseleave", () => {
    startAutoSlide();
});

// Inicializar
updateCarousel();
startAutoSlide();


// Funcionalidade para manipulação das estrelas dos usuários
const starContainers = document.querySelectorAll(".stars");

starContainers.forEach(container => {
    const rating = Number(container.dataset.rating);

    for(let i = 1; i <= 5; i++) {
        const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        star.setAttribute("viewBox", "0 0 24 24");
        star.classList.add("star");

        if (i <= rating) {
            star.classList.add("activeStar");
        }

        star.innerHTML = `
            <path d="M12 2l3.09 6.26L22 9.27l-5
            4.87L18.18 22 12 18.27 5.82 22
            7 14.14 2 9.27l6.91-1.01L12 2z"/>
        `;

        container.appendChild(star);
    }
});