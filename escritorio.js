// ===============================================
    // == 5. LÓGICA DO CARROSSEL "O ESCRITÓRIO"    ==
    // ===============================================
    const officeCarousel = document.querySelector('#escritorio .office-images');

    // Só roda o código se o carrossel existir na página
    if (officeCarousel) {
      const prevButton = officeCarousel.querySelector('#prev-slide');
      const nextButton = officeCarousel.querySelector('#next-slide');

      // Seleciona APENAS as imagens que são filhas diretas do container
      // Isso evita selecionar as imagens das setas
      const slides = officeCarousel.querySelectorAll(':scope > img');

      let currentSlideIndex = 0;

      // --- Funções de clique (para poder adicionar/remover) ---
      
      // MODIFICADA: para pular 2 imagens de cada vez (avança um par)
      const goToNextSlide = () => {
        currentSlideIndex += 2;
        
        // Se o índice passar do total, volta ao início (0)
        if (currentSlideIndex >= slides.length) {
          currentSlideIndex = 0; // Volta para o primeiro par
        }
        showSlideDesktop(currentSlideIndex);
      };

      // MODIFICADA: para pular 2 imagens de cada vez (retrocede um par)
      const goToPrevSlide = () => {
        currentSlideIndex -= 2;

        // Se o índice for negativo, vai para o último par
        if (currentSlideIndex < 0) {
          // Calcula o índice inicial do último par
          // Ex: 4 slides (0,1,2,3). Pares (0,1), (2,3). Último par começa em 2.
          // Ex: 5 slides (0,1,2,3,4). Pares (0,1), (2,3), (4). Último "par" começa em 4.
          currentSlideIndex = (Math.ceil(slides.length / 2) - 1) * 2;
        }
        showSlideDesktop(currentSlideIndex);
      };

      // --- Função para MOSTRAR um slide (modo Desktop) ---
      
      // MODIFICADA: para mostrar duas imagens (o par) e alinhar ao CSS de grid
      function showSlideDesktop(index) {
        // Garante que estamos no início de um par (ex: se o índice for 3, trata como 2)
        const startIndex = Math.floor(index / 2) * 2;

        slides.forEach((slide, i) => {
          // Esconde todas as imagens e mostra apenas as do par (startIndex e startIndex + 1)
          // O seu CSS (grid-template-columns: 1fr 1fr) vai cuidar de posicioná-las.
          slide.style.display = (i === startIndex || i === (startIndex + 1)) ? 'block' : 'none';
        });
      }

      // --- Função para RESETAR os slides (modo Mobile) ---
      function resetSlidesMobile() {
        slides.forEach(slide => {
          // Remove o estilo 'display' inline para que o CSS (flex) assuma
          slide.style.display = '';
        });
      }

      // --- LÓGICA PRINCIPAL ---
      // Decide qual modo (Desktop/Click ou Mobile/Swipe) deve estar ativo
      function setupCarouselMode() {
        // O breakpoint do seu CSS é 64em = 1024px
        const isDesktop = window.innerWidth > 1024;

        if (isDesktop) {
          // ----- MODO DESKTOP -----
          // Ativa as setas e o sistema de mostrar/esconder

          // Mostra o slide correto (o par correto)
          showSlideDesktop(currentSlideIndex);

          // Adiciona os listeners (removemos antes para evitar duplicatas)
          nextButton.removeEventListener('click', goToNextSlide);
          prevButton.removeEventListener('click', goToPrevSlide);
          nextButton.addEventListener('click', goToNextSlide);
          prevButton.addEventListener('click', goToPrevSlide);

        } else {
          // ----- MODO MOBILE -----
          // Desativa as setas e reseta os slides para o CSS de swipe

          // Reseta os estilos para o CSS (display: flex) funcionar
          resetSlidesMobile();

          // Remove os listeners para não conflitarem
          nextButton.removeEventListener('click', goToNextSlide);
          prevButton.removeEventListener('click', goToPrevSlide);
        }
      }

      // Roda a lógica quando a página carrega
      setupCarouselMode();

      // Roda a lógica toda vez que a tela é redimensionada
      window.addEventListener('resize', setupCarouselMode);
    }