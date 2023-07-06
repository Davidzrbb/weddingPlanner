export class Prestataire {
  id?: number;
  name: string;
  contact: string;
  price: number;

  constructor(nom: string, contact: string, prix: number) {
    this.name = nom;
    this.contact = contact;
    this.price = prix;
  }
}
