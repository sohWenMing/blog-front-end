import InputWidget from "./widgets/inputWidget"
import { useState , useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'


export default function LoginForm() {
    const navigate = useNavigate();
    async function handleSubmit(event) {
        try{
            event.preventDefault();
            const form = event.target;
            const password = form.querySelector("#input-password").value;
            const username = form.querySelector('#input-username').value;
            if(!password || !username) {
                alert("password and username are mandatory fields");
                return;
            }
            const response = await axios.post('http://localhost:3000/login', {
                username: username,
                password: password
            },{withCredentials: true})
            console.log(response);
            if(response.status === 200) {
                setisLoggedIn(true);
            }
        }
        catch(error) {
            console.error(error);
        }

    }
    const [ username, setUsername ] = useState("");
    const [password, setPassword ] = useState("");
    const [isLoggedIn, setisLoggedIn] = useState(false);

    useEffect(() => {
        console.log("IsLogged in after action: ", isLoggedIn);
        if(isLoggedIn) {
            navigate('/blog_posts');
        }

    },[isLoggedIn, navigate])


    
    return(
        <div className="login-form-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
            <div className='header'>
                <h1>Login</h1>
            </div>
            <InputWidget inputType="text" inputName="username" labelText="Username" placeholderText="Enter Username" changeCallBack={setUsername}/>
            <InputWidget inputType="text" inputName="password" labelText="Password" placeholderText="Enter Password" changeCallBack={setPassword} />
            <div className="display-flex justify-content-center">
                <button>Submit</button>
            </div>

        </form>
        </div>
    )
}