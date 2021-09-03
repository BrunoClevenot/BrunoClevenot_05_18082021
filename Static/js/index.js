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
        value.forEach(camera => {
            if ("content" in document.createElement("template")) {
                let template = document.querySelector("#template-card-box");
                let article = document.querySelector("article");
                let clone = document.importNode(template.content, true);
                let p = clone.querySelectorAll("p");
                let picture = clone.querySelector("img");
                let a =clone.querySelector("a");
                let texteReference = "produit.html?id="+camera._id;

                p[0].textContent = "Nom : " + camera.name;
                p[1].textContent = "Description : " + camera.description;
                p[2].textContent = "Prix : " + camera.price/100 +" €";
                picture.src=camera.imageUrl
                a.href= texteReference
                article.appendChild(clone);
            }
        });
    })
    .catch(function(err){
        console.log("Erreur :" + error);
    })
	