class Product {
    contructor(id, description, imageUrl, name, price, varnish) {
        this.id = id;
        this.description = description;
        this.imageUrl = imageUrl;
        this.name = name;
        this.price = price;
        this.varnish = [];
    }
}

//////Récupère les données de l'API
function get()  {
    const request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/api/furniture');
    request.onreadystatechange = function() {
        if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let response = JSON.parse(this.responseText);
      
            for (let i = 0; i<response.length; i++){
                console.log(response[i]._id); //test

                let eltRow = document.querySelector("div.product-review");
                console.log(eltRow);

                let newDiv = document.createElement('div');
                newDiv.classList.add('col-lg-4');
                
                let newEltCard = document.createElement('div');
                newEltCard.classList.add('card');

                let newCardImg = document.createElement('span');
                newCardImg.classList.add('card-title')
                newCardImg.style.background = `url('${response[i].imageUrl}') no-repeat`;
                newCardImg.style.height = "14rem";
                newCardImg.style.backgroundSize = "cover";

                let newContainer = document.createElement('div');
                newContainer.classList.add('card-desc')

                let newCardTitle = document.createElement('h5');
                newCardTitle.classList.add('card-title')
                newCardTitle.innerHTML = `${response[i].name}`;

                let  newParagraph = document.createElement('p');
                newParagraph.classList.add('card-text');
                newParagraph.innerHTML = response[i].description;

                let  newPrice = document.createElement('p');
                newPrice.classList.add('price');
                newPrice.innerHTML = `${response[i].price} €`;

                let  newBtn = document.createElement('div');
                newBtn.classList.add('text-center');
                newBtn.innerHTML = `<a class="btn btn-primary btn-sm" role="button" href="produit.html?id=${response[i]._id}">Fiche produit</a>`;                

                newEltCard.appendChild(newCardImg);
                newContainer.appendChild(newCardTitle);
                newContainer.appendChild(newParagraph);
                newContainer.appendChild(newPrice);
                newEltCard.appendChild(newContainer);
                newEltCard.appendChild(newBtn);
                newDiv.appendChild(newEltCard);
                eltRow.appendChild(newDiv);
                console.log(newDiv)
            }
        } 
    }   
    request.send(); 
}
get();