// produit.js

// Récupération de l'id de l'article
const url = window.location.href;
const urlObj = new URL(url);
const idTrouvee = urlObj.searchParams.get("id");

fetch("http://localhost:3000/api/cameras/" + idTrouvee)
	.then(function(res){
        if (res.ok){
            return res.json();
        };
    })
    .then(function(value){
        console.log(value);
        
        
        
    })
    .catch(function(err){
        console.log("Erreur :" + error);
    })