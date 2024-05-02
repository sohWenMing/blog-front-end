import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'
import axios from 'axios'


export default function Landing() {
    const navigate = useNavigate();
    useEffect(() => {
        async function checkUserLoggedIn() {
            try {
                const response = await axios.get('http://localhost:3000/', {withCredentials: true});
                if(response.status === 200) {
                    navigate('/blog_posts');
                }
                else {
                    throw new Error;
                }
            }
            catch(error) {
                navigate('/loginForm');
            }
        }
        checkUserLoggedIn();
    }, [])
    
}