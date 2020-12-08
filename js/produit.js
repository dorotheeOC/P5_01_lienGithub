import {getIdFromUrl, list, erreur} from './ajax.js';
import {Product} from './class.js';
//-------------------------Import des modules
let productId = getIdFromUrl();
erreur;
list;
Product;
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
    newPrice.innerHTML = `${data.price} €`;          
                  
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
    newFormGroup.appendChild(newSelectInput);
    newForm.appendChild(newFormGroup);
    newForm.appendChild(formButton);
    newForm.appendChild(eltResult);
    newContainer.appendChild(newForm);
    newEltCard.appendChild(newContainer);
    newDiv.appendChild(newEltCard);
    eltRow.appendChild(newDiv);

    newSelectInput.addEventListener('change', (event) => {
        let selected = event.target.value;
        eltResult.innerHTML = selected;
    });
//-------------------------Récupération du localStorage: condition update cart après chargement (opérateur ternaire ?? (!null || !undefined))

    let cart = JSON.parse(localStorage.getItem('product')) || [];

    formButton.addEventListener('click', (event) => {
        event.preventDefault();
        addProduct(data, eltResult, cart); 
    });
}

const addProduct = (data, eltResult, cart) => {
    let productToAdd  = new Product(data._id, eltResult.textContent, data.name, data.price);// classe Product instanciée dans le localStorage
    cart.push(productToAdd); 
    let cartJson = JSON.stringify(cart)
    localStorage.setItem('product', cartJson);
}

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
    erreur(productId);
  }).then(()=> {
    console.log('fin AJAX')
  })