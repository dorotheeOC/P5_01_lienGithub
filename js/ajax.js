//------------------------- Récupération de l'id dans l'url produit après "?""
export const getIdFromUrl = () => { 
  const urlParams = window.location.search;
  const searchParams = new URLSearchParams(urlParams);
  
  return searchParams.get('id');
}

//------------------------- Erreur promesse: DOM
export let catchError = (productId) => {
  let eltRow = document.querySelector("div.product");

  let alertDiv = document.createElement('div');
  alertDiv.classList.add('alert');
  alertDiv.classList.add('alert-danger');
  alertDiv.role = 'alert';

  if (productId === null) {
    alertDiv.textContent = "Erreur server ! ";
  } else {
    alertDiv.textContent = "Produit inexistant ! ";
  }
  
  let redirectLink = document.createElement('a');
  redirectLink.classList.add('alert-link');
  redirectLink.href = 'index.html';
  redirectLink.innerHTML = 'Revenir à l\'accueil';
  
  alertDiv.appendChild(redirectLink);
  eltRow.appendChild(alertDiv);
}
//-------------------------Récupération des données de l'API
export const list = (url) => {
    return new Promise ((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.onreadystatechange = function () {
          if (request.readyState === 4) {
            if (request.status === 200) {
              resolve(request.responseText);
            } else {
              reject();
            }
          }   
      }
      request.open('GET', url, true);//ne bloque pas l'exécution du script
      request.send();
    })  
}
