//-------------------------Création d'une classe produit
export class Product {
    constructor(id, varnish, name, price) {
      this.id = id;
      this.varnish = varnish;
      this.name = name;
      this.price = price;
    }
  }

//-------------------------Création d'une classe formulaire commande
export class Order {
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}