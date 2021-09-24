// Récupéraion des données
const contact = JSON.parse(sessionStorage.getItem("contact"));
const products = JSON.parse(sessionStorage.getItem("products"));
const total = sessionStorage.getItem("total");
const order = sessionStorage.getItem("order");

console.log(products);
console.log(contact);
console.log(order);
const numero=document.getElementsByClassName(".slot-commandNumber");



numero.innerText=order;