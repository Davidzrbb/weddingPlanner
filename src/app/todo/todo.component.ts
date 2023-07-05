import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from "@angular/forms";
import {faPlus, faCheck, faTrash, faPencil} from '@fortawesome/free-solid-svg-icons';
import {Categorie} from "../models/Categorie";

function search(text: string, categories: Categorie[]): Categorie[] {
  if (!categories) {
    return [];
  }
  const term = text.toLowerCase().trim();
  if (term === '') {
    return categories;
  }
  return categories.filter((category) => {
    return (
      category.name.toLowerCase().includes(term) ||
      category.priority.toLowerCase().includes(term)
    );
  });
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @ViewChild('addInput', {static: false})
  addInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.categories$ = new BehaviorSubject<Categorie[]>([]);
    this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => search(text, this.filteredCategories)),
    ).subscribe((filteredCategories) => {
      this.filteredCategories = filteredCategories;
    });
  }

  ngOnInit(): void {
    this.getRandomMessage();
  }

  /*  categories: Categorie[] = [];*/
  filteredCategories: Categorie[] = [];
  categories$: BehaviorSubject<Categorie[]>;
  filter = new FormControl();

  valueSelected: string = "Faible";
  plus = faPlus;
  check = faCheck;
  trash = faTrash;
  pencil = faPencil;
  randomMessageStr: string = "";

  selectValue(value: string) {
    this.valueSelected = value;
  }

  addCategories(value: string) {
    if (value.trim() !== "") {
      let category = new Categorie(value, this.valueSelected.toLowerCase());
      this.filteredCategories.push(category);
      this.categories$.next(this.filteredCategories); // Update the BehaviorSubject with the new categories
      this.addInput.nativeElement.value = '';
      this.valueSelected = 'Faible';
    }
  }

  changeState(category: Categorie) {
    category.changeState();
  }

  deleteCategory(category: Categorie) {
    category.changeDeleteMode();
    setTimeout(() => {
      this.filteredCategories = this.filteredCategories.filter((cat) => cat !== category);
      this.categories$.next(this.filteredCategories);
    }, 900);
  }

  editedCategory(category: Categorie) {
    category.changeEditMode();
  }

  updateCategory(category: Categorie, name: string, priority: string) {
    category.name = name;
    category.priority = priority;
    // TODO: Update category in the database
    this.editedCategory(category);
  }

  randomMessage() {
    const messages = [
      "je t'aime ... :D",
      "tu es mon bout de femmes toi",
      "staive !!",
      "Je suis le site internet libere moi !",
      "coucou",
      "dooodooo",
      "J'espère que votre journée est agréable.",
      "t génante wsh",
      "y a pas wshhh",
      "13 ans c long quand meme",
      "prout",
      "titi + tata = <3",
      "Je ne suis pas un magicien, mais quand je te regarde, tout le reste disparaît."
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }

  getRandomMessage() {
    this.randomMessageStr = this.randomMessage();
  }
}
