// Cole este código no seu arquivo serviços.js

document.addEventListener("DOMContentLoaded", () => {
  // Seleciona todos os cards dentro da seção de serviços
  const serviceCards = document.querySelectorAll(
    ".services-section .service-card"
  );

  // Função para 'desvirar' todos os cards
  const resetFlippedCards = () => {
    serviceCards.forEach((card) => {
      card.classList.remove("is-flipped");
    });
  };

  serviceCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      // Impede que o clique no card se propague para o 'document'
      // e feche o card imediatamente.
      event.stopPropagation();

      // Verifica se este card JÁ ESTÁ virado
      const isAlreadyFlipped = card.classList.contains("is-flipped");

      // 1. Primeiro, desvira todos os cards
      resetFlippedCards();

      // 2. Se este card NÃO estava virado, vira ele agora
      if (!isAlreadyFlipped) {
        card.classList.add("is-flipped");
      }
      // Se ele já estava virado, o resetFlippedCards() já cuidou de desvirá-lo.
    });
  });

  // Adiciona um listener no documento inteiro
  // Se o usuário clicar em qualquer lugar FORA de um card, desvira todos.
  document.addEventListener("click", () => {
    resetFlippedCards();
  });
});