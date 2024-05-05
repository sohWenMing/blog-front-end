import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'
import axios from 'axios'
import baseURL from "../../utils/config";


export default function Landing() {
    const navigate = useNavigate();
    useEffect(() => {
        async function checkUserLoggedIn() {
            try {
                const response = await axios.get(baseURL, {withCredentials: true});
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