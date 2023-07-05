import {Component, OnInit} from '@angular/core';
import {faBackward, faCheck, faTrash, faUndo} from '@fortawesome/free-solid-svg-icons';
import {Prestataire} from "../models/Prestataire";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  backward = faBackward;
  check = faCheck;
  trash = faTrash;
  undo = faUndo;
  inputValue: string = "";
  listCard: string[] = [];
  listCardFinish: string[] = [];
  listPrestataire: Prestataire[] = [];
  backgroundImage: string = "";

  constructor() {
  }

  ngOnInit(): void {
    this.backgroundImage = this.getRandomImageStyle();
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');
    console.log(myParam)
  }

  checkInputNotEmpty(value: string): boolean {
    return value.trim().length > 0;
  }

  addCard() {
    if (!this.checkInputNotEmpty(this.inputValue)) return;
    this.listCard.push(this.inputValue);
    this.inputValue = this.checkInputNotEmpty(this.inputValue) ? "" : this.inputValue;
  }

  cardFinish(value: string) {
    this.listCardFinish.push(value);
    this.inputValue = this.checkInputNotEmpty(this.inputValue) ? "" : this.inputValue;
    this.listCard = this.listCard.filter(card => card !== value);
  }

  protected readonly faTrash = faTrash;

  deleteCard(card: string) {
    this.listCard = this.listCard.filter(item => item !== card);
    this.listCardFinish = this.listCardFinish.filter(item => item !== card);
  }

  undoCard(card: string) {
    this.listCardFinish = this.listCardFinish.filter(item => item !== card);
    this.listCard.push(card);
  }

  deletePrestataire(prestataire: Prestataire) {
    this.listPrestataire = this.listPrestataire.filter(item => item !== prestataire);
  }

  addPrestataire(nom: string, contact: string, prix: string) {
    if ((!this.checkInputNotEmpty(nom) && !this.checkInputNotEmpty(contact))) return;
    this.listPrestataire.push(new Prestataire(nom, contact, parseInt(prix.toString())));
  }

  getRandomImageStyle() {
    const randomNumber = Math.floor(Math.random() * 21) + 1;
    return `url('../../assets/image${randomNumber}.jpg')`;
  }
}
