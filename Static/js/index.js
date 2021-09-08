//index.js

// Récupération des produits dans l'API cameras
// et création des cartes pour affichage

fetch("http://localhost:3000/api/cameras")
	.then(function(res){
        if (res.ok){
            return res.json();
        };
    })
    .then(function(value){
        let nombre = value.length;
        let article = document.querySelector("article");

        console.log(nombre);
        

        if (nombre> 0){
            value.forEach(camera => {
                if ("content" in document.createElement("template")) {
                    let template = document.querySelector("#template-card-box");
                    let clone = document.importNode(template.content, true);
                    clone.querySelector("img").src=camera.imageUrl;
                    let texteReference = "produit.html?id="+camera._id;
                    clone.querySelector("a").href=texteReference;
                    clone.querySelector(".slot-nom").textContent = camera.name;
                    clone.querySelector(".slot-description").textContent = camera.description;
                    clone.querySelector(".slot-prix").textContent = camera.price/100;
                    article.appendChild(clone);
                }
            });
        }else if (nombre===0){
            let template = document.querySelector("#template-error-index");
            let clone = document.importNode(template.content, true);
            clone.querySelector(".slot-noData-1").textContent="Désolé, aucun produit n'a été trouvé dans la base.";
            clone.querySelector(".slot-noData-2").textContent="Nous vous invitons à revenir ultérieurement."
            article.appendChild(clone);
        }
    })
    .catch(function(err){
        let template = document.querySelector("#template-error-index");
        let clone = document.importNode(template.content, true);
        if (err=="TypeError: value is undefined"){
            clone.querySelector(".slot-noData-1").textContent="Désolé, aucun produit n'a été trouvé dans la base.";
            clone.querySelector(".slot-noData-2").textContent="Nous vous invitons à revenir ultérieurement.";
        }else{
            clone.querySelector(".slot-noData-1").textContent="Désolé, le serveur ne répond pas.";
            clone.querySelector(".slot-noData-2").textContent="Nous vous invitons à revenir ultérieurement.";
        }
        console.log("Erreur :" + err);
    })
	