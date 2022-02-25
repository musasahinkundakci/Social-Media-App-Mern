import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import * as userActionCreators from "../../redux/actions/userActions";
import * as postActionCreators from "../../redux/actions/postActions"
import {bindActionCreators} from "redux";
import StandartProfile from "./includes/StandartProfile";
import CompanyProfile from "./includes/CompanyProfile";
import {useParams} from "react-router-dom";
import axios from "axios";

const Profile = ({...props}) => {
    let {id} = useParams();

    const [user, setUser] = useState("");


    const followUser = async (e) => {
        e.preventDefault()
        try {
            await axios({
                url: "http://localhost:5000/user/follow",
                method: "post",
                withCredentials: true,
                data: {
                    targetId: id,
                }

            })
            props.actions.getUser(id)
            props.actions.getSession();
        } catch (e) {
            console.log(e)
        }
    }
    const unFollowUser = async (e, id) => {

        e.preventDefault()
        try {

            const res = await axios({
                url: "http://localhost:5000/user/unFollow",
                method: "POST",
                withCredentials: true,
                data: {
                    targetId: id,
                }

            })
            console.log(res)
            props.actions.getSession();
            props.actions.getUser(id)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        document.title = "Ustamsaglam | Profil";
        props.actions.getSession();
        props.actions.getUser(id);


        console.log(user);
    }, []);

    return (
        <>
            {props.session.user ? (
                id === props.session.user._id ? ( //kendi profili için
                    props.session.user.userType === "1" ? (
                        <StandartProfile id={id} user={props.user} followUser={followUser} unFollowUser={unFollowUser}/>
                    ) : (
                        <CompanyProfile id={id} user={props.user} followUser={followUser} unFollowUser={unFollowUser}
                        />
                    )
                ) : (user && user.userType === "1" ? (
                    <StandartProfile id={id} user={props.user} followUser={followUser} unFollowUser={unFollowUser}/>
                ) : (
                    <CompanyProfile id={id} user={props.user} followUser={followUser} unFollowUser={unFollowUser}
                    />
                ))
            ) : (
                ""
            )}
        </>
    );
};

function mapStateToProps(state) {
    return {
        session: state.sessionReducer,
        user: state.userReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getSession: bindActionCreators(userActionCreators.getSession, dispatch),
            getUser: bindActionCreators(userActionCreators.getUser, dispatch)

        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
