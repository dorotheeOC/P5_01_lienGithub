!function(e){var t={};function n(l){if(t[l])return t[l].exports;var r=t[l]={i:l,l:!1,exports:{}};return e[l].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,l){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(n.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(l,r,function(t){return e[t]}.bind(null,r));return l},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);class l{constructor(e,t,n,l,r){this.firstName=e,this.lastName=t,this.address=n,this.city=l,this.email=r}}document.getElementById("form").reset();let r=JSON.parse(localStorage.getItem("product")),o=document.querySelector("div.product-added"),a=[];const i=e=>{let t,n=localStorage.getItem("product")?JSON.parse(localStorage.getItem("product")):[];for(let l=0;l<n.length;l++)if(n[l].id===e){t=l;break}void 0!==t&&(n.splice(t,1),localStorage.setItem("product",JSON.stringify(n)))};if(null===r||0===r)o.innerHTML='<p class="panier-message">Votre panier est actuellement vide</p>';else{let e=document.createElement("ul");e.className="list-group mx-auto my-4",o.appendChild(e);let t=document.createElement("a");t.classList.add("text-decoration-none"),t.href="panier.html",t.style.textAlign="center",t.textContent="Vider le panier",e.appendChild(t),t.addEventListener("click",e=>{localStorage.clear()});let n=document.createElement("div");n.className="list-group-item total",n.innerHTML=`<p class="amount">Montant total du panier: <strong>${(()=>{let e=0;for(let t=0;t<r.length;t++)e+=r[t].price*r[t].quantity,console.log(typeof r[t].price),console.log(r[t].price);return(e/100).toFixed(2)})()} €</strong></p>`;for(let t=0;t<r.length;t++){a.push(r[t].id);let l=document.createElement("div");l.classList.add("list-group-div");let o=document.createElement("div");o.className="list-group-div justify-content-around";let d=document.createElement("li");d.classList.add("list-group-item");let c=document.createElement("p");c.classList.add("font-weight-bold"),c.innerHTML=r[t].name;let s=document.createElement("p");s.classList.add("font-weight-light"),s.innerHTML=r[t].varnish;let u=document.createElement("p");u.innerHTML=(r[t].price/100).toFixed(2)+" €";let p=document.createElement("p");p.classList.add("font-weight-light"),p.innerHTML="<strong>Quantité : </strong>"+r[t].quantity;let m=document.createElement("a");m.classList.add("text-decoration-none"),m.href="panier.html",m.textContent="supprimer",e.appendChild(d),l.appendChild(c),l.appendChild(s),l.appendChild(u),o.appendChild(p),o.appendChild(m),d.appendChild(l),d.appendChild(o),e.appendChild(n),m.addEventListener("click",()=>{i(r[t].id),console.log(localStorage.getItem("product"))})}}let d=document.getElementById("lastname"),c=document.getElementById("firstname"),s=document.getElementById("address"),u=document.getElementById("city"),p=document.getElementById("email");const m=()=>{document.location.href="confirmation.html"};document.querySelector("form > button").addEventListener("click",e=>{if(e.preventDefault(),a.length>0)(()=>{let e=new XMLHttpRequest;e.onload=()=>{if(e.readyState===e.DONE&&201===e.status){let t=JSON.parse(e.responseText);localStorage.setItem("confirm",JSON.stringify(t)),m()}},e.open("POST","http://localhost:3000/api/furniture/order"),e.setRequestHeader("Content-Type","application/json");let t={contact:new l(c.value,d.value,s.value,u.value,p.value),products:a};e.send(JSON.stringify(t))})();else{let e=document.querySelector("div.container"),t=document.createElement("div");t.className="alert alert-danger mx-auto",t.textContent="Ajouter un article pour valider une commande",e.appendChild(t),setTimeout(()=>{e.removeChild(t)},2e3)}})}]);