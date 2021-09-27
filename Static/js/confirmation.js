// Récupéraion des données
const contact = JSON.parse(sessionStorage.getItem("contact"));
const products = sessionStorage.getItem("products");
const prixTotal = sessionStorage.getItem("total");
const order = sessionStorage.getItem("order");

console.log(products);
console.log(contact);
console.log(prixTotal);
console.log(order);

const numero=document.querySelector(".slot-commandNumber");
const prix = document.querySelector(".slot-commandPrice");
const adress=document.querySelector(".slot-commandAdress");
const mail=document.querySelector(".slot-commandMail");

numero.textContent=order;
prix.textContent= prixTotal + " €";
const adresse=contact.address+ " "+contact.city
console.log(adresse);
adress.textContent=adresse;
mail.textContent=contact.email;