import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'

export default function Landing() {
    let navigate = useNavigate();
    useEffect(() => {
        navigate('/loginForm')
    }, [])
}