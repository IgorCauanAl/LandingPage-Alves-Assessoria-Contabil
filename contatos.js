document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Defina aqui a lista de todas as imagens que você quer usar
    const imagensDoCarrossel = [
      "/Fotos/Contatos/contatos2.webp",     
      "/Fotos/Contatos/contatos1.webp"      
      
      // Adicione quantas imagens quiser
    ];

    // 2. Define o tempo de espera em milissegundos (5000ms = 5 segundos)
    const tempoDeIntervalo = 5000;

    // 3. Seleciona o elemento da imagem pelo 'id' que criamos
    const imagemElement = document.getElementById("contact-carousel-image");

    // (Se a imagem não for encontrada, o script para)
    if (!imagemElement) {
      console.error("Elemento da imagem do carrossel não encontrado.");
      return;
    }

    let indiceAtual = 0;

    // Função que troca a imagem
    function trocarImagem() {
      // Faz o fade-out da imagem atual
      imagemElement.style.opacity = 0;

      // Espera o fade-out terminar (500ms, mesmo tempo da transição do CSS)
      setTimeout(() => {
        // Avança para o próximo índice da lista
        indiceAtual = (indiceAtual + 1) % imagensDoCarrossel.length;
        
        // Atualiza o 'src' (a fonte) da imagem
        imagemElement.src = imagensDoCarrossel[indiceAtual];
        
        // Faz o fade-in da nova imagem
        imagemElement.style.opacity = 1;
      }, 500); // Este tempo (500ms) DEVE ser igual ao da transição no CSS
    }

    // Inicia o carrossel, chamando a função 'trocarImagem'
    // a cada 'tempoDeIntervalo' (5 segundos)
    setInterval(trocarImagem, tempoDeIntervalo);
  });