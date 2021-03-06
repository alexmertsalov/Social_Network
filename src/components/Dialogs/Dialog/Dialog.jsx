import React from 'react';
import { NavLink } from 'react-router-dom';
import cl from './Dialog.module.css';


const Dialog = (props) =>{
    
    let path = '/dialogs/' + props.id;
return (
<div className={cl.dialog}>
            <span> <img className={cl.avatar} src={props.avatar} alt='ava'/> </span>
            <NavLink to={path} className={cl.link} activeClassName={cl.active}> {props.name} </NavLink></div>);
}

export default Dialog;