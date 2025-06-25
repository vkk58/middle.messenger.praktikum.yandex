
export default class ValidateStartPage {
    private inputElement: HTMLInputElement; 

    public validateInput(name: string):boolean {
        let   check             = true;
        let   errorTxt:string;
        const button            = document.getElementById('signIn') as HTMLButtonElement;

        
        this.inputElement       = document.getElementById(name) as HTMLInputElement;        
        let counter             = this.inputElement.value.length;
        if(counter === 0)
        {
            check         = false;
            errorTxt    = "Поле обязательно для заполнения";
        }

        if(check){
            this.deleteErrorText(name);
            button.disabled = false; 
        } else{
            this.createErrorText(name, "Поле обязательно для заполнения");
            if(button){ 
                button.disabled = true;
            }
        }

        return check;
  }

  private createErrorText(id: string, errorTxt: string): void {
    if(document.getElementById('error_' + id))
    {
        return;
    }
    const errorElement          = document.createElement('div');
    errorElement.className      = 'error-message';
    errorElement.textContent    = errorTxt;
    errorElement.id             = 'error_' + id;
    this.inputElement?.after(errorElement);
    this.inputElement?.classList.add('input-error');  
  }

  private deleteErrorText(id: string): void{
    const errorElement          = document.getElementById('error_' + id);
    if(errorElement)
    {
        errorElement.remove();
    }
  }
}