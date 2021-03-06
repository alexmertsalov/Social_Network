import { usersAPI } from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const DATA = 'SETUSERS';
const CURPAGE = 'CURPAGE';
const TOTALCOUNT = 'TOTALCOUNT';
const TOGGLE_IS_FETCHING = 'TOGGLEIF';
const FOL_IS_FETCHING = 'FOLISFETCH';

export let doFollow = (id) => ({ type: FOLLOW, id });
export let doUnfollow = (id) => ({ type: UNFOLLOW, id });
export let setUsers = (usersData) => ({ type: DATA, usersData });
export let setCurPage = (currentPage) => ({ type: CURPAGE, currentPage });
export let setTotalCount = (totalCount) => ({ type: TOTALCOUNT, totalCount });
export let toggleFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export let toggleFollowing = (followingTF, userId) => ({ type: FOL_IS_FETCHING, followingTF, userId });

let initialState = {
    usersData: [],
    currentPage: 1,
    pageSize: 90,
    totalCount: 10,
    isFetching: false,
    followingInProgress: []
};

let usersReducer = (state = initialState, action) => {


    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                usersData: state.usersData.map(u => {
                    if (u.id === action.id) {
                        return {...u, followed: true }
                    }
                    return u;
                })
            };


        case UNFOLLOW:
            return {
                ...state,
                usersData: state.usersData.map(u => {
                    if (u.id === action.id) {
                        return {...u, followed: false }
                    }
                    return u;
                })
            };
        case DATA:
            return {
                ...state,
                usersData: [...action.usersData]
            };
        case CURPAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case TOTALCOUNT:
            return {
                ...state,
                totalCount: action.totalCount
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case FOL_IS_FETCHING:

            let state02 = {
                ...state,
                followingInProgress: [...state.followingInProgress]
            };

            action.followingTF ?
                state02.followingInProgress.push(action.userId) :
                state02.followingInProgress = state02.followingInProgress.filter(userId => userId !== action.userId);

            return state02;

        default:
            return state;
    }
}

export const setUsersThunk = (currentPage, pageSize) => async(dispatch) => {
    dispatch(toggleFetching(true));
    let data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(toggleFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalCount(data.totalCount));
}
export const changeCurPageThunk = (page, pageSize) => async(dispatch) => {
    dispatch(setCurPage(page));
    dispatch(toggleFetching(true));
    let data = await usersAPI.changeCurPage(page, pageSize)

    dispatch(toggleFetching(false));
    dispatch(setUsers(data.items));
}

export const unFollowThunk = (userId) => async(dispatch) => {

    dispatch(toggleFollowing(true, userId));
    let data = await usersAPI.unFollowDeleteRequest(userId);
    data.resultCode === 0 && dispatch(doUnfollow(userId));
    dispatch(toggleFollowing(false, userId));
}

export const followThunk = (userId) => async(dispatch) => {

    dispatch(toggleFollowing(true, userId));
    let data = await usersAPI.followPostRequest(userId);
    data.resultCode === 0 && dispatch(doFollow(userId));
    dispatch(toggleFollowing(false, userId));
}
export default usersReducer;