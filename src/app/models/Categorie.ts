export class Categorie {
  id: number = 0;
  name: string;
  priority: string = "faible";
  state: boolean = false;
  editMode: boolean = false;
  deleteMode: boolean = false;

  constructor(name: string, state: string) {
    this.name = name;
    this.priority = state;
  }

  changeState() {
    this.state = !this.state;
  }

  changeEditMode() {
    this.editMode = !this.editMode;
  }

  changeDeleteMode() {
    this.deleteMode = !this.deleteMode;
  }
}
