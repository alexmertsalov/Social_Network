import React from 'react';
import cl from './Post.module.css';

const Post = (props) => {
    return (
        <div className={cl.item}>

            <img className={cl.postPhoto} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAgrsY1Zw5553wtz3MX7Tm6FWm-1nGG-pENw&usqp=CAU" alt="avatar" />
            <span>{props.message}</span>
            <div>
    <div>Likes --&gt; {props.likes}</div>
            </div>
        </div>
    );
}

export default Post;