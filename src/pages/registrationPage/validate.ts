import CommonValidator from "../../framework/validate/CommonValidate";

export default class ValidateRegistrationPage extends CommonValidator{

    override initButton(): void {
        this.button    = document.getElementById('signIn') as HTMLButtonElement;
    }

    public validateInput(name: string):boolean {
        let   check         = true;
        let   errorTxt      = '';
        
        this.inputElement   = document.getElementById(name) as HTMLInputElement;     
        let inputValue      = this.inputElement.value;
        switch(name)
        {
            case "first_name":
            case "second_name":
                if(/^[A-ZА-Я][a-zA-Zа-яА-Я-]*[a-zA-Zа-яА-Я-]$/.test(inputValue) === false){
                    check    = false;
                    errorTxt = "Поле должно быть заполнено латиницей или кириллицей, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов";
                }
                break;
            case "login":
                if(inputValue.length > 3 
                || inputValue.length < 20
                || /[a-zA-Z-_]/.test(inputValue) === false
                || /[а-яА-Я-_]/.test(inputValue) === true){
                    check    = false;
                    errorTxt = "Условия не соблюдены: от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)";
                }
                break;
            case "password":
                if(inputValue.length > 8 
                || inputValue.length < 40
                || /[A-Z]/.test(inputValue) === false
                || /[0-9]/.test(inputValue) === false){
                    check    = false;
                    errorTxt = "Условия не соблюдены: от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра";                    
                }
                break;
            case "email":
                if(/^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]+$/.test(inputValue) === false){
                    check    = false;
                    errorTxt = "Условия не соблюдены: латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.";  
                }
                break;
            case "phone":
                if(inputValue.length > 10 
                || inputValue.length < 15
                || /^[0-9+][0-9]$/.test(inputValue) === false){
                    check    = false;
                    errorTxt = "Условия не соблюдены: от 10 до 15 символов, состоит из цифр, может начинается с плюса.";                    
                }
                break;
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