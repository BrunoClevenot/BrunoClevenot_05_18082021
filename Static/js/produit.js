// produit.js


// Définition de l'id recherchée
const url = window.location.href;
const urlObj = new URL(url);
const idTrouvee = urlObj.searchParams.get("id");

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

// Fonction de calcul du prix global
function globalPrice(ev,value){
    let element = document.getElementById("nombre");
    let nbre = element.value;
    console.log(nbre);
    console.dir(ev)
    let prixTotal = value.price/100 * nbre;
    document.getElementById("prix-total").innerText=prixTotal;
}

// Récupération de l'article via id
fetch("http://localhost:3000/api/cameras/" + idTrouvee)
	.then(function(res){
        if (res.ok){
            return res.json();
        };
    })
    .then(function(value){
        if ("content" in document.createElement("template")) {
            prixUnitaire=value.price/100;
            console.log(prixUnitaire);
            console.log(value);
            console.log(value.imageUrl);
            let article = document.querySelector("article");
            let template = document.querySelector("#template-card-box-produit");
            let clone = document.importNode(template.content, true);
            clone.querySelector("img").src=value.imageUrl;
            clone.querySelector(".slot-nom").textContent=value.name;
            clone.querySelector(".slot-description").textContent = value.description;
            if (value.lenses.length>0){
                for (let i = 0; i < value.lenses.length; i++) {
                    opt=clone.querySelector("#lentilles")
                    option=document.createElement("option");
                    option.text=value.lenses[i];
                    option.value=value.lenses[i]
                    if (i ===0){
                        opt.append(option);
                        option.selected=true;
                    }else{            
                        opt.append(option);
                    }
                }
            }
            clone.querySelector(".slot-prix").textContent = value.price/100;
            clone.querySelector(".slot-prix-total").textContent=value.price/100;
            clone.querySelector("#nombre").addEventListener("change",(ev)=>globalPrice(ev,value));
            article.appendChild(clone);
        }
        
    })
    .catch(function(err){
        if (err=="TypeError: value is undefined"){
            let article = document.querySelector("article");
            let template = document.querySelector("#template-error-produit");
            let clone = document.importNode(template.content, true);
            clone.querySelector(".slot-noData-1").textContent="Désolé, aucun produit n'a été trouvé dans la base.";
            clone.querySelector(".slot-noData-2").textContent="Nous vous invitons à revenir ultérieurement."
            article.appendChild(clone);
        }
        console.log("Erreur : "+ err);
    })

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

// fonction de vérification  : regarde si article dans panier
// L'ajoute si non trouvé, le modifie si trouvé
function addCamera(camera){
    // On récupère les appareils du panier
    const cameras=getCameras();
    console.log(cameras);
    console.log(camera);
    
    // Création d'une variable pour savoir si l'appareil choisi est déjà dans le panier
    let trouve=false;
    // On boucle pour savoir si le produit est déjà dans le panier
    for (let i = 0; i < cameras.length; i++) {
        console.log(camera);
        console.log(cameras[i]);
        console.log(cameras[i].id);
        console.log(idTrouvee);
        console.log(cameras[i].lentille);
        console.log(camera.lentille);
		if (cameras[i].id === idTrouvee && cameras[i].lentille === camera.lentille) {
            console.log(cameras[i].id);
            console.log(idTrouvee);
            console.log(cameras[i].lentille === camera.lentille);
            // Même appareil avec même lentille trouvé
            // On rajoute donc le nombre d'articles en plus dans l'enregistrement
            console.log(cameras[i].nombreArticles);
            console.log(camera.nombreArticles);
            console.log(cameras[i].nombreArticles+camera.nombreArticles);
			cameras[i].nombreArticles += camera.nombreArticles;
            console.log(cameras[i].nombreArticles);
            // On place la variable trouve à true
			trouve=true;
		}
    }
    // Si l'article n'a pas été trouvé, on le rajoute au panier
    console.log(trouve);
    if (trouve===false){
        cameras.push(camera);
        console.log(camera);
        console.log(cameras); 
    }
    // On envoie le panier au serveur	
    sessionStorage.setItem("cameras", JSON.stringify(cameras));
}

function removeCamera(){
    let cameras=[];
    sessionStorage.setItem("cameras", JSON.stringify(cameras));
    console.log(cameras);
}
// fonction d'ajout d'un appareil au panier
document.querySelector("#validePanier").addEventListener("click", (ajout) => {
    // On récupère les valeurs
    ajout.preventDefault();
	const image = document.querySelector("#image").src;
	const nom = document.querySelector(".slot-nom").innerText;
    const selLense=document.querySelector("#lentilles");
    console.log(selLense);
	const lentille = selLense.options[selLense.selectedIndex].value;
    console.log(lentille);
    let prix=document.querySelector(".slot-prix").innerText;
    prix = Number(prix);
    const selArticle=document.querySelector("#nombre");
    let nombreArticles= selArticle.options[selArticle.selectedIndex].value;
    nombreArticles=Number(nombreArticles);
    // On crée un objet
    const camera = new AppareilPhoto(idTrouvee,image,nom,lentille,prix,nombreArticles);
    console.log(camera);
    // On l'ajoute ou on le modifie dans le panier
    addCamera(camera);// On ajoute l'objet
    
});