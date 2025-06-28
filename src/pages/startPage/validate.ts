import CommonValidator from "../../framework/validate/CommonValidate";

export default class ValidateStartPage extends CommonValidator{

    initButton(id:string): void {
        this.button    = document.getElementById(id) as HTMLButtonElement;
    }

    public validateInput():boolean {
        this.check    = true;
        this.errorTxt = '';
        
        if(!this.name)
            return this.check;

        this.inputElement       = document.getElementById(this.name) as HTMLInputElement;        
        let counter             = this.inputElement.value.length;
        if(counter === 0)
        {
            this.check         = false;
            this.errorTxt    = "Поле обязательно для заполнения";
        }

        this.setupErrorText();

        return this.check;
    }

    public validateInputs(){
        let inputElements   = this.getInputList();
        let ret             = true;
        let counter         = inputElements.length;

        while(counter != 0)
        {
            counter--;
            this.name = inputElements.item(counter)?.name;
            ret = this.validateInput() && ret;
        }

        if(!ret){
            this.button.disabled = true;
        }

        return ret;
  }
}