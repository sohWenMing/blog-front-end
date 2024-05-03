import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Post from './blogpost_widgets/post'

export default function BlogPosts() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        async function getPosts() {
            try {
                const response = await axios.get('http://localhost:3000/api/blog', {withCredentials: true})
                console.log("response: ", response);
                setPosts(response.data);
                
                
            }
            catch(error) {
                console.error("error: ", error.response);
                if(error.response.status === 500 || error.response.status === 401) {
                    navigate('/loginForm');
                }
                
            } 
        }
        getPosts();
    }, []);

    useEffect(() => {
        console.log("posts after load: ", posts);

    }, [posts])

   return (
    <>
    <ul>
    {posts.map((post) => {
        console.log("postId: ", post.id)
        return (
            <>
           {<li key={post.id}><Post title={post.title}/></li>}
            </>
           
        
        )
    })}
    </ul> 
    </>
   )

}