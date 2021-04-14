//-------------------------Import des modules
import {Order} from './class.js';

document.getElementById('form').reset();

//-------------------------recupération du localStorage
let productAdded = JSON.parse(localStorage.getItem('product'));

let eltRow = document.querySelector("div.product-added");

let products = []; // Array pour la requête POST

//-------------------------Fonction de suppression du localStorage
const remove = (id) => {
    let product = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
    let index;
    for (let i = 0; i < product.length; i++) {
        if (product[i].id === id) {
        index = i;
        break;
        }
    }
    if (index === undefined) return 
    product.splice(index, 1);
    localStorage.setItem('product', JSON.stringify(product));
}

//-------------------------Fonction de calcul: montant du panier
const calc = () => {
    let sum = 0;
    for (let i = 0; i < productAdded.length; i++) {
        sum += productAdded[i].price * productAdded[i].quantity
        console.log(typeof(productAdded[i].price));
        console.log(productAdded[i].price);
    }
    return (sum / 100).toFixed(2);
}

if (productAdded === null || productAdded === 0) {
    eltRow.innerHTML = `<p class="panier-message">Votre panier est actuellement vide</p>`
} else {
        let newList = document.createElement('ul');
        newList.className = 'list-group mx-auto my-4';
        eltRow.appendChild(newList);

        let clearBtn = document.createElement('a');
        clearBtn.classList.add('text-decoration-none');
        clearBtn.href = 'panier.html'
        clearBtn.style.textAlign= 'center';
        clearBtn.textContent = "Vider le panier";
        newList.appendChild(clearBtn);

        clearBtn.addEventListener('click', (event) => {
            localStorage.clear();
        });

        let newDiv = document.createElement('div');
        newDiv.className = 'list-group-item total';
        newDiv.innerHTML = `<p class="amount">Montant total du panier: <strong>${calc()} €</strong></p>`;


        for (let i = 0; i < productAdded.length; i++) {

            products.push(productAdded[i].id); // Ajout des _id dans un array "products" (requête POST)

            let newDivInfo = document.createElement('div');
            newDivInfo.classList.add('list-group-div');
            let newDivAction = document.createElement('div');
            newDivAction.className = 'list-group-div justify-content-around';
            
            let eltList = document.createElement('li');
            eltList.classList.add('list-group-item');

            let eltTitle = document.createElement('p');
            eltTitle.classList.add('font-weight-bold');
            eltTitle.innerHTML = productAdded[i].name;

            let eltText = document.createElement('p');
            eltText.classList.add('font-weight-light');
            eltText.innerHTML = productAdded[i].varnish;

            let eltPriceText = document.createElement('p');
            eltPriceText.innerHTML = `${(productAdded[i].price /100).toFixed(2)} €`;
            
            let eltQuantity = document.createElement('p');
            eltQuantity.classList.add('font-weight-light');
            eltQuantity.innerHTML = `<strong>Quantité : </strong>${productAdded[i].quantity}`;

            let eltBtn = document.createElement('a');
            eltBtn.classList.add('text-decoration-none');
            eltBtn.href = "panier.html";
            eltBtn.textContent = "supprimer";

            newList.appendChild(eltList);
            newDivInfo.appendChild(eltTitle);
            newDivInfo.appendChild(eltText);
            newDivInfo.appendChild(eltPriceText);
            newDivAction.appendChild(eltQuantity);
            newDivAction.appendChild(eltBtn);
            eltList.appendChild(newDivInfo);
            eltList.appendChild(newDivAction);
            newList.appendChild(newDiv);

            eltBtn.addEventListener('click', () => {
                remove(productAdded[i].id);
                console.log(localStorage.getItem('product'));
            });
        }
}

/**BACK END >>>> requete AJAX POST
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */

////class order

let inputName = document.getElementById('lastname')
let inputFirstName = document.getElementById('firstname')
let inputAddress = document.getElementById('address')
let inputCity = document.getElementById('city')
let inputEmail = document.getElementById('email')

const send = () => {
    let request = new XMLHttpRequest();
    request.onload = () => {
        if (request.readyState === request.DONE && request.status === 201) {
            let response = JSON.parse(request.responseText);
            localStorage.setItem('confirm', JSON.stringify(response));
            redirection();
        }
};
    request.open('POST', 'http://localhost:3000/api/furniture/order');
    request.setRequestHeader ('Content-Type', 'application/json');

    let newOrder = new Order(inputFirstName.value, inputName.value, inputAddress.value, inputCity.value, inputEmail.value);
    let data = {
        contact: newOrder,
        products: products
    };
    request.send(JSON.stringify(data));
}

const redirection = () => {
    document.location.href="confirmation.html"; 
}

let submit = document.querySelector('form > button');
submit.addEventListener('click', (event) => {
    event.preventDefault();
    if (products.length > 0) {
        send();
    } else {
        let eltContainer = document.querySelector('div.container')
        let eltMsg = document.createElement('div');
        eltMsg.className = 'alert alert-danger mx-auto'
        eltMsg.textContent = 'Ajouter un article pour valider une commande';
  
        eltContainer.appendChild(eltMsg);

        setTimeout(() => {
            eltContainer.removeChild(eltMsg);
        }, 2000);
    }
}); 
