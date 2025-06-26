import CommonValidator from "../../framework/validate/CommonValidate";

export default class ValidateStartPage extends CommonValidator{

    override initButton(): void {
        this.button    = document.getElementById('signIn') as HTMLButtonElement;
    }

    public validateInput(name: string):boolean {
        let   check    = true;
        let   errorTxt = '';
        
        this.inputElement       = document.getElementById(name) as HTMLInputElement;        
        let counter             = this.inputElement.value.length;
        if(counter === 0)
        {
            check         = false;
            errorTxt    = "Поле обязательно для заполнения";
        }

        if(check){
            this.deleteErrorText(name);
        } else{
            this.createErrorText(name, errorTxt);
        }

        return check;
    }

    public validateInputs(){
        let inputElements   = this.getInputList();
        let ret             = true;
        let counter         = inputElements.length;

        while(counter != 0)
        {
            counter--;
            ret = this.validateInput(inputElements.item(counter)?.name as string) && ret;
        }

        if(!ret){
            this.button.disabled = true;
        }

        return ret;
  }
}