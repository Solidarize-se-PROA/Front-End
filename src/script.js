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

// Função para abrir e fechar o menu lateral
const sideMenu = document.getElementById("sideMenu")
const openBtn = document.getElementById("openMenuBtn");
const closeBtn = document.getElementById("closeMenuBtn");
const overlay = document.getElementById("overlay");

let isMenuVisible = false;

function openMenu() {
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
    }, 300);
};

openBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu)
