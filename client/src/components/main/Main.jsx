import React, {useEffect, Suspense} from 'react';


import './css/main.scss';
import {connect} from 'react-redux';
import * as userActionCreators from '../../redux/actions/userActions';
import * as postActionCreators from '../../redux/actions/postActions';
import {bindActionCreators} from 'redux';
import Newpost from './includes/Newpost';
import Loader from '../common/Loader';
import NotificationWidget from '../common/NotificationWidget';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import LazyLoad from 'react-lazyload';

import Post from './includes/Post';

const Main = ({...props}) => {
    const [checked, setChecked] = React.useState(true);
    useEffect(() => {
        props.actions.getPosts();
        props.actions.getSession();
        document.title = 'Ustamsaglam | Anasayfa';
    }, []);
    return (
        <>
            <div className="main-container">
                <div className={' main-left-container'}>

                </div>
                <div className="main-post-container">
                    {' '}
                    {props.session.user ? <Newpost/> : <h1>Giriş yapmalısın! </h1>}
                    {props.posts.length > 0 ? (
                        props.session.user ? (
                            <>
                                {
                                    props.posts.map((post) => {

                                        return (
                                            <LazyLoad height={200} offset={100} once={true}>
                                                <Post
                                                    posts={props.posts}
                                                    post={post}
                                                    session={props.session}
                                                  
                                                    width="30rem"/>
                                            </LazyLoad>


                                        )
                                            ;
                                    })
                                }</>
                        ) : (
                            <div>Henüz giriş yapılmadı.</div>
                        )
                    ) : (
                        <div>
                            <Loader color="#00ADB5" speedMultiplier={1.3}/>
                        </div>
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
            getPosts: bindActionCreators(postActionCreators.getPosts, dispatch),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
