import ValidateRegistrationPage from '../../pages/registrationPage/validate';
import ValidateStartPage from '../../pages/startPage/validate';

export default class PageValidator{
    public validate(page:string, name?: string): boolean{        
        let validClass: any;
        let ret: boolean;
        switch(page){
            case "startPage" :
                validClass = new ValidateStartPage() as ValidateStartPage; 
                break;  
            case "commonPage" :
                validClass = new ValidateStartPage() as ValidateStartPage; 
                break;    
            case "registrationPage" :
                validClass = new ValidateRegistrationPage() as ValidateStartPage;
                break;  
            default:
                return true;
        }  
        
        if(name) {
            ret = validClass.validateInput(name);  
        }
        else {
            ret = validClass.validateInputs(); 
        }

        return ret;
    }
}