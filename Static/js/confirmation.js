// Récupéraion des données
const contact = JSON.parse(sessionStorage.getItem("contact"));
const total = sessionStorage.getItem("total");
const order = JSON.parse(sessionStorage.getItem("order"));

const numero=document.getElementsByClassName(".slot-commandNumber")



numero.innerText=order;