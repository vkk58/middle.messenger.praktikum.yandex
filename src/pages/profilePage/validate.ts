import ValidateRegistrationPage from "../registrationPage/validate";

export default class ValidateProfilePage extends ValidateRegistrationPage{

    initButton(id:string): void {
        this.button    = document.getElementById(id) as HTMLButtonElement;
    }

    public validateInput():boolean {
        debugger;       
        if(!this.name)
            return true;

        this.check = super.validateInput();

        if(this.check === true){  
            let inputValue = this.inputElement.value;      
            switch(this.name)
            {
                case "oldPassword":
                case "newPassword":
                    if(inputValue.length > 8 
                    || inputValue.length < 40
                    || /[A-Z]/.test(inputValue) === false
                    || /[0-9]/.test(inputValue) === false){
                        this.check    = false;
                        this.errorTxt = "Условия не соблюдены: от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра";                    
                    }
                    break;
            }
        }
        
        this.setupErrorText();

        return this.check;
    }
}
