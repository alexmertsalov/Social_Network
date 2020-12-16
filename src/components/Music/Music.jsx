import React from 'react';
import style from './Music.module.css';

const Music = () =>{
    return(
        <div className={style.music}>
            <div>
                Music:
            </div>
            <ul className={style.list}>
                <li> 
                    <div>The Neighbourhood</div>
                    Wiped out
                 </li>

                <li> 
                    <div>Rammstein</div>
                    Du hast
                </li>

                <li>
                    <div>PinkFloyd</div>
                    See Emily play
                </li>
            </ul>
        </div>
    );
}

export default Music;