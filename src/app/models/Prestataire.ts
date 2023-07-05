export class Prestataire {
  nom: string;
  contact: string;
  prix: number;

  constructor(nom: string, contact: string, prix: number) {
    this.nom = nom;
    this.contact = contact;
    this.prix = prix;
  }
}
