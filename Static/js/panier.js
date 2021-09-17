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
function affichage(){
	
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

// Affichage
affichage();

// Calcul prix total d'un produit
function prixproduitTotal(prix, nombre){
	let ppt = prix * nombre;
	return ppt;
}

const elementNom=document.getElementById("nom");
const elementPrenom=document.getElementById("prenom");
const elementAdresse=document.getElementById("adresse");
const elementVille=document.getElementById("ville");
const elementMail=document.getElementById("mail");
elementNom.addEventListener("focusout",majusculeNom);
elementPrenom.addEventListener("focusout",majusculePrenom);
elementAdresse.addEventListener("focusout",majusculeAdresse);
elementVille.addEventListener("focusout",majusculeVille);

// Fonction de validation du contact
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
let validNomLettre=isValidlettre(nom);
console.log(validNomLettre);	
let validNomLongueur=isValidLongueur(nom);
console.log(validNomLongueur);
console.log(nom);
console.log(nom.lenght);

// Fonctions de mise en majuscules
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
	
function validContact(){
	let valid=true;
	const chiffres=["1","2","3","4","5","6","7","8","9","0"];
	for (let i = 0;i<nom.length;i++){
		if (nom[i] in chiffres){
			valid=false;
			break;
		}
	}
	console.log(valid);
	if (valid==true){

	}
}
validContact();

// Fonction création objet Contact
function createContact(){
	const elementNom=document.getElementById("nom");
	
	nom=nom.toUpperCase();
	elementNom.value=nom;
	const elementPrenom=document.getElementById("prenom");
	let prenom1=elementPrenom.value;
	prenom1=prenom1.toLowerCase()
	let premiereLettre=prenom1[0];
	premiereLettre=premiereLettre.toUpperCase();
	let prenom=premiereLettre;
	for (let i=1;i<prenom1.length;i++){
		prenom +=prenom1[i]
	}
	elementPrenom.value=prenom;
	console.log(prenom);
	console.log(nom);
	const contact = BuildContact(firstname,lastName,adress,city,email);
	return contact;
}

createContact();