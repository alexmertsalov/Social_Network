
const ADDMESSAGESTATE = 'ADD-MESSAGE-STATE';

export let sendMessage = (newMessageText) => ({ type: ADDMESSAGESTATE, newMessageText });
let avaDefault = 'https://img.pngio.com/miner-industrial-man-human-avatar-svg-png-icon-free-download-miner-man-png-810_980.png';
let initialState = {
    messagesData: [
        { id: 1, message: 'Today' },
        { id: 2, message: 'Will be tommorow' },
        { id: 3, message: 'Let it be' },
        { id: 4, message: 'But not today' }
    ],
    dialogsUsersData: [
        { id: 1, name: 'Ivan', ava: avaDefault },
        { id: 2, name: 'Vasya', ava: avaDefault },
        { id: 3, name: 'Petro', ava: avaDefault }
    ]
};

let idNum = 5;
let messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDMESSAGESTATE:
            idNum++;
            return {
                ...state,
                messagesData: [...state.messagesData, {
                    id: idNum,
                    message: action.newMessageText
                }]
    }
        default:
            return state;
    }
}

export default messagesReducer;