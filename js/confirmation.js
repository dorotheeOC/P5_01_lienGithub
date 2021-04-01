//-------------------------Import des modules
import {Product} from './class.js';

//-------------------------recupération du localStorage
let postData = JSON.parse(localStorage.getItem('confirm'));
console.log(localStorage.getItem('confirm'));
let productAdded = JSON.parse(localStorage.getItem('product'));

//-------------------------Vérification du localStorage
const confirmValid = () => {
    if (postData !== null) {
            displayData();
        } else {
            let eltRow = document.querySelector("div.row-alert");

            let alertDiv = document.createElement('div');
            alertDiv.classList.add('alert');
            alertDiv.classList.add('alert-danger');
            alertDiv.role = 'alert';

            alertDiv.textContent = "Une erreur s'est produite lors de la validation de votre commande ";

            let redirectLink = document.createElement('a');
            redirectLink.classList.add('alert-link');
            redirectLink.href = 'panier.html';
            redirectLink.innerHTML = 'Revenir au panier';
  
            alertDiv.appendChild(redirectLink);
            eltRow.appendChild(alertDiv);
        }
}

//-------------------------recupération du panier array products
let review = []; 

//-------------------------DOM
const displayData = () => {
    let orderRow = document.querySelector('div.order-id');
    let userRow = document.querySelector('div.user-info');
    let productRow = document.querySelector('div.product-info');

    let newTitle = document.createElement('h5');
    newTitle.style.margin = '1rem';
    newTitle.style.textAlign = 'center';
    newTitle.innerHTML = "Détails de la commande";

    let paragraph = document.createElement('div');
    paragraph.classList.add('font-weight-light');
    paragraph.classList.add('order-info');
    paragraph.innerHTML = `<p><strong>Référence: </strong>${postData.orderId}</p>`;

    let total = document.createElement('p');
    total.classList.add('font-weight-light');
    let newOrderTitleList = document.createElement('h5');
    newOrderTitleList.style.margin = '1rem';
    newOrderTitleList.style.textAlign = 'center';
    newOrderTitleList.innerHTML = "Vos articles";

    let productsParagraph = document.createElement('div');
    productsParagraph.classList.add('font-weight-light');
    productsParagraph.classList.add('order-info');

    let newContactTitle = document.createElement('h5');
    newContactTitle.style.textAlign = 'center';
    newContactTitle.style.margin = '1rem';
    newContactTitle.innerHTML = "Coordonnées du destinataire";

    let contactParagraph = document.createElement('div');
    contactParagraph.classList.add('font-weight-light');
    contactParagraph.classList.add('order-info');
    contactParagraph.innerHTML = `<p><strong>Prénom: </strong>${postData.contact.firstName}<br/> <strong>Nom: </strong>${postData.contact.lastName}<br/>
    <strong>Adresse: </strong>${postData.contact.address}<br/> <strong>Ville: </strong>${postData.contact.city}<br/><strong>E-mail: </strong>${postData.contact.email} </p>`;

    let sum = 0;
    let quantity = 0;

    for (let i = 0; i < productAdded.length; i++) {
        let product = new Product (productAdded[i].id, productAdded[i].varnish, productAdded[i].name, productAdded[i].price, productAdded[i].img, productAdded[i].quantity);
        review.push(product);
        sum += (product.price * product.quantity);
        quantity += product.quantity;

        let containerFlex =  document.createElement('div');
        containerFlex.style.display ='flex';
        containerFlex.style.alignItems ='center';

        let productImg = document.createElement('img');
        productImg.src = product.img;
        productImg.style.height = '3.5rem';

        let productParagraph = document.createElement('p');
        productParagraph.classList.add('font-weight-light');
        productParagraph.innerHTML = `<strong>Nom: </strong> ${product.name}<br/>
        <strong>Prix: </strong> ${product.price} €<br/>
        <strong>Quantity: </strong> ${product.quantity}`;

        containerFlex.appendChild(productImg);
        containerFlex.appendChild(productParagraph);
        productsParagraph.appendChild(containerFlex);
    }

    orderRow.appendChild(newTitle);
    orderRow.appendChild(paragraph);

    productRow.appendChild(newOrderTitleList);
    productRow.appendChild(productsParagraph);

    total.innerHTML = `<strong>Quantité: </strong>${quantity}<strong> Montant total: </strong>${(sum / 100).toFixed(2)} €`;
    total.style.textAlign = 'center';
    productsParagraph.appendChild(total);

    userRow.appendChild(newContactTitle);
    userRow.appendChild(contactParagraph);
}

confirmValid();