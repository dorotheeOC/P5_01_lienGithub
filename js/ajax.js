//------------------------- Récupération de l'id dans l'url produit après "?""
function getIdFromUrl() { 
    const urlParams = window.location.search;
    const searchParams = new URLSearchParams(urlParams);
    
    return searchParams.get('id');
}

//-------------------------Récupération des données de l'API
function list()  {
    let productId = getIdFromUrl();
    const request = new XMLHttpRequest();
    let url = 'http://localhost:3000/api/furniture/';
    if (productId !== null){ //-------------------------Condition: Liste ou Produit isolé avec getIdFromUrl
        url += productId;
    }
    request.open('GET', url)
    request.onreadystatechange = function() {
        if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let data = JSON.parse(this.responseText);
            displayData(data); //-------------------------Traitement DOM
        } 
    }   
    request.send(); 
}
list();
//-------------------------Création d'une classe (POO)
class Product {
    constructor(id, varnish, name, price) {
      this.id = id;
      this.varnish = varnish;
      this.name = name;
      this.price = price;
    }
} 

function displayData(data) {
    let productId = getIdFromUrl();
    if (productId == null) {// Liste de produits
        for (let i = 0; i < data.length; i++) {

            let eltRow = document.querySelector("div.product-review");
    
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
            newPrice.innerHTML = `${data[i].price} €`;
    
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
    } else {// Produit ciblé
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
        
        for (let i =0; i < option.length; i++) { // Récupération des éléments de l'array 'varnish'
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
        })
//-------------------------Récupération du localStorage: condition update cart après chargement (opérateur ternaire ?? (!null || !undefined))

        let cart = JSON.parse(localStorage.getItem('product')) ?? [];

        const addProduct = () => {
            let productToAdd  = new Product(data._id, eltResult.textContent, data.name, data.price);// classe Product instanciée dans le localStorage
            cart.push(productToAdd); 
            cartJson = JSON.stringify(cart)
            localStorage.setItem('product', cartJson);
        }
        formButton.addEventListener('click', (event) => {
            event.preventDefault();
            addProduct(); 
        });
    
    }

}
