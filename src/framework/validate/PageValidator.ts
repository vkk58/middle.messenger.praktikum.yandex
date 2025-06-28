import ValidateProfilePage from '../../pages/profilePage/validate';
import ValidateRegistrationPage from '../../pages/registrationPage/validate';
import ValidateStartPage from '../../pages/startPage/validate';

export default class PageValidator{    
    public validate(page:string, name?: string): boolean{    
        debugger;
        let validClass: any;
        let ret: boolean;
        switch(page){
            case "startPage" :
                validClass = new ValidateStartPage(name); 
                break;    
            case "registrationPage" :
                validClass = new ValidateRegistrationPage(name);
                break;  
            case "profilePage" :
                validClass = new ValidateProfilePage(name);
                break;  
            default:
                return true;
        }  
        
        if(name) {
            ret = validClass.validateInput();  
        }
        else {
            ret = validClass.validateInputs(); 
        }

        return ret;
    }
}