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
  
class BuildContact {
    constructor(firstName, lastName, adress, city, email) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.adress = adress;
      this.city = city;
      this.email = email;
    }
}
  export { AppareilPhoto, BuildContact };