import React, {useState, useEffect} from 'react';
import './css/standart.scss';
import {Link} from 'react-router-dom';
import Post from '../../main/includes/Post';
import {connect} from 'react-redux';
import * as userActionCreators from '../../../redux/actions/userActions';
import * as postActionCreators from '../../../redux/actions/postActions';
import {bindActionCreators} from 'redux';
import Loader from '../../common/Loader';
import Rate from "./Rate"
import LazyLoad from "react-lazyload";

const StandartProfile = ({followUser, unFollowUser, user, id, ...props}) => {
    const [hiden, setHiden] = useState(false);
    useEffect(() => {
        props.actions.getPostsById(id);
        console.log("heere", user.following);
    }, []);
    return (
        <>
            <div className="profile-container">
                <div className="profile-flex">

                    <div className="image-container">
                        {user.image ? (
                            <img
                                src={'http://localhost:5000/img/' + user.image}
                                onMouseEnter={() => setHiden(true)}
                                onMouseLeave={() => setHiden(false)}
                                alt=""
                                className="profileImage"
                            />
                        ) : (
                            <div class="spinner-border m-5" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        )}
                        <span className={hiden ? 'edit-photo' : 'hide'}>Edit Photo</span>
                    </div>

                    <Link className="username">{user ? user.name : 'empty'}</Link>
                    <div className="middlebar">
                        <div className="text-center">
                            Takip edilen
                            <br/>
                            {user.following ? user.following.length : ''}
                        </div>
                        <div className="text-center">
                            Takipçi <br/>

                            {user.followers ? user.followers.length : ''}
                        </div>
                        {' '}
                        <div className="text-center">
                            Postlar <br/>
                            {props.posts.length}
                        </div>
                    </div>
                    {/*                    <span
                        class="badge rounded-pill bg-primary"
                        style={{cursor: 'pointer', margin: '1rem 0'}}
                    >
            Profili Düzenle
          </span>   */}

                    {
                        props.session.user._id == id ? (
                            <span
                                className="badge rounded-pill bg-primary"
                                style={{cursor: 'pointer', margin: '1rem 0'}}
                            >
            Profili Düzenle
          </span>
                        ) : (
                            <div className={"my-3"}>
                                {props.session.user.following.includes(id) ? (
                                    <button className={"btn btn-danger me-2"}
                                            onClick={(e) => (unFollowUser(e, id))}>Takip
                                        Bırak</button>
                                ) : <button className={"btn btn-danger me-2"} onClick={followUser}>Takip Et</button>}
                                <button className={"btn btn-primary"}>Mesaj Gönder</button>
                            </div>
                        )
                    }

                    {' '}
                    {props.posts.length > 0 ? (
                        props.posts.map((post) => {
                            return (
                                <div key={post._id}><LazyLoad height={200} offset={100} once={true}>
                                    <Post
                                        id={id}
                                        post={post}
                                        session={props.session}
                                        getPosts={props.actions.getPosts}
                                        width="20rem"
                                        getPostsById={props.actions.getPostsById}
                                    /></LazyLoad>
                                </div>
                            );
                        })
                    ) : (
                        <Loader color="#00ADB5" speedMultiplier={1.3}/>
                    )}
                </div>
            </div>
        </>
    );
};

function mapStateToProps(state) {
    return {
        session: state.sessionReducer,
        posts: state.postReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getSession: bindActionCreators(userActionCreators.getSession, dispatch),
            getPostsById: bindActionCreators(
                postActionCreators.getPostsById,
                dispatch
            ),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StandartProfile);
