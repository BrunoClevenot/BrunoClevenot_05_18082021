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
	spanTotal.textContent=prixFactureTotal + " €";
}

// Affichage
affichage();

//Calcul prix total d'un produit
function prixproduitTotal(prix, nombre){
	let ppt = prix * nombre;
	return ppt;
}