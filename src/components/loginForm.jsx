import InputWidget from "./widgets/inputWidget"
import { useState , useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import localStorageUtils from "../../utils/helpers/localStorageUtils";
import axios from 'axios'
import baseURL from "../../utils/config";
const isDEV = import.meta.env.DEV
export default function LoginForm() {
    const navigate = useNavigate();
    console.log('baseURL: ', baseURL);
    console.log('ISDEV: ', isDEV);
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
            const response = await axios.post(`${baseURL}/login`, {
                username: username,
                password: password
            },{withCredentials: true})
            console.log(response);
            if(response.status === 200) {
                setisLoggedIn(true);
                const userDataReponse = {
                    userId: response.data.userId,
                    username: response.data.username
                }
                localStorageUtils.setItem("userData", userDataReponse);
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
            <InputWidget inputType="password" inputName="password" labelText="Password" placeholderText="Enter Password" changeCallBack={setPassword} />
            <div className="display-flex justify-content-center">
                <button>Submit</button>
            </div>

        </form>
        </div>
    )
}