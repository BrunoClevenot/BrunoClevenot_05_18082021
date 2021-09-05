// produit.js

const url = window.location.href;
const urlObj = new URL(url);
const idTrouvee = urlObj.searchParams.get("id");
let prixUnitaire=0;

function globalPrice(){
    let element = document.getElementById("nombre");
    let nbre = element.value;
    console.log(nbre);
    let prixTotal = prixUnitaire * nbre;
    console.log(prixUnitaire);
    document.getElementById("prix-total").innerText="Prix total : " + prixTotal +" €";
}

// Récupération de l'article via id
fetch("http://localhost:3000/api/cameras/" + idTrouvee)
	.then(function(res){
        if (res.ok){
            return res.json();
        };
    })
    .then(function(value){
        prixUnitaire=value.price/100;
        console.log(prixUnitaire);
        console.log(value);
        console.log(value.imageUrl);
        document.getElementById("nom").innerText="Nom : " + value.name;
        document.getElementById("description").innerText="Description : " + value.description;
        document.getElementById("image").setAttribute("src",value.imageUrl);
        let opt = document.getElementById("lentilles");
        if (value.lenses.length>0){
            for (let i = 0; i < value.lenses.length; i++) {
                let option = document.createElement("option"); 
                option.text=value.lenses[i];
                option.setAttribute("value",value.lenses[i]);
                if (i ===0){
                    option.selected=true;
                }            
                opt.append(option);
            }
        }
        document.getElementById("prix-unitaire").innerText="Prix unitaire : " + value.price/100 +" €";
        document.getElementById("prix-total").innerText="Prix total : " + value.price/100 +" €";
    })
    .catch(function(err){
        console.log("Erreur :" + error);
    })