// --- LÓGICA UNIFICADA ---
// Seleciona os elementos do DOM
const header = document.querySelector(".mobile-nav-toggle");
const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const mobileNavPanel = document.querySelector(".mobile-nav-panel");
const mobileNavLinks = document.querySelectorAll(".mobile-nav a");
const body = document.body;
const elementsToReveal = document.querySelectorAll(".scroll-reveal");

// 1. LÓGICA DO MENU MÓVEL (HAMBURGER COM FUNÇÃO DE ABRIR E FECHAR)
if (mobileNavToggle) {
  // Esta função ÚNICA abre E fecha o menu
  const toggleNav = () => {
    // Alterna a classe que mostra/esconde o painel do menu
    mobileNavPanel.classList.toggle("is-open");
    // Alterna a classe no <body> que ativa a animação do "X"
    body.classList.toggle("mobile-nav-is-open");
  };

  // O mesmo botão hamburger agora serve para as duas ações (abrir e fechar)
  mobileNavToggle.addEventListener("click", toggleNav);

  // Clicar em um link do menu também fecha o painel
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileNavPanel.classList.remove("is-open");
      body.classList.remove("mobile-nav-is-open");
    });
  });
}

// 2. LÓGICA DO CABEÇALHO FIXO (PARA DESKTOP)
window.addEventListener("scroll", () => {
  if (window.innerWidth > 1024) {
    if (window.scrollY > 150) {
      if (!header.classList.contains("fixed")) {
        header.classList.add("fixed", "show");
      }
    } else {
      if (header.classList.contains("fixed")) {
        header.classList.remove("fixed");
      }
    }
  } else {
    header.classList.remove("fixed", "show");
  }
});

// 3. LÓGICA DA ANIMAÇÃO DE SCROLL (SCROLL-REVEAL)
const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.9;
  elementsToReveal.forEach((el) => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add("visible");
    }
  });
};
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// 4. LÓGICA PARA VOLTAR AO TOPO AO ATUALIZAR
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});
