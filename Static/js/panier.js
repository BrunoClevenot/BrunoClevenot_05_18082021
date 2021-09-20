// produit.js


// Constructeur d'Appareil
class AppareilPhoto{
	constructor(id, image, nom, lentille, prix, nombreArticles) {
		this.id = id;
		this.image = image;
		this.nom = nom;
		this.lentille = lentille;
		this.prix = prix;
		this.nombreArticles = nombreArticles;
	}
}

// Constructeur d'objet contact
class BuildContact{
	constructor(firstName,lastName,adress,city, email){
		this.firstName=firstName;
		this.lastName=lastName;
		this.adress=adress;
		this.city=city;
		this.email=email;
	}
}

// Fonction de récuparation des appareils du panier
function getCameras(){
    let cameras=[];
    if (sessionStorage.getItem("cameras") !== null) {
        // Si panier rempli, on récupère
		cameras = JSON.parse(sessionStorage.getItem("cameras"));
	}
    console.log(cameras);
	return cameras;
}

const cameras=getCameras();
console.log(cameras)
for (let i = 0; i < cameras.length; i++) {
    console.log(cameras[i]);
}

let prixFactureTotal=0;

// Construction de la table des articles choisis
function affichageArticle(){
	
	let body = document.querySelector("tbody");
	console.log(cameras)
	for (let i = 0; i < cameras.length; i++) {
		console.log(cameras[i]);
		let template = document.querySelector("#recapitulatif-produit");
		let clone = document.importNode(template.content, true);
		clone.querySelector(".produitLentille").textContent=cameras[i].nom + " - "+ cameras[i].lentille;
		clone.querySelector(".prixUnitaire").textContent=cameras[i].prix + " €";
		let prixTotal=prixproduitTotal(cameras[i].prix,cameras[i].nombreArticles);
		prixFactureTotal +=prixTotal;
		clone.querySelector(".prixTotal").textContent=prixTotal+" €",
		clone.querySelector(".quantite").textContent=cameras[i].nombreArticles;
		console.log(cameras[i].nom);
		console.log(cameras[i].lentille);
		body.appendChild(clone);
	}
	let spanTotal = document.querySelector(".Total");
	if (prixFactureTotal>0){
		spanTotal.textContent=prixFactureTotal + " €";
	}
	
}

// Affichage des articles
affichageArticle();

// Calcul prix total d'un produit
function prixproduitTotal(prix, nombre){
	let ppt = prix * nombre;
	return ppt;
}

// fonction récupération du contact
function getContact(){
	let contact={};
	if (sessionStorage.getItem("contact") !== null) {
		// Si contact rempli, on récupère
		contact = JSON.parse(sessionStorage.getItem("contact"));
	}
	console.log(contact);
	return contact;
}

let contactEnregistre=getContact();

// recupération des valeurs et passage en majuscule
// 1. Récupéraion des éléments
const elementNom=document.getElementById("nom");
const elementPrenom=document.getElementById("prenom");
const elementAdresse=document.getElementById("adresse");
const elementVille=document.getElementById("ville");
const elementMail=document.getElementById("mail");
// 2.1 Passage en majuscule
elementNom.addEventListener("focusout",majusculeNom);
elementPrenom.addEventListener("focusout",majusculePrenom);
elementAdresse.addEventListener("focusout",majusculeAdresse);
elementVille.addEventListener("focusout",majusculeVille);
// 2.2 Fonctions de mise en majuscules
function majusculeNom(){
	let nom = elementNom.value;
	nom=nom.toUpperCase()
	elementNom.value=nom;
}
function majusculePrenom(){
	let prenom = elementPrenom.value;
	prenom=prenom.toUpperCase()
	elementPrenom.value=prenom;
}
function majusculeAdresse(){
	let adresse=elementAdresse.value;
	adresse=adresse.toUpperCase();
	elementAdresse.value=adresse;
}
function majusculeVille(){
	let ville=elementVille.value;
	ville=ville.toUpperCase();
	elementVille.value=ville;
}

//Affichage du contact si présent
function affichageContact{
	let vide= isObjectEmpty(contactEnregistre);
	if vide===false{
		elementNom.value=contactEnregistre.firstName;
		elementPrenom.value=contactEnregistre.lastName;
		elementAdresse.value=contactEnregistre.adress;
		elementVille.value=contactEnregistre.city;
		elementMail.value=contactEnregistre.email;
	}
}

// Fonctions de validation du contact
function isValidlettre(value) {				
	return /[A-ZÀ-ÝŸ ]$/.test(value);						
}
function isValidLongueur(valeur){
	if (valeur.lenght>1 && valeur.lenght<=250){
		return true
	}else{
		return false
	}	
}	

// Fonction création objet Contact
function createContact(){
	
	const contact = BuildContact(nom,prenom,adresse,ville,mail);
	return contact;
}




// fonction vérification objet vide
function isObjectEmpty(object){
	let isEmpty=true;
	for (keys in objet){
		isEmpty=false;
		break;
	}
	return isEmpty
}
//fonction vérification du contact
function verifContact(){
	let searchContact= getContact();
	let vide=isObjectEmpty(searchContact);
	console.log(vide);
	let nom=elementNom.value;
	let prenom=elementPrenom.value;
	let adresse=elementAdresse.value;
	let ville=elementVille.value;
	let mail=elementMail.value;
	//On vérifie si les données sont bonnes
	let valid = true;
	valid = isValidlettre(nom);
	if (valid===false){
		return;
	}
	// si contact vide, création du contact
	if (vide===true){
		// création du contact
		let newContact= createContact(nom,prenom,adresse,ville,mail);
		// On envoie le contact au serveur
		sessionStorage.setItem("contact", JSON.stringify(newContact));
	}else{
		//On modifie le contact
		searchContact.firstName=nom;
		searchContact.lastName=prenom;
		searchContact.adress=adresse;
		searchContact.city=ville;
		searchContact.email=mail;
		// On envoie le contact au serveur
		sessionStorage.setItem("contact", JSON.stringify(searchContact));
	}
}