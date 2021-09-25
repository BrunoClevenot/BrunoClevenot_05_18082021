// produit.js

// Constructeur d'Appareil
class AppareilPhoto {
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
class BuildContact {
  constructor(firstName, lastName, adress, city, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.adress = adress;
    this.city = city;
    this.email = email;
  }
}

// Fonction de récuparation des appareils du panier
function getCameras() {
  let cameras = [];
  if (sessionStorage.getItem("cameras") !== null) {
    // Si panier rempli, on récupère
    cameras = JSON.parse(sessionStorage.getItem("cameras"));
  }
  console.log(cameras);
  return cameras;
}

let prixFactureTotal = 0;

//Suppression des appareils sélectionnés
function removeCamera() {
  let cameras = [];
  sessionStorage.setItem("cameras", JSON.stringify(cameras));
  console.log(cameras);
}

// Construction de la table des articles choisis
function affichageArticle() {
  let body = document.querySelector("tbody");
  let cameras = getCameras();
  while (body.firstChild) {
    body.removeChild(body.firstChild);
  }
  prixFactureTotal = 0;
  console.log(cameras);
  for (let i = 0; i < cameras.length; i++) {
    console.log(cameras[i]);
    let template = document.querySelector("#recapitulatif-produit");
    let clone = document.importNode(template.content, true);
    clone.querySelector(".produitLentille").textContent =
      cameras[i].nom + " - " + cameras[i].lentille;
    clone.querySelector(".prixUnitaire").textContent = cameras[i].prix + " €";
    let prixTotal = prixProduitTotal(
      cameras[i].prix,
      cameras[i].nombreArticles
    );
    prixFactureTotal += prixTotal;
    (clone.querySelector(".prixTotal").textContent = prixTotal + " €"),
      (clone.querySelector(".quantite").textContent =
        cameras[i].nombreArticles);
    console.log(cameras[i].nom);
    console.log(cameras[i].lentille);
    body.appendChild(clone);
    sessionStorage.setItem("total", prixFactureTotal);
  }

  let spanTotal = document.querySelector(".Total");
  if (prixFactureTotal > 0) {
    spanTotal.textContent = prixFactureTotal + " €";
  } else {
    spanTotal.textContent = "";
  }
}

// Affichage des articles
affichageArticle();

// Calcul prix total d'un produit
function prixProduitTotal(prix, nombre) {
  let ppt = prix * nombre;
  return ppt;
}

// fonction récupération du contact
function getContact() {
  let contact = {};
  if (sessionStorage.getItem("contact") !== null) {
    // Si contact rempli, on récupère
    contact = JSON.parse(sessionStorage.getItem("contact"));
  }
  console.log(contact);
  return contact;
}

// recupération des valeurs et passage en majuscule
// 1. Récupéraion des éléments
const elementNom = document.getElementById("nom");
const elementPrenom = document.getElementById("prenom");
const elementAdresse = document.getElementById("adresse");
const elementVille = document.getElementById("ville");
const elementMail = document.getElementById("mail");
console.log(elementNom.value);
// 2.1 Passage en majuscule
elementNom.addEventListener("focusout", majusculeNom);
elementPrenom.addEventListener("focusout", majusculePrenom);
elementAdresse.addEventListener("focusout", majusculeAdresse);
elementVille.addEventListener("focusout", majusculeVille);
// 2.2 Fonctions de mise en majuscules
function majusculeNom() {
  let nom = elementNom.value;
  nom = nom.toUpperCase();
  elementNom.value = nom;
}
function majusculePrenom() {
  let prenom = elementPrenom.value;
  console.log(prenom)
  prenom = prenom.toUpperCase();
  elementPrenom.value = prenom;
}
function majusculeAdresse() {
  let adresse = elementAdresse.value;
  adresse = adresse.toUpperCase();
  elementAdresse.value = adresse;
}
function majusculeVille() {
  let ville = elementVille.value;
  ville = ville.toUpperCase();
  elementVille.value = ville;
}

//Affichage du contact si présent
function affichageContact() {
  let vide = isObjectEmpty(contactEnregistre);
  if (vide === false) {
    elementNom.value = contactEnregistre.lastName;
    elementPrenom.value = contactEnregistre.firstName;
    elementAdresse.value = contactEnregistre.adress;
    elementVille.value = contactEnregistre.city;
    elementMail.value = contactEnregistre.email;
  }
}

// Fonction création objet Contact
function createContact() {
  let  prenom=elementPrenom.value;
  let nom=elementNom.value;
  let adresse=elementAdresse.value;
  let ville=elementVille.value;
  let mail=elementMail.value;
  const contact = new BuildContact(prenom, nom, adresse, ville, mail);
  console.log(contact)
  sessionStorage.setItem("contact", JSON.stringify(contact));
  console.log(prenom);
  return contact;
}

// fonction vérification objet vide
function isObjectEmpty(object) {
  let isEmpty = true;
  for (keys in object) {
    isEmpty = false;
    break;
  }
  return isEmpty;
}
//fonction vérification du contact et du panier
function envoiContact() {
  let searchContact = getContact();
  console.log(searchContact);
  let vide = isObjectEmpty(searchContact);
  let erreur = "";
  console.log(vide);
  let nom = elementNom.value;
  let prenom = elementPrenom.value;
  let adresse = elementAdresse.value;
  let ville = elementVille.value;
  let mail = elementMail.value;
  let verificationOK = true;
  //On vérifie si les données sont présentes et correctes
  if (!nom || elementNom.validity.patternMismatch) {
    alert("Le champ NOM n'est pas ou est mal renseigné !!");
    erreur = "NOM";
    verificationOK = false;
  }
  if (!erreur) {
    if (!prenom || elementPrenom.validity.patternMismatch) {
      alert("Le champ Prénom n'est pas ou est mal renseigné !!");
      erreur = "Prénom";
      verificationOK = false;
    }
  }
  if (!erreur) {
    if (!adresse || elementAdresse.validity.patternMismatch) {
      alert("Le champ Adresse n'est pas ou est mal renseigné !!");
      erreur = "Adresse";
      verificationOK = false;
    }
  }
  if (!erreur) {
    if (!ville || elementVille.validity.patternMismatch) {
      alert("Le champ Ville n'est pas ou est mal renseigné !!");
      erreur = "Ville";
      verificationOK = false;
    }
  }
  if (!erreur) {
    if (!mail || elementMail.validity.patternMismatch) {
      console.log(elementMail.validity.patternMismatch);
      alert("Le champ e-mail n'est pas ou est mal renseigné !!");
      erreur = "e-mail";
      verificationOK = false;
    }
  }
  // Vérification du panier
  if (!erreur) {
    let cameras = getCameras();
    if (cameras.length == 0) {
      alert("Aucun produit sélectionné !!");
      erreur = "Produit";
      verificationOK = false;
    }
  }else{
    verificationOK=false;
  }

  return verificationOK;
}

// Validation du contact
document.querySelector("#validPanier").addEventListener("click", () => {
  // Vérification et envoi du contact
  let verif = envoiContact();
  console.log(verif);
  // Si panier OK
  if (verif == true) {
    // On crée le contact
    createContact();
    // On envoie le panier
    envoiPanier();
  }
});

//Suppression des appareils sélectionnés
document
  .querySelector("#supprimePanier")
  .addEventListener("click", (remove) => {
    // On supprime tous les appareils sélectionnés
    removeCamera();
    let cameras = getCameras();
    console.log(cameras);
    // On affiche
    affichageArticle();
  });

// Envoi du panier
function envoiPanier() {
  // On récupère le contact et les appareils
  const cameras = getCameras();
  const contact = getContact();
  console.log(contact);
  console.log(cameras);
  // On construit le produit
  let produits = [];
  cameras.forEach((camera) => {
    for (let i = 0; i < camera.nbArticles; i++) {
      produits.push(camera.id);
    }
  });
  // On envoie
  const jsonBody = {
    "contact": contact,
    "products": cameras
  };
  const url = "http://localhost:3000/api/cameras/order";
  const options = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonBody),
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.orderId);
      sessionStorage.setItem("order", data.orderId);
      window.location.href="confirmation.html";
    })
    .catch((error) => console.log("Erreur : " + error));
}
