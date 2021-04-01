//-------------------------Import des modules
import {getIdFromUrl, list, catchError} from './ajax.js';
import {Product} from './class.js';

let productId = getIdFromUrl();

//-------------------------Définition d'url GET de la requête AJAX
const url = !productId ? 'http://localhost:3000/api/furniture/' : 'http://localhost:3000/api/furniture/' + productId;

const displayData = (data) => {
    let eltRow = document.querySelector("div.product");

    let newDiv = document.createElement('div');
    newDiv.classList.add('col-12');

    let newEltCard = document.createElement('div');
    newEltCard.classList.add('card');

    let newContainerImg = document.createElement('div');
    newContainerImg.classList.add('col-12');

    let newCardImg = document.createElement('img');
    newCardImg.classList.add('product-img')
    newCardImg.src = data.imageUrl;

    let newContainer = document.createElement('div');
    newContainer.classList.add('card-desc')

    let newCardTitle = document.createElement('h5');
    newCardTitle.classList.add('card-title')
    newCardTitle.innerHTML = `${data.name}`;

    let  newParagraph = document.createElement('p');
    newParagraph.classList.add('card-text');
    newParagraph.innerHTML = data.description;

    let  newPrice = document.createElement('p');
    newPrice.classList.add('price');
    newPrice.innerHTML = `${(data.price /100).toFixed(2)} €`;          
                  
    let newForm = document.createElement('form');
    newForm.action = "panier.html";
    newForm.method = "post";

    let newFormGroup = document.createElement('div');
    newFormGroup.classList.add('form-group');

    let newLabel = document.createElement('label');
    newLabel.htmlFor = "material";
    newLabel.innerHTML = "Choose your material"

    let option = data.varnish;

    let newSelectInput = document.createElement('select');
    newSelectInput.id = "material";
    newSelectInput.classList.add('form-control');
      
    for (let i = 0; i < option.length; i++) { // Récupération des éléments de l'array 'varnish'
        let eltOption = document.createElement('option');
        eltOption.innerHTML = option[i];
        newSelectInput.appendChild(eltOption);
    }
                  
    let formButton = document.createElement('button')
    formButton.type = "submit";
    formButton.innerHTML = "Ajouter au panier";

    let eltResult = document.createElement('div');
    eltResult.classList.add('result');
    eltResult.textContent = option[0];
    eltResult.style.color = "transparent";

    newContainerImg.appendChild(newCardImg);
    newEltCard.appendChild(newContainerImg);
    newContainer.appendChild(newCardTitle);
    newContainer.appendChild(newParagraph);
    newContainer.appendChild(newPrice);
    newFormGroup.appendChild(newLabel);
    newContainer.appendChild(eltResult);
    newFormGroup.appendChild(newSelectInput);
    newForm.appendChild(newFormGroup);
    newForm.appendChild(formButton);
    newContainer.appendChild(newForm);
    
    newEltCard.appendChild(newContainer);
    newDiv.appendChild(newEltCard);
    eltRow.appendChild(newDiv);

    newSelectInput.addEventListener('change', (event) => {
        let selected = event.target.value;
        eltResult.innerHTML = selected;
    });
//-------------------------Récupération du localStorage: condition update cart après chargement

    let cart = JSON.parse(localStorage.getItem('product')) || [];
    formButton.addEventListener('click', (event) => {

        event.preventDefault();
        addProduct(cart, data, eltResult);

        let eltMsg = document.createElement('div');
        eltMsg.classList.add('alert');
        eltMsg.classList.add('alert-success');
        eltMsg.classList.add('mx-auto');
        eltMsg.textContent = 'Le produit a bien été ajouté';
  
        newEltCard.appendChild(eltMsg);

        setTimeout(() => {
          newEltCard.removeChild(eltMsg);
        }, 2000);
    });
}

const addProduct = (cart, data, eltResult) => {
  let productToAdd  = new Product(data._id, eltResult.textContent, data.name, data.price, data.imageUrl, 1);
    for (let i = 0; i < cart.length; i++) {
      let index;
      if( cart[i].id === data._id && cart[i].varnish === eltResult.textContent) {
        index = i;
        console.log(cart[i].quantity)
        let newQuantity = cart[i].quantity += 1;
        cart.splice(index , 1);
        productToAdd.quantity = newQuantity;
      } 
    } 
    cart.push(productToAdd)
    console.log(productToAdd)
    let cartJson = JSON.stringify(cart)
    localStorage.setItem('product', cartJson);
    console.log(cart);
}

console.log(localStorage.getItem('product'));

//-------------------------Appel de la promesse AJAX dans une fonction
let getData = () => {
    return list(url).then((response) => {
      let data = JSON.parse(response);
      console.log(data)
      displayData(data);
    })
}
getData().then((data) => {
}).catch((e) => {
    catchError(productId);
  }).then(()=> {
    console.log('fin AJAX')
  })