export default class CommonValidator {
  protected name?: string;

  protected error: string;

  protected errorTxt: string;

  protected check: boolean;

  protected button: HTMLButtonElement;

  protected inputElement: HTMLInputElement;

  constructor(name?: string) {
    this.name = name;
  }

  public getInputList():HTMLCollectionOf<HTMLInputElement> {
    const inputElements = document.getElementsByTagName('input');

    return inputElements;
  }

  protected createErrorText(): void {
    if (document.getElementById(`error_${this.name}`)) {
      return;
    }
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = this.errorTxt;
    errorElement.id = `error_${this.name}`;
    this.inputElement?.after(errorElement);
    this.inputElement?.classList.add('input-error');
    if (this.button) {
      this.button.disabled = true;
    }
  }

  protected deleteErrorText(): void {
    const errorElement = document.getElementById(`error_${this.name}`);
    if (errorElement) {
      errorElement.remove();
    }
    if (this.button) {
      this.button.disabled = false;
    }
  }

  public setupErrorText() {
    if (this.check) {
      this.deleteErrorText();
    } else {
      this.createErrorText();
    }
  }

  public checkLength(inputValue:string, minLength: number, maxLength: number): boolean {
    return (inputValue.length < minLength || inputValue.length > maxLength) ? true : false;
  }
}
