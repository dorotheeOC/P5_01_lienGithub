const urlSearch = {}; /// on récupère l'id dans l'url produit après "?""

if (window.location.search.length > 1) {
  for (let aItKey, nKeyId = 0, aCouples = window.location.search.substr(1).split("&"); nKeyId < aCouples.length; nKeyId++) {
    aItKey = aCouples[nKeyId].split("=");
    console.log(aItKey) // array [ "id", "5be9cc611c9d440000c1421e" ]
    urlSearch[unescape(aItKey[0])] = aItKey.length > 1 ? unescape(aItKey[1]) : "";
  }
}
console.log(urlSearch.id);


//////Récupère les données de l'API
function get()  {
    const request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/api/furniture');
    request.onreadystatechange = function() {
        if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let response = JSON.parse(this.responseText);
            for (let i = 0; i<response.length; i++) {
                if (response[i]._id === urlSearch.id) {
                    console.log(response[i].price); ////test

                    let eltRow = document.querySelector("div.product");
                    console.log(eltRow);

                    let newDiv = document.createElement('div');
                    newDiv.classList.add('col-12');

                    let newEltCard = document.createElement('div');
                    newEltCard.classList.add('card');

                    let newCardImg = document.createElement('span');
                    newCardImg.classList.add('card-title')
                    newCardImg.style.background = `url('${response[i].imageUrl}') no-repeat center`;
                    newCardImg.style.height = "24rem";
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
                    
                    let newForm = document.createElement('form');
                    newForm.action = "panier.html";
                    newForm.method = "post";
                    console.log(newForm);

                    let newFormGroup = document.createElement('div');
                    newFormGroup.classList.add('form-group');
                    console.log(newFormGroup);

                    let newLabel = document.createElement('label');
                    newLabel.htmlFor = "material";
                    newLabel.innerHTML = "Choose your material"
                    console.log(newLabel);

                    let option = response[i].varnish;
                    console.log(option)////test

                    let newSelectInput = document.createElement('select');
                    newSelectInput.id = "material";
                    newSelectInput.classList.add('form-control');
                    newSelectInput.innerHTML = `<option>${option[0]}</option>
                                                <option>${option[1]}</option>
                                                <option>${option[2]}</option>`
                    
                    let formButton = document.createElement('button')
                    formButton.type = "submit";
                    formButton.innerHTML = "Ajouter au panier";
                    console.log(formButton)////test

                    newEltCard.appendChild(newCardImg);
                    newContainer.appendChild(newCardTitle);
                    newContainer.appendChild(newParagraph);
                    newContainer.appendChild(newPrice);
                    newFormGroup.appendChild(newLabel);
                    newFormGroup.appendChild(newSelectInput);
                    newForm.appendChild(newFormGroup);
                    newForm.appendChild(formButton);
                    newContainer.appendChild(newForm);
                    newEltCard.appendChild(newContainer);

                    newDiv.appendChild(newEltCard);
                    eltRow.appendChild(newDiv);
                    console.log(newDiv)

                }
            }
        } 
    }   
    request.send(); 
}
get();