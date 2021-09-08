// produit.js


// Définition de l'id recherchée
const url = window.location.href;
const urlObj = new URL(url);
const idTrouvee = urlObj.searchParams.get("id");

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