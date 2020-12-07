//-------------------------recupération du localStorage
let postData = JSON.parse(localStorage.getItem('confirm'));

//-------------------------recupération du panier array products
class Product {
    constructor(name, price, img) {
      this.name = name;
      this.price = price;
      this.img = img;
    }
}
let review = []; 

//-------------------------DOM
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

for (let i = 0; i < postData.products.length; i++) {
    let product = new Product (postData.products[i].name, postData.products[i].price, postData.products[i].imageUrl);
    review.push(product);
}

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

orderRow.appendChild(newTitle);
orderRow.appendChild(paragraph);

productRow.appendChild(newOrderTitleList);
productRow.appendChild(productsParagraph);

let sum = 0;
for (let product of review) {
    sum += product.price;

    let containerFlex =  document.createElement('div');
    containerFlex.style.display ='flex';
    containerFlex.style.alignItems ='center';

    let productImg = document.createElement('img');
    productImg.src = product.img;
    productImg.style.height = '3.5rem';

    let productParagraph = document.createElement('p');
    productParagraph.classList.add('font-weight-light');
    productParagraph.innerHTML = `<strong>Nom: </strong> ${product.name}<br/>
    <strong>Prix: </strong> ${product.price} €`;

    containerFlex.appendChild(productImg);
    containerFlex.appendChild(productParagraph);
    productsParagraph.appendChild(containerFlex);
}

total.innerHTML = `<strong>Quantité: </strong>${review.length}<strong> Montant total: </strong>${sum} €`;
total.style.textAlign = 'center';
productsParagraph.appendChild(total);

userRow.appendChild(newContactTitle);
userRow.appendChild(contactParagraph);
