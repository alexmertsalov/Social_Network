import React from 'react';
import cl from './ProfileInfo.module.css';
import Preloader from '../common/Preloader/Preloader';
import sad from '../../assets/images/sad.png';
import happy from '../../assets/images/happy.png';
import { useState } from 'react';

const ProfileInfo = React.memo((props) => {
    let inst = 'https://www.flaticon.com/svg/static/icons/svg/1051/1051364.svg';
    let vk = 'https://www.flaticon.com/svg/static/icons/svg/1051/1051359.svg';
    let face = 'https://www.flaticon.com/svg/static/icons/svg/1051/1051360.svg';
    let git = 'https://www.flaticon.com/svg/static/icons/svg/1051/1051377.svg';
    let [editMode, changeEditMode] = useState(false);
    let [photoFile, changePhotoFile] = useState('');
    if (!props.profileData) {
        return <Preloader />
    }
    let choosePhotoEdition = () => {
        changeEditMode(true);
    }
    let choosedPhoto = (file) => {
        changePhotoFile(file);
    }
    let uploadPhoto = () => {
        props.uploadPhoto(photoFile);
        changeEditMode(false);
    }
    
    return (
        <div className={cl.content}>
            
            <div className={cl.description}>
              <div className={cl.name}>{props.profileData.fullName}</div>  
              <div className={cl.avatar}>
                {editMode
                        ? (<div >
                            <input type="file" accept="image/*" onChange={(e) => choosedPhoto(e.target.files[0])} />
                            <input onClick={uploadPhoto} type="button" value='Upload'/>
                    </div> )
                        : <img  src={props.profileData.photos.small ? props.profileData.photos.small : 'https://static.wikia.nocookie.net/discord-wikia/images/5/5e/Default.png/revision/latest/scale-to-width-down/340?cb=20191215094354&path-prefix=ru'} alt="avatar" onDoubleClick={choosePhotoEdition} />
                        }
              </div>
            <div >
                <ul className={cl.social}>
                   {props.profileData.contacts.instagram ? <a href={props.profileData.contacts.instagram}><img className={cl.socialNetworks} src={inst}></img></a> : ''}    
                   {props.profileData.contacts.vk ? <a href={props.profileData.contacts.vk}><img className={cl.socialNetworks} src={vk}></img></a>   : ''}
                   {props.profileData.contacts.vk ? <a href={props.profileData.contacts.facebook}><img className={cl.socialNetworks} src={face}></img></a>   : ''}
                   {props.profileData.contacts.github ? <a href={props.profileData.contacts.facebook}><img className={cl.socialNetworks} src={git}></img></a>   : ''}
                </ul>
             </div>   
            </div>

        </div>
    );
});

export default ProfileInfo;