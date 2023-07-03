export class ErrorMessage {
  error: boolean = false;
  message: string = "";

  constructor(error: boolean, message: string) {
    this.error = error;
    this.message = message;
  }
}
