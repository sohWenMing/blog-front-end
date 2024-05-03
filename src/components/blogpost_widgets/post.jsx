export default function Post({title, url, author}) {
    return (
        <div className="blogposts-listing">
        <h3>{title}</h3>
        <div className="contents">
            <div>{author}</div>
            <div>{url}</div>
        </div>
        
        
        </div>
    )
}

