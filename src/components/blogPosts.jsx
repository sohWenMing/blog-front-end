import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Post from './blogpost_widgets/post'
import Loader from './widgets/loader'
import localStorageUtils from '../../utils/helpers/localStorageUtils';
import baseURL from '../../utils/config';




export default function BlogPosts() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    
    useEffect(() => {
        async function getPosts() {
            try {
                const { data } = await axios.get(`${baseURL}/api/blog`, {withCredentials: true})
                console.log("data: ", data);
                setPosts(data.postJsonArray);
                setUsername(data.username);
                setDataLoaded(true);
                const userData = localStorageUtils.getItem('userData');
                console.log('userData: ', userData)

          
            }
            catch(error) {
                console.error("error: ", error.response);
                if(error.response.status === 500 || error.response.status === 401) {
                    navigate('/loginForm');
                }
                
            } 
        }
        setTimeout(() => {
            getPosts();
        }, 1000)
        
    }, []);

    useEffect(() => {
        console.log("dataLoaded: ", dataLoaded)
    }, [dataLoaded])

   return (
    <>
        {dataLoaded && <h1>{username} is logged in.</h1>}
        <div className="blogposts-list">
        {posts.length !== 0 &&
            <ul>
            {posts.map((post) => {
                console.log("postId: ", post.id)
                return (   
                <li key={post.id}><Post title={post.title} url={post.url} author={post.author}/></li>
                )
            })}
            </ul> 
        }
        {!dataLoaded && <Loader />}
        </div>
    </>
   )

}