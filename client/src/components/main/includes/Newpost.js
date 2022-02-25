import React, {useEffect} from 'react';
import './css/newpost.css';
import axios from 'axios';
import {connect} from 'react-redux';
import * as postActionCreators from '../../../redux/actions/postActions';
import {bindActionCreators} from 'redux';
import {useState} from 'react';

const Newpost = ({...props}) => {
    const [images, setImages] = useState(['default.png']);
    const [localImages, setLocalImages] = useState([]);
    const [body, setBody] = useState();
    const clickButton = (e) => {
        document.getElementById('selectImage').click();
    };
    const onChangeImages = (files) => {
        let arr = [];
        let arrLoc = [];
        for (let i = 0; i < files.length; i++) {
            let a = URL.createObjectURL(files[i]);
            arrLoc.push(a);
            arr.push(files[i]);
            console.log(a);
        }

        setLocalImages(
            arrLoc
        );
        console.log(localImages);
        setImages(arr);
    };
    const SubmitHandler = async (e) => {
        e.preventDefault();
        var formData = new FormData();
        for (const key of Object.keys(images)) {
            formData.append('images', images[key]);
            console.log(images[key]);
        }
        formData.append('body', body);

        try {
            const res = await axios({
                url: 'http://localhost:5000/post/add',
                method: 'POST',
                data: formData,
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            props.actions.getPosts();
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <div class="mb-3">
                <form>
                    {' '}
                    <div className="addPost text-center" style={{width: '32rem'}}>
                        {' '}
                        <h3 className="mb-3" style={{color: "#393E46"}}>Yeni Post Ekle</h3>
                        <div className="card">
                            <div className="card-body">{localImages.length > 0 ? localImages.map((address) => {
                                return (
                                    <>
                                        <a target="_blank" href={address}> <img src={address}
                                                                                className="newPostImage"
                                                                                style={{}}/></a>
                                    </>
                                );
                            }) : <img src="/images/default.png"/>}  </div>
                        </div>
                        <br/>
                        <label for="formFile" class="form-label">
                            Resim Yüklemek için
                        </label>
                        <br/>
                        {localImages.map((image) => {
                        })}
                        <input
                            class="form-control mb-4"
                            type="file"
                            multiple
                            id="selectImage"
                            style={{display: 'none'}}
                            onChange={(e) => {
                                onChangeImages(e.target.files);
                            }}
                        />
                        <span
                            class="badge mb-3"
                            type="button"
                            onClick={() => clickButton()}
                            style={{backgroundColor: "#00ADB5"}}
                        >
                            Resim Seç
                        </span>
                        <br/>
                        <label for="content" class="form-label">
                            Açıklama
                        </label>
                        <input
                            class="form-control"
                            type="text"
                            onChange={(e) => setBody(e.target.value)}
                        />
                        <span
                            type="submit"
                            className="badge mt-4"
                            style={{backgroundColor: "#00ADB5"}}
                            onClick={SubmitHandler}

                        >
                            Post Ekle
                        </span>
                    </div>
                </form>
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
            getPosts: bindActionCreators(postActionCreators.getPosts, dispatch),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Newpost);
