import {Component, OnInit} from '@angular/core';
import {faBackward, faCheck, faFloppyDisk, faTrash, faUndo} from '@fortawesome/free-solid-svg-icons';
import {Prestataire} from "../models/Prestataire";
import {WishService} from "../services/wish.service";
import {Router} from "@angular/router";
import {CategoryService} from "../services/category.service";
import {map} from "rxjs/operators";
import {CardService} from "../services/card.service";
import {PrestataireService} from "../services/prestataire.service";

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
  save = faFloppyDisk;
  inputValue: string = "";
  listCard: { id: number, name: string, state: boolean }[] = [];
  listCardFinish: { id: number, name: string, state: boolean }[] = [];
  listPrestataire: Prestataire[] = [];
  backgroundImage: string = "";
  idCategory: string | null = null;
  textAreaValue: string = "";
  isSaving: boolean = true;
  nameCategory: string = "";

  constructor(private wishService: WishService, private router: Router, private categoryService: CategoryService
    , private cardService: CardService, private prestataireService: PrestataireService) {
  }

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    this.idCategory = urlParams.get('id');

    if (!this.idCategory) {
      this.router.navigate(['/todo']);
      return;
    }

    this.getAllCategory(this.idCategory).subscribe((category) => {
      if (!category) {
        this.router.navigate(['/todo']);
        return;
      }
      this.getAllWish();
      this.getAllCard();
      this.getAllPrestataire();
      this.backgroundImage = this.getRandomImageStyle();
    });
  }

  getAllCategory(idCategory: string) {
    return this.categoryService.getAll().pipe(
      map((data) => {
        if (!data) return null;
        return data.response.find((category: {
          id: string;
          name: string;
        }) => category.id == idCategory ? this.nameCategory = category.name : null);
      })
    );
  }

  getAllWish() {
    if (!this.idCategory) return;
    this.wishService.getAll(this.idCategory).subscribe((data) => {
      if (!data.response[0]) return;
      this.textAreaValue = data.response[0].text;
    });
  }

  checkInputNotEmpty(value: string): boolean {
    return value.trim().length > 0;
  }

  addCard() {
    if (!this.checkInputNotEmpty(this.inputValue)) return;
    if (!this.idCategory) return;
    this.cardService.create({
      name: this.inputValue,
      state: false,
      fk_category: this.idCategory
    }).subscribe((data) => {
      this.listCard.push({
        id: data.response.id,
        name: this.inputValue,
        state: false
      });
      this.inputValue = this.checkInputNotEmpty(this.inputValue) ? "" : this.inputValue;
    });


  }

  changeStateCard(card: { id: number, name: string, state: boolean }) {
    this.cardService.update(card.id, {state: !card.state}).subscribe(
      () => {
        this.getAllCard()
      }
    );
  }

  deleteCard(card: { id: number, name: string }) {
    this.listCard = this.listCard.filter(item => item != card);
    this.listCardFinish = this.listCardFinish.filter(item => item != card);
    this.cardService.delete(card.id).subscribe();
  }

  deletePrestataire(prestataire: Prestataire) {
    this.listPrestataire = this.listPrestataire.filter(item => item !== prestataire);
    this.prestataireService.delete(prestataire.id!).subscribe();
  }

  addPrestataire(nom: string, contact: string, prix: string) {
    if ((!this.checkInputNotEmpty(nom) && !this.checkInputNotEmpty(contact))) return;
    if (!this.idCategory) return;
    this.prestataireService.create({
      name: nom,
      contact: contact,
      price: parseInt(prix.toString()),
      fk_category: this.idCategory
    }).subscribe(
      () => {
        this.getAllPrestataire();
      }
    );
  }

  getAllPrestataire() {
    if (!this.idCategory) return;
    this.prestataireService.getAll(this.idCategory).subscribe((data) => {
      if (!data.response) return;
      console.log(data.response)
      this.listPrestataire = data.response;
    });
  }

  getRandomImageStyle() {
    const randomNumber = Math.floor(Math.random() * 21) + 1;
    return `url('../../assets/image${randomNumber}.jpg')`;
  }

  saveWish(value: string) {
    this.isSaving = true;
    if (!this.idCategory) return;
    this.wishService.update(this.idCategory, {text: value, fk_category: this.idCategory}).subscribe();
    this.textAreaValue = value;
  }

  onTextAreaChange(value: string) {
    if (value != this.textAreaValue) {
      this.isSaving = false;
      return;
    }
    this.isSaving = true;
  }

  getAllCard() {
    if (!this.idCategory) return;
    this.cardService.getAll(this.idCategory).subscribe((data) => {
      if (!data.response) return;
      this.listCard = data.response.filter((card: { state: boolean; }) => !card.state).map((card: {
        id: number;
        name: string;
        state: boolean;
      }) => {
        return {
          id: card.id,
          name: card.name,
          state: card.state
        }
      });
      this.listCardFinish = data.response.filter((card: { state: boolean; }) => card.state).map((card: {
        id: number;
        name: string;
        state: boolean;
      }) => {
        return {
          id: card.id,
          name: card.name,
          state: card.state
        }
      });
    });
  }

}
