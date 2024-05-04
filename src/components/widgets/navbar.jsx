import { Outlet , useNavigate } from "react-router-dom"
import localStorageUtils from "../../../utils/helpers/localStorageUtils";
import axios from "axios";

export default function Navbar() {
    const navigate = useNavigate();
    async function handleCLick() {
        localStorageUtils.removeItem('userData');
        const response = await axios.get('http://localhost:3000/login/logout', {withCredentials:true});
        console.log('response: ', response);
        navigate('/loginForm');
    }
    return (
        <>
        <nav className='navbar'>
            <div className='logo'>
                <img src="https://png.pngtree.com/png-clipart/20201208/original/pngtree-red-and-black-logo-png-image_5517319.jpg" alt="logo" />
            </div>
            <div className='logout' onClick={handleCLick}>
                <h3>Logout</h3>
            </div>   
        </nav>
        <Outlet />
        </>
    )
}