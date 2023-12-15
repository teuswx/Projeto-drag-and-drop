
const dragitems = document.querySelectorAll('.drag') // Pegando todos elementos arrastaveis com a class= "drag"
const dropBoxes = document.querySelectorAll('.drop_item') // Pegando todos elementos arrastaveis com a class= "drop_item"

//drag events
//(escutador de eventos)
dragitems.forEach((item) => {
    item.addEventListener("dragstart", dragStart); // Acionado quando o usuário começa a arrastar um elemento válido ou seleção de texto
    item.addEventListener("dragend", dragEnd); // Acionado quando uma operação de arrastar está terminando (por eexmplo, ao soltar o botão do mouse ou pressionar a tecla esc).
})

//drop events
//(escutador de eventos)
dropBoxes.forEach(box => {
    box.addEventListener('dragover', dragOver)//quando um elemento esta por cima de um elemento dropavel, ele ativa a função drag over
    box.addEventListener('drop', dropEvent) // quando soltamos um elemento chamamos a função drop event 
    box.addEventListener('dragleave', dragLeave)// momento em que deixar o campo dopravel
})

function dragStart(e) {
    originalDraggedElement = this.cloneNode(true); // Clonar o elemento para preservar o estado original
    e.dataTransfer.setData('text/plain', e.target.innerText)// enviando o texto que esta dentro do elementento; 'target' elemento que estamos arrastando,   'innerText' texto que está dentro do elemento
    e.target.innerText = ''; //
    
    setTimeout(() => {
        this.className = 'invisible'; // vai trocar a classe do elemento de drag para invisible para aplicar o estilo css
    }, 0) //
   
}

function dragOver(e) {
    e.preventDefault() // previnindo o comportamento normal do evento, permitindo que ele seja dropavel

    this.className += ' enter' //adiciona estilo css ao elemento

}   
function dragEnd(e) {
    this.className = 'drag_item'; // Retorna a classe do elemento arrastável ao seu estado original
    this.innerText = e.dataTransfer.getData('text/plain'); // Restaura o texto original

    // Verifica se o elemento foi solto em uma área válida
    const dropAreas = document.querySelectorAll('.drop_item');
    let droppedOnValidArea = false;

    for (const area of dropAreas) {
        const rect = area.getBoundingClientRect();
        if (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
        ) {
            droppedOnValidArea = true;
            break;
        }
    }


    // Se não foi solto em uma área válida, restaure o estado original
    console.log(!droppedOnValidArea)
    if (!droppedOnValidArea) {
        this.parentNode.replaceChild(originalDraggedElement, this);
    }
}



function dropEvent(e) {
    e.preventDefault(); // Prevenir o comportamento normal do evento, permitindo que ele seja dropável

    if (this.querySelector('.drag')) { 
        
        this.removeChild(this.querySelector('.drag')); // remove o elemento filho se ja tiver um 
    } 

    this.className = 'drop_item'; // Remover o estilo 'enter' quando o elemento não está mais sobre o campo dropável
    const el = document.createElement('p'); // Criar um elemento <p>
    el.className = "drag";
    el.innerText = e.dataTransfer.getData('text'); // Pegar o texto do elemento arrastável
    this.appendChild(el); // Adicionar o novo elemento <p> ao elemento .drop_item
}

function dragLeave(e) {
    e.preventDefault(); // previnindo o comportamento normal do eventoW
    this.className ='drop_item';// retirando o esilo  'enter' quando o elemento não esta por cima do campo dropavel
    
}

//-----------------------------------------------------------------------------------------------------------------------------------
// Vetores dos indicies das cartas
let cards1 = [1, 2, 3, 4, 5, 56];
let cards2 = [-1, 43, 5666, 78, 89, 90];

// Função para gerar um número aleatório a partir do vetor e removê-lo
function gerarEremoverNumeroAleatorio(cards) {
    if (cards.length == 0) {
        alert("Não há mais cards disponíveis");
        return;
    }

    // Gerando um índice aleatório baseado no tamanho do vetor
    const indiceAleatorio = Math.floor(Math.random() * cards.length);

    // Obtendo o número correspondente ao índice gerado
    const numeroAleatorio = cards.splice(indiceAleatorio, 1)[0];

    return numeroAleatorio;
}

//ouvinte de evento para o baralho "deck1"
const deck1Button = document.querySelector(".deck1");
deck1Button.addEventListener("click", function () {
    //Gera um numero aleatorio para o deck1 "o que seria o id de uma carta aleatória"
    const numeroAleatorio = gerarEremoverNumeroAleatorio(cards1);
    if (numeroAleatorio !== undefined) {
        alert(`Id aleatório do Deck 1: ${numeroAleatorio}`);
    }
});

//ouvinte de evento para o baralho "deck2"
const deck2Button = document.querySelector(".deck2");
deck2Button.addEventListener("click", function () {
     //Gera um numero aleatorio para o deck2 "o que seria o id de uma carta aleatória"
    const numeroAleatorio = gerarEremoverNumeroAleatorio(cards2);
    if (numeroAleatorio !== undefined) {
        alert(`Id aleatório do Deck 2: ${numeroAleatorio}`);
    }
});





