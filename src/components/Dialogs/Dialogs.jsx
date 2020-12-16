import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm, reset } from 'redux-form';
import { authMeSuccessThunk } from '../../redux/authMe';
import { InputComp } from '../common/InputChecker/InputChecker';
import { maxLengthC, required } from '../common/Validators/Validators';
import { withAuthMe } from '../hoc/hoc';
import Dialog from './Dialog/Dialog';
import cl from './Dialogs.module.css';
import Message from './Message/Message';


const Dialogs = (props) => {

    let onSubmit = (formData,dispatch) => {
        props.sendMessage(formData.newMessageText);
        dispatch(reset('sendMessage'));
    }


    let dialogsGenerate = props.dialogsGenerate.map(d => <Dialog key={d.id} name={d.name} id={d.id} avatar={d.ava} />);
    let messagesGenerate = props.messagesGenerate.map(m => <Message key={m.id} message={m.message} />);

    return (<>
    <div className={cl.name}>Dialogs</div>
        <div className={cl.dialogs}>
            <div className={cl.dialogsItems}>
                {dialogsGenerate}
            </div>
            <div className={cl.messages}>
                {messagesGenerate}
                <SendMessageRedux onSubmit={onSubmit} />
            </div>
            
        </div>
    </>);

}



let maxLength10 = maxLengthC(10);

let SendMessage = (props) => {
    return <>
        <form className={cl.sendMessage} onSubmit={props.handleSubmit}>
            <Field name='newMessageText' type="text" validate={[required, maxLength10]} component={InputComp} />
            <button type="submit" >Send</button>
        </form>
    </>;
}

let SendMessageRedux = reduxForm({ form: 'sendMessage' })(SendMessage);


let mapStateToPropsRedirect = (state) => {
    return { isAuthMe: state.authMe.isAuthMe }
}



export default compose(
    connect(mapStateToPropsRedirect, { authMeSuccess: authMeSuccessThunk }),
    withAuthMe
)(Dialogs);

