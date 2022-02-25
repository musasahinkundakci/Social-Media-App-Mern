import axios from "axios";
import * as actions from "./actionTypes";
export function getPostsSuccess(posts) {
  return {
    type: actions.GET_POSTS_SUCCESS,
    payload: posts,
  };
}
export function getPosts() {
  return async function (dispatch) {
    try {
      const posts = await axios({
        url: "http://localhost:5000/post/getPostsAll",
        method: "GET",
        withCredentials: true,
      });
      const newArr = [];
      posts.data.map((post) => newArr.push(post));

      return dispatch(getPostsSuccess(newArr));
    } catch (err) {
      console.log(err);
    }
  };
}
export function getPostsByIdSuccess(posts) {
  return {
    type: actions.GET_POSTS_BY_ID_SUCCESS,
    payload: posts,
  };
}
export function getPostsById(id) {
  return async function (dispatch) {
    axios({
      url: "http://localhost:5000/post/getPostsById/" + id,
      method: "GET",
      withCredentials: true,
    }).then((posts) => {
      console.log(posts);
      return dispatch(getPostsByIdSuccess(posts.data));
    });
  };
}
