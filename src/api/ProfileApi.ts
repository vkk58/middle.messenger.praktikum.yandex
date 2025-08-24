import HTTPTransport from "../framework/HTTPTransport"


const URLResources = "https://ya-praktikum.tech/api/v2/resources";

export default class ProfileApi extends HTTPTransport
{
    async getuserInfo() {                  
        let el: HTMLInputElement;
        let avatarElement: HTMLImageElement;
        let result = false;
        
        try
        {
            let answer = await this.get("/auth/user");      
            let profileValue = JSON.parse(answer.response);
            
            if(answer.status < 400)
            {

                el = document.getElementById('first_name') as HTMLInputElement;
                el.value = profileValue.first_name;
                el = document.getElementById('second_name') as HTMLInputElement;
                el.value = profileValue.second_name;
                el = document.getElementById('login') as HTMLInputElement;
                el.value = profileValue.login;
                el = document.getElementById('display_name') as HTMLInputElement;
                el.value = profileValue.display_name;
                el = document.getElementById('email') as HTMLInputElement;
                el.value = profileValue.email;
                el = document.getElementById('phone') as HTMLInputElement;
                el.value = profileValue.phone;
                
                avatarElement = document.getElementsByTagName("img")[0] as HTMLImageElement;
                avatarElement.src = URLResources + profileValue.avatar;
            }
            else
            {
                console.log(profileValue.reason);
            }
        }
        catch (error) {
            console.log(error);
            return false;
        }

        return result;
    }

    async changeAvatar() {    
        debugger;
        const fileInput = document.getElementById('avatar') as HTMLInputElement;
        
        if (fileInput && !fileInput.files?.[0]) {
            alert('Выберите файл');
            return;
        }

        const formData = new FormData();
        if(fileInput.files)
        {
            formData.append('avatar', fileInput.files[0]);
        }

        try
        {
            this.put('/user/profile/avatar', {data: formData});
        }
        catch (error) {
            console.log(error);
        }
    }

    async logout() {
        let result = false;

        try
        {

            let answer = await this.get('/auth/logout')
                                                                
            if(answer.status < 400)
            {
                result = true;
            }
        } 
        catch (error) {
            console.log(error);
            return false;
        }

        return result;
    }
}
