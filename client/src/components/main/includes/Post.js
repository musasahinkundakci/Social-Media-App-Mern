import React, {useEffect, useState} from 'react';
import './css/post.css';
import {Link} from 'react-router-dom';
import generator from 'password-gen-v1';
import axios from 'axios';
import Comment from './Comment';
import LazyLoad from 'react-lazyload';
import "../css/post.scss"

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const Post = ({
                  getPostsById,
                  id,
                  width,
                  post,
                  session,
                  getPosts,
                  ...props
              }) => {
    //Sadece ilk foto iki defa basılıyor o düzelcek
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const [checker, setChecker] = useState(false);
    const [pass, setPass] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [checkerInput, setCheckerInput] = useState(false);
    const [trys, setTrys] = useState(false)
    const handleDelete = async () => {
        setAnchorEl(null);
        try {
            const res = await axios({
                method: "get",
                url: 'http://localhost:5000/post/delete/' + post._id,
                withCredentials: true
            });
            getPosts();

        } catch (e) {
            console.log(e);
        }
    }
    const getReplyComments = async (parent) => {
        return axios({
            url: 'http://localhost:5000/comment/getReplyComments',
            method: 'POST',
            withCredentials: true,
            data: {parentCommentId: parent},
        })
            .then((res) => {
                return res.data;
            })
            .catch((err) => console.log(err));
    };
    const getComments = async () => {
        try {
            const res = await axios({
                url: 'http://localhost:5000/comment/getComments',
                withCredentials: true,
                method: 'post',
                data: {postId: post._id},
            });

            setComments(
                res.data.map((comment) => {
                    getReplyComments(comment._id)
                        .then((rep) => {
                            comment.replies = rep;
                        })
                        .catch((err) => console.log(err));
                    return comment;
                })
            );
        } catch (err) {
            console.log(err);
        }
    };
    const likePost = async (e) => {
        axios({
            url: 'http://localhost:5000/post/like/' + post._id,
            method: 'get',
            withCredentials: true,
        })
            .then((res) => {

                if (res.status != "500") {
                    post.likes.push(session.user._id);

                    setTrys(!trys)
                    console.log(e.target.classList)


                    e.target.classList.add("animate__animated")
                    e.target.classList.add("animate__pulse")
                    setTimeout(() => {
                        e.target.classList.remove("animate__animated")
                        e.target.classList.remove("animate__pulse")
                    }, 1000)
                }
            })
            .catch((err) => console.log(err));
    };
    const unLikePost = async (e) => {

        axios({
            url: 'http://localhost:5000/post/unLike/' + post._id,
            method: 'get',
            withCredentials: true,
        })
            .then((res) => {
                if (res.status != "500") {
                    const index = post.likes.indexOf(session.user._id);
                    post.likes.splice(index, 1)
                    setTrys(!trys)
                    e.target.classList.add("animate__animated")
                    e.target.classList.add("animate__pulse")
                    setTimeout(() => {
                        e.target.classList.remove("animate__animated")
                        e.target.classList.remove("animate__pulse")
                    }, 1000)
                    console.log(e.target.classList)
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        setPass(generator.newPassword(10, 'abcdefghuykl'));

        getComments();

    }, []);
    return (
        <>
            <div class="card card-container" style={{width: width}} key={post._id}>

                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        {' '}
                        <Link to={'/user/' + post.postedBy._id}>
                            {' '}
                            <img
                                src={'http://localhost:5000/img/' + post.postedBy.image}
                                alt=""
                                className="post-owner-photo mx-3 my-2"
                            />
                        </Link>
                        <Link
                            to={'/user/' + post.postedBy._id}
                            style={{
                                fontWeight: '500',
                                cursor: 'pointer',
                                textDecoration: 'none',
                                color: 'black ',
                            }}
                        >
                            {post.postedBy.name}
                        </Link>
                    </div>
                    <div>
                        <i style={{fontSize: "1rem", cursor: "pointer"}} className="fas fa-bars me-3"
                           aria-controls="simple-menu"
                           aria-haspopup="true"
                           onClick={handleClick}>

                        </i>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >   {post.postedBy._id == session.user._id ?
                            <MenuItem onClick={handleDelete}>Sil</MenuItem> : ""}
                            <MenuItem onClick={handleClose}>Paylaş</MenuItem>
                            <MenuItem onClick={handleClose}>Şikayet Et</MenuItem>
                            <MenuItem onClick={handleClose}>Bağlantıyı Kopyala</MenuItem>
                        </Menu>
                    </div>
                </div>


                <div id={pass} class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        {post && post.photos.length > 0
                            ? post.photos.map((photo, index) => {
                                let loaded = false;
                                if (index === 0) {
                                    return (
                                        <div
                                            class="carousel-item active"
                                            data-bs-interval="10000"
                                        >

                                            <img
                                                src={'http://localhost:5000/img/' + photo}
                                                className={"d-block w-100 animate" + (loaded ? "hide" : "hide")}
                                                alt="..."
                                                style={{
                                                    width: width,
                                                    height: width,
                                                    objectFit: 'cover',
                                                }}
                                                onLoad={() => {
                                                    console.log(loaded)
                                                    loaded = true
                                                    console.log(loaded)
                                                }}

                                            />

                                        </div>
                                    );
                                } else {
                                    return (
                                        <div class="carousel-item">
                                            <img
                                                src={'http://localhost:5000/img/' + photo}
                                                class={"d-block w-100 animate" + (loaded ? "" : "hide")}
                                                alt="..."
                                                style={{
                                                    width: width,
                                                    height: width,
                                                    objectFit: 'cover',
                                                }} onLoad={() => {
                                                loaded = true
                                            }}
                                            />
                                        </div>
                                    );
                                }
                            })
                            : <div>
                                <img
                                    src="/images/empty-image.jpg"
                                    className={"d-block w-100 animate"}
                                    alt="..."
                                    style={{
                                        width: width,
                                        height: width,
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>}
                    </div>
                    {/*          Tek foto olanlarda ok yok*/}
                    {post.photos.length > 1 ? (
                        <>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target={'#' + pass}
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target={'#' + pass}
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </>
                    ) : ""}
                </div>
                <div class="card-body">
                    {' '}
                    <div className="card-buttons">

                        <i
                            style={{cursor: 'pointer'}}
                            class={
                                post && session.user && post.likes.includes(session.user._id)
                                    ? 'fas fa-heart  topbar red'
                                    : 'far fa-heart  topbar '
                            }
                            onClick={(e) =>
                                post.likes.includes(session.user._id) && session.user
                                    ? unLikePost(e)
                                    : likePost(e)
                            }
                        />
                        <i
                            class="far fa-comment topbar"
                            style={{cursor: 'pointer'}}
                            onClick={() => setCheckerInput(!checkerInput)}
                        />
                    </div>
                    <h5 class="card-title">
                        <Link className="card-user" to={'/user/' + post.postedBy._id}>
                            {post ? post.postedBy.name : ''}
                        </Link>
                    </h5>
                    <p class="">{post.body ? post.body : ''}</p>
                    <p style={{cursor: 'pointer'}}>
                        <LazyLoad height={200} offset={100} once={true}> <Comment
                            post={post}
                            comments={comments}
                            comment={comment}
                            getComments={getComments}
                            checker={checker}
                            setComment={setComment}
                            setChecker={setChecker}
                            checkerInput={checkerInput}
                            session={session}
                        />
                        </LazyLoad>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Post;
