document.getElementById('form').reset();
// document.onload = localStorage.removeItem('confirm');
//-------------------------recupération du localStorage
let productAdded = JSON.parse(localStorage.getItem('product'));

let eltRow = document.querySelector("div.product-added");

let products = []; // Array pour la requête POST

if (productAdded == null || productAdded == 0) {
    eltRow.innerHTML = `<p class="panier-message">Votre panier est actuellement vide</p>`
} else {
        //-------------------------Fonction de suppression du localStorage
        function remove(id) {
            let product = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
            let index;
            for (let i = 0; i < product.length; i++) {
                if (product[i].id === id) {
                index=i;
                break;
                }
            }
            if (index === undefined) return 
            product.splice(index, 1);
            localStorage.setItem('product', JSON.stringify(product));
        }
        //-------------------------Fonction de calcul: montant du panier
        function calc() {
            let sum = 0;
            for (let i = 0; i < productAdded.length; i++) {
                sum += productAdded[i].price;
            }
            return sum;
        }

        let newList = document.createElement('ul');
        newList.classList.add('list-group');
        eltRow.appendChild(newList);

        let clearBtn = document.createElement('a');
        clearBtn.classList.add('text-decoration-none');
        clearBtn.href = 'panier.html'
        clearBtn.style.textAlign= 'center';
        clearBtn.textContent = "Vider le panier";
        newList.appendChild(clearBtn);

        clearBtn.addEventListener('click', (event) => {
            localStorage.clear();
        })

        let newDiv = document.createElement('div');
        newDiv.classList.add('list-group-item');
        newDiv.innerHTML = `<p class="amount">Montant total du panier: <strong>${calc()} €</strong></p>
                            <p class="text-muted">${productAdded.length} produits</p>`;


        for (let i = 0; i < productAdded.length; i++) {

            products.push(productAdded[i].id); // Ajout des _id dans un array "products"
            
            let eltList = document.createElement('li');
            eltList.classList.add('list-group-item');

            let eltTitle = document.createElement('p');
            eltTitle.classList.add('font-weight-bold')
            eltTitle.innerHTML = productAdded[i].name;

            let eltText = document.createElement('p');
            eltText.classList.add('font-weight-light')
            eltText.innerHTML = productAdded[i].varnish;

            let eltPriceText = document.createElement('p');
            eltPriceText.innerHTML = `${productAdded[i].price} €`;

            let eltBtn = document.createElement('a');
            eltBtn.classList.add('text-decoration-none');
            eltBtn.href = "panier.html";
            eltBtn.textContent = "supprimer";

            newList.appendChild(eltList);
            eltList.appendChild(eltTitle);
            eltList.appendChild(eltText);
            eltList.appendChild(eltPriceText);
            eltList.appendChild(eltBtn);
            newList.appendChild(newDiv);

            eltBtn.addEventListener('click', () => {
                remove(productAdded[i].id);
            })
        }
}
console.log(products)

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
class Order {
        constructor(firstName, lastName, address, city, email) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.address = address;
            this.city = city;
            this.email = email;
        }
}

let inputName = document.getElementById('lastname')
let inputFirstName = document.getElementById('firstname')
let inputAddress = document.getElementById('address')
let inputCity = document.getElementById('city')
let inputEmail = document.getElementById('email')

const send = () => {
let request = new XMLHttpRequest();
request.onload = function() {
if(request.readyState === request.DONE && request.status === 201) {
let response = JSON.parse(request.responseText);
console.log(response)
localStorage.setItem('confirm', JSON.stringify(response));
}
};
request.open('POST', 'http://localhost:3000/api/furniture/order');
request.setRequestHeader ('Content-Type', 'application/json');

newOrder = new Order(inputFirstName.value, inputName.value, inputAddress.value, inputCity.value, inputEmail.value);
let data = {
    contact: newOrder,
    products: products
};
request.send(JSON.stringify(data));
}
const Redirection = () => {
    document.location.href="confirmation.html"; 
  }
let submit = document.querySelector('form > button');
submit.addEventListener('click', (event) => {
    event.preventDefault();
    send();
}); 
console.log(localStorage.getItem('confirm'));