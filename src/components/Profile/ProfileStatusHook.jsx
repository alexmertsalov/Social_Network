import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import cl from './ProfileStatus.module.css';


 let ProfileStatusHook = (props) => {
    let [editMode, changeEditMode] = useState(false);
    let [status,setStatus] = useState(props.status);


    let editStatus = () =>  changeEditMode(true);
    let onChange = (event) => setStatus(event.target.value);
    
   useEffect(() => { setStatus(props.status)},[props.status]);

    let readyStatus = () => {
        changeEditMode(false);
        props.updateStatus(status);
    }
  
        return (
            <div className={cl.content}>
                <span className={cl.status}>Status:</span>
                { 
            
                    editMode
                    ? <span className={cl.editionVersion}>
                        <input onBlur={readyStatus} autoFocus={true} type="text" value={status} onChange={onChange} ></input>
                    </span>
                    : <span >
                        <span className={cl.readyStatus} 
                        onDoubleClick={() => (!props.match.params.userId) 
                        ? editStatus() 
                        : false}>{props.status || '---------'}</span> 
                    </span>
                }

            </div>
        );
    
}

export default ProfileStatusHook;
