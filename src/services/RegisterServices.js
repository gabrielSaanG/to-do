import axios from 'axios';

async function registerServices(email, username, password){
    const registerData = {
        email: email,
        username: username,
        password: password,
    };

    try{
        console.log(registerData);
        const response = await axios.post('http://localhost:8100/api/auth/register', registerData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        localStorage.setItem("user", registerData.username);

        if(response.status == 200 ){
            console.log("User logged in");
            window.location.href = "/main";
        } else{
            console.log("Login failed");
        }

        return response;
    } catch(e){
        if (e.response && e.response.status === 401){
            console.log('Error 401: Unauthorized');
        } else {
            console.log("Solicitation Error", e);
        }

        return e.response;
    }
}

function logout(){
    localStorage.clear();
    window.location.href = "/login";
}

export default registerServices;