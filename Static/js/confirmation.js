// Récupéraion des données
const contact = JSON.parse(sessionStorage.getItem("contact"));
const products = sessionStorage.getItem("products");
const prixTotal = sessionStorage.getItem("total");
const order = sessionStorage.getItem("order");

console.log(products);
console.log(contact);
console.log(prixTotal);
console.log(order);

const numero=document.getElementsByClassName('slot-commandNumber');
const prix = document.getElementsByClassName("slot-commandPrice");
const adress=document.getElementsByClassName("slot-commandAdress");
const mail=document.getElementsByClassName("slot-commandMail");

numero.innerText=order;
prix.innerText= String(prixTotal);