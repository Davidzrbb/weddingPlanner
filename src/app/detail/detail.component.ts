import {Component} from '@angular/core';
import {faBackward, faCheck, faTrash, faUndo} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  backward = faBackward;
  check = faCheck;
  trash = faTrash;
  undo = faUndo;
  inputValue: string = "";
  listCard: string[] = [];
  listCardFinish: string[] = [];

  constructor() {
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
}
