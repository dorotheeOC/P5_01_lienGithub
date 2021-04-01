//-------------------------Import des modules
import {getIdFromUrl, list, catchError} from './ajax.js';

let productId = getIdFromUrl();
console.log(productId);

//-------------------------Définition d'url GET de la requête AJAX
const url = !productId ? 'http://localhost:3000/api/furniture/' : 'http://localhost:3000/api/furniture/' + productId;

const displayData = (data) => {

    for (let i = 0; i < data.length; i++) {
 
        let eltRow = document.querySelector("div.product");
   
        let newDiv = document.createElement('div');
        newDiv.classList.add('col-lg-4');
           
        let newEltCard = document.createElement('div');
        newEltCard.classList.add('card');
   
        let newCardImg = document.createElement('span');
        newCardImg.classList.add('card-title')
        newCardImg.style.background = `url('${data[i].imageUrl}') no-repeat`;
        newCardImg.style.height = "14rem";
        newCardImg.style.backgroundSize = "cover";
   
        let newContainer = document.createElement('div');
        newContainer.classList.add('card-desc')
   
        let newCardTitle = document.createElement('h5');
        newCardTitle.classList.add('card-title')
        newCardTitle.innerHTML = `${data[i].name}`;
   
        let  newParagraph = document.createElement('p');
        newParagraph.classList.add('card-text');
        newParagraph.innerHTML = data[i].description;
   
        let  newPrice = document.createElement('p');
        newPrice.classList.add('price');
        newPrice.innerHTML = `${(data[i].price /100).toFixed(2)} €`;
   
        let  newBtn = document.createElement('div');
        newBtn.classList.add('text-center');
        newBtn.innerHTML = `<a class="btn btn-primary btn-sm" role="button" href="produit.html?id=${data[i]._id}">Fiche produit</a>`;                
   
        newEltCard.appendChild(newCardImg);
        newContainer.appendChild(newCardTitle);
        newContainer.appendChild(newParagraph);
        newContainer.appendChild(newPrice);
        newEltCard.appendChild(newContainer);
        newEltCard.appendChild(newBtn);
        newDiv.appendChild(newEltCard);
        eltRow.appendChild(newDiv);
    }
  
}
//-------------------------Appel de la promesse AJAX dans une fonction
let getData = () => {
  return list(url).then((response) => {
    let data = JSON.parse(response);
    console.log(data);
    displayData(data);
  })
}

getData().then((data) => {
}).catch((e) => {
  catchError(productId);
}).then(()=> {
  console.log('fin AJAX')
})
