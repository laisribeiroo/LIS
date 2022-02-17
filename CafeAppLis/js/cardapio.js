//Inicia esta parte com a importação do JSON que é do arquivo dataset.js
//Em seguida é realizado a importação do arquivos foods.js juntamente a ele as funções load, readAll e create

import itens from './model/dataset.js';
import foodsModel from './model/foods.js';

foodsModel.load(itens); 
//Com o load ponhe para um parâmentro denominado itens
let foods = foodsModel.readAll();
//aqui foi gerada uma váriavel foods.

function initFoodsCard () {
 //nessa etapa aqui a função vai utilizar o JSON, e assim, coloca-lo em cardapio.html
  
  for (let item of foods) {
    //Aqui o for vai se utilizado para ver o comprimento, e assim, para todo item do cardápio, esta função gera dinanicamente os elementos HTML

    const view = createFoodCardItem(item);
  
    //let itensCardapio = document.querySelector('.itens-cardapio');
    
    let itensCardapio = document.getElementById("itens-cardapio");
    //Com o id da div do cardapio.html ele gerou uma variavel
    itensCardapio.insertAdjacentHTML('beforeend', view);
    //Com isso, a div que aconte no primeiro parâmetro é o que vai ser firmado, gerando o valor do view nela.
  }
}

function createFoodCardItem (item) {  // Essa função vai pegar o valor dos elementos do JSON que foram passado nas key pelo for e sera atribuído cada um em seu lugar.

    const view = `<div class="col-3 card my-1 mx-1 py-1">
                    <img src="${item.imagem}" class="card-img-top" alt="...">
  
                    <div class="card-body">
                      <h5 class="card-title">${item.nome}</h5>
                      <p class="card-text">${item.descricao}</p>
                      <a href="#" class="btn btn-primary">Comprar</a>
                    </div>
                  </div>`;

    return view;  // Aqui retorna para a estrutura HTML
}


// Captar o evento de submissão do formulário e adicionar o item no cartão (card).
// const foodForm = document.querySelector('#foodForm');

const foodForm = document.getElementById("foodForm"); 
//Pega o id do formulario do arquivo cardapio.html

foodForm.onsubmit = function (event) {
  // Prevenção para que o modal não fique abrindo e fechando em loop.
  
  event.preventDefault();

  let newFood = Object.fromEntries(new FormData(foodForm));
  //Aqui tem a criação de um novo formulário.
  foodsModel.create(newFood);
  //E nesta parte é onde adiciona ao cartão

  const foodCard = createFoodCardItem(newFood); 
  //Mais uma vez irá passar a função com o newFood
  let itensCardapio = document.getElementById("itens-cardapio"); 
  //Com isso, apanhou outra vez id da div do arquivo cardapio.html
  itensCardapio.insertAdjacentHTML('beforeend', foodCard); 
  //E agora incluiu a div na posição que precede ao fim do foodcard 
}

initFoodsCard();  //inicialização da função initFoodsCard
