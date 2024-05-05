import InputWidget from "./widgets/inputWidget"
import { useState , useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import localStorageUtils from "../../utils/helpers/localStorageUtils";
import axios from 'axios'
import baseURL from "../../utils/config";
import ErrorBox from "./widgets/errorBox";
export default function LoginForm() {
    const navigate = useNavigate();
    
    const [ username, setUsername ] = useState("");
    const [password, setPassword ] = useState("");
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [ error, setError ] = useState(''); 
    async function handleSubmit(event) {
        try{
            event.preventDefault();
            const form = event.target;
            const password = form.querySelector("#input-password").value;
            const username = form.querySelector('#input-username').value;
            if(!password || !username) {
                setError('username and password are mandatory');
                return;
            }
            const response = await axios.post(`${baseURL}/login`, {
                username: username,
                password: password
            })
            console.log(response);
            if(response.status === 200) {
                setisLoggedIn(true);
                localStorageUtils.setItem("userData", response.data);
            }
        }
        catch(error) {
            console.log(error);
            setError(error.response.data.error ? error.response.data.error : 'An error occured. Please try again');
        }
    }

    useEffect(() => {
        console.log("IsLogged in after action: ", isLoggedIn);
        if(isLoggedIn) {
            navigate('/blog_posts');
        }

    },[isLoggedIn, navigate])

    useEffect(() => {
        if(error !== "") {
            setTimeout(() => {
                setError('');
            }, 3000);
        }

    },[error])

 

    
    return(
        <>
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
        {error !== '' && <ErrorBox message={error}/>}
        </>

    )
}