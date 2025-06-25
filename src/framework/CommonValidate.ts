import ValidateStartPage from "../pages/startPage/validate";


export default class CommonValidator {
    public validateInputs(pageName: string):boolean {
        let ret = true;
        let counter: number;
        debugger;
        const inputElements = document.getElementsByTagName('input');
        switch(pageName)
        {
            case "startPage":
                let validator = new ValidateStartPage();
                counter = inputElements.length    
                while(counter != 0)
                {
                    counter--;
                    ret = validator.validateInput(inputElements.item(counter)?.name as string) && ret;
                }
            break;
        }

        return ret;
  }
}