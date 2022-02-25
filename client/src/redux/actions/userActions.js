import axios from "axios";
import * as actionTypes from "./actionTypes";

export const getSessionSuccess = (session) => {
    return {
        type: actionTypes.GET_SESSION_SUCCESS,
        payload: session,
    };
};

export const getSession = () => {
    return async function (dispatch) {
        try {
            const session = await axios({
                method: "GET",
                url: "http://localhost:5000/user/",
                withCredentials: true,
                crossDomain: true,
            });

            return dispatch(getSessionSuccess(session.data));
        } catch (err) {
            console.log(err);
        }
    };
};
export const getUserSuccess = (res) => {
    return {
        type: actionTypes.GET_USER_SUCCESS, payload: res.data
    }
}
export const getUser = (id) => {
    const userId = id
    return async function (dispatch) {
        try {
            const res = await axios({
                url: "http://localhost:5000/user/getUserById/" + userId,
                method: "GET",
                withCredentials: true,
            });
            return dispatch(getUserSuccess(res))
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };
};
export const getCompaniesSuccess = (companies) => {
    return {
        type: actionTypes.GET_COMPANIES_SUCCESS,
        payload: companies
    }
}
export const getCompanies = () => {
    return async function (dispatch) {
        try {
            const res = await axios({
                url: "http://localhost:5000/user/getStores",
                method: "GET",
                withCredentials: true,
            });
            return dispatch(getCompaniesSuccess(res.data))
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
}