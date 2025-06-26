export default class CommonValidator {
    protected button:HTMLButtonElement;
    protected inputElement: HTMLInputElement; 
    public getInputList():HTMLCollectionOf<HTMLInputElement> {
        const inputElements = document.getElementsByTagName('input');

        return inputElements;
  }

  public initButton(): void{}

  protected createErrorText(id: string, errorTxt: string): void {
    if(document.getElementById('error_' + id)){
        return;
    }
    const errorElement          = document.createElement('div');
    errorElement.className      = 'error-message';
    errorElement.textContent    = errorTxt;
    errorElement.id             = 'error_' + id;
    this.inputElement?.after(errorElement);
    this.inputElement?.classList.add('input-error'); 
    if(this.button){ 
        this.button.disabled = true;
    }
  }

  protected deleteErrorText(id: string): void{
    const errorElement          = document.getElementById('error_' + id);
    if(errorElement){
        errorElement.remove();
    }
    if(this.button){ 
        this.button.disabled = false;
    }
  }
}
