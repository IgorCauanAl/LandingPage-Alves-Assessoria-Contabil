document.addEventListener("DOMContentLoaded", () => {
  // 1. Elementos principais do DOM
  const gallery = document.querySelector(".professionals-gallery");
  const detailContainer = document.querySelector(
    ".professional-detail-container"
  );
  const detailContent = document.querySelector(".detail-content");
  const backButton = document.querySelector(".btn-back");
  const professionalCards = document.querySelectorAll(".professional-card");

  // Duração da animação em milissegundos (deve coincidir com o CSS: 0.5s = 500ms)
  const ANIMATION_DURATION = 500;

  // --- FUNÇÕES DE ANIMAÇÃO ---

  // Função para mostrar a Galeria (Voltar)
  function showGallery() {
    // 1. Inicia a animação de SAÍDA dos detalhes (usando a classe de saída)
    detailContainer.classList.add("exit-fwd-center");
    detailContainer.classList.remove("enter-fwd-center"); // Remove a classe de entrada

    // 2. Torna a galeria visível e inicia a animação de ENTRADA
    gallery.style.display = "flex";
    gallery.classList.add("enter-fwd-center");
    gallery.classList.remove("exit-fwd-center"); // (Assumindo que você criou uma animação de entrada para a galeria)

    // Oculta/mostra o título
    const titleGallery = document.querySelector("#title_team-professionals");
    if (titleGallery) {
      titleGallery.style.display = "block";
    }

    // 3. Oculta o container de detalhes APÓS o término da animação de SAÍDA
    setTimeout(() => {
      detailContainer.style.display = "none";
      // Limpeza: Garante que a classe de saída seja removida após o uso
      detailContainer.classList.remove("exit-fwd-center");
    }, ANIMATION_DURATION);
  }

  // Função para mostrar os Detalhes do Profissional
  function showDetails(professionalKey) {
    // ... (Mapeamento de IDs, clonagem de conteúdo - seu código aqui está perfeito) ...
    let descriptionId;
    if (professionalKey === "fabio") {
      descriptionId = "description-fabio";
    } else if (professionalKey === "manoel") {
      descriptionId = "description-professional2";
    } else if (professionalKey === "miria") {
      descriptionId = "description-professional3";
    } else if (professionalKey === "claudia") {
      descriptionId = "description-professional4";
    } else {
      descriptionId = `description-${professionalKey}`;
    }

    const descriptionElement = document.getElementById(descriptionId);
    if (!descriptionElement) {
      console.error(`Descrição para '${descriptionId}' não encontrada.`);
      return;
    }

    const titleGallery = document.querySelector("#title_team-professionals");
    if (titleGallery) {
      titleGallery.style.display = "none";
    }

    // 1. Inicia a animação de SAÍDA da galeria (se houver)
    gallery.classList.add("exit-fwd-center"); // Assumindo uma classe de saída
    gallery.classList.remove("enter-fwd-center");

    // 2. Limpa o conteúdo e injeta o bloco HTML CLONADO
    detailContent.innerHTML = "";
    detailContent.appendChild(descriptionElement.cloneNode(true));

    // 3. Oculta a galeria e exibe os detalhes APÓS a animação de SAÍDA
    setTimeout(() => {
      gallery.style.display = "none";
      gallery.classList.remove("exit-fwd-center"); // Limpa a classe de saída da galeria

      // Prepara a entrada dos detalhes
      detailContainer.style.display = "flex";

      // Inicia a animação de ENTRADA dos detalhes
      detailContainer.classList.add("enter-fwd-center");
      detailContainer.classList.remove("exit-fwd-center");
    }, ANIMATION_DURATION);
  }

  // --- EVENT LISTENERS ---

  // Configura o clique em cada card
  professionalCards.forEach((card) => {
    card.addEventListener("click", () => {
      const professionalKey = card.getAttribute("data-professional");
      showDetails(professionalKey);
    });
  });

  // Configura o clique no botão "Voltar"
  backButton.addEventListener("click", showGallery);

  // Inicialização: Garante que a galeria entre suavemente ao carregar
  gallery.style.display = "flex";
  gallery.classList.add("enter-fwd-center");
});
