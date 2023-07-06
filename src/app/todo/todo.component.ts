import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from "@angular/forms";
import {faPlus, faCheck, faTrash, faPencil} from '@fortawesome/free-solid-svg-icons';
import {Categorie} from "../models/Categorie";
import {CategoryService} from "../services/category.service";

function search(text: string, categories: Categorie[]): Categorie[] {
  if (!categories) {
    return [];
  }
  const term = text.toLowerCase().trim();
  if (term.length > 0) { // Vérifie la longueur du terme de recherche
    categories.forEach((category) => {
      category.isVisible = category.name.toLowerCase().includes(term) || category.priority.toLowerCase().includes(term);
    });
  } else {
    categories.forEach((category) => {
      category.isVisible = true; // Réinitialise la visibilité si le terme de recherche est vide
    });
  }
  return categories;
}


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @ViewChild('addInput', {static: false})
  addInput!: ElementRef<HTMLInputElement>;

  constructor(private categorieService: CategoryService) {
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
    this.getAllCategories()
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
      this.categorieService.create({name: category.name, priority: category.priority, state: category.state})
        .subscribe();
      this.categories$.next(this.filteredCategories);
      this.addInput.nativeElement.value = '';
      this.valueSelected = 'Faible';
    }
  }

  changeState(category: Categorie) {
    category.changeState();
    this.categorieService.update(category.id, {name: category.name, priority: category.priority, state: category.state})
      .subscribe();
  }

  deleteCategory(category: Categorie) {
    category.changeDeleteMode();
    this.categorieService.delete(category.id).subscribe();
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
    this.categorieService.update(category.id, {name: category.name, priority: category.priority, state: category.state})
      .subscribe();
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

  getAllCategories() {
    //{id: 2, name: 'test', priority: 'urgent', state: true}
    this.categorieService.getAll().subscribe((res: {
      response:
        [{ id: number; name: string, priority: string, state: boolean }]
    }) => {
      for (let i = 0; i < res.response.length; i++) {
        let category = new Categorie(res.response[i].name, res.response[i].priority);
        category.id = res.response[i].id;
        category.state = res.response[i].state;
        this.filteredCategories.push(category);
        this.categories$.next(this.filteredCategories);
      }
    });
  }
}
