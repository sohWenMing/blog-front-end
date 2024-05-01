import InputWidget from "./widgets/inputWidget"
import { useState , useEffect } from 'react'
import axios from 'axios'

async function handleSubmit(event) {
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
}

export default function LoginForm() {
    const [ username, setUsername ] = useState("");
    const [password, setPassword ] = useState("");
    
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