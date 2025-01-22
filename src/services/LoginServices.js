import axios from 'axios';

async function login(username, password){
    const loginData = {
        username: username,
        password: password,
    };

    try{
        const response = await axios.post('http://localhost:8100/api/auth/login', loginData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        localStorage.setItem("user", loginData.username);

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
        }
        return e;
    }
}

function logout(){
    localStorage.clear();
    window.location.href = "/login";
}

export default login;