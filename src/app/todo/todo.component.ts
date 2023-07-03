import {Component, ElementRef, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from "@angular/forms";
import {faPlus, faCheck, faTrash, faPencil} from '@fortawesome/free-solid-svg-icons';
import {Categorie} from "../models/Categorie";

function search(text: string, categories: Categorie[]): Categorie[] {
  if (categories === undefined) {
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
export class TodoComponent {
  @ViewChild('addInput', {static: false})
  addInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.categories$ = new BehaviorSubject<Categorie[]>([]);
    this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => search(text, this.categories)),
    ).subscribe((filteredCategories) => {
      this.categories$.next(filteredCategories);
    });
  }

  categories: Categorie[] = [];
  categories$: BehaviorSubject<Categorie[]>;
  filter = new FormControl('', {nonNullable: true});
  valueSelected: string = "Faible";
  plus = faPlus;
  check = faCheck;
  trash = faTrash;
  pencil = faPencil;


  selectValue(value: string) {
    this.valueSelected = value;
  }

  addCategories(value: string) {
    if (value.trim() != "") {
      let category = new Categorie(value, this.valueSelected.toLowerCase());
      this.categories.push(category);
      this.categories$.next(this.categories); // Mettre à jour l'Observable avec les nouvelles catégories
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
      this.categories = this.categories.filter((cat) => cat !== category);
      this.categories$.next(this.categories);
    }, 1000);
  }


  editedCategory(category: Categorie) {
    category.changeEditMode();
  }

  updateCategory(category: Categorie, name: string, priority: string) {
    category.name = name;
    category.priority = priority;
    //TODO: update category in database
    this.editedCategory(category);
  }
}
