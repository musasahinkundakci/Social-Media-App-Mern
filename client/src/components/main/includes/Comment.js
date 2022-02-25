import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Comment = ({
  post,
  comments,
  checker,
  comment,
  setComment,
  setChecker,
  checkerInput,
  getComments,
  session,
}) => {
  const [replyChecker, setReplyChecker] = useState(false);
  const [reply, setReply] = useState('');
  const [parentCommentId, setParentCommentId] = useState('');
  const [tag, setTag] = useState('');
  const likeComment = async (commentId) => {
    axios({
      url: 'http://localhost:5000/comment/likeComment',
      method: 'POST',
      withCredentials: true,
      data: { commentId },
    })
      .then(() => {
        setChecker(false);
        getComments();
      })
      .catch((err) => console.log(err));
  };
  const unLikeComment = async (commentId) => {
    axios({
      url: 'http://localhost:5000/comment/unLikeComment',
      method: 'POST',
      withCredentials: true,
      data: { commentId },
    })
      .then(() => {
        setChecker(false);
        getComments();
      })
      .catch((err) => console.log(err));
  };
  const likeReplyComment = async (commentId) => {
    axios({
      url: 'http://localhost:5000/comment/likeReplyComment',
      method: 'POST',
      withCredentials: true,
      data: { commentId },
    })
      .then(() => {
        setChecker(false);
        getComments();
      })
      .catch((err) => console.log(err));
  };
  const unLikeReplyComment = async (commentId) => {
    axios({
      url: 'http://localhost:5000/comment/unLikeReplyComment',
      method: 'POST',
      withCredentials: true,
      data: { commentId },
    })
      .then(() => {
        setChecker(false);
        getComments();
      })
      .catch((err) => console.log(err));
  };
  const addComment = async (e) => {
    e.preventDefault();

    axios({
      url: 'http://localhost:5000/comment/' + post._id,
      method: 'POST',
      withCredentials: true,
      data: { message: comment },
    })
      .then((res) => {
        getComments();
      })
      .catch((err) => console.log(err));
  };
  const addReplyComment = async (e) => {
    e.preventDefault();

    axios({
      url: 'http://localhost:5000/comment/replyComment',
      method: 'POST',
      withCredentials: true,
      data: {
        message: reply,
        parentCommentId,
        tag,
      },
    })
      .then((res) => {
        setTag('');
        getComments();
      })
      .catch((err) => console.log(err));
  };
  const showComments = () => {
    return (
      <div>
        <div className="comment-expand" onClick={() => setChecker(false)}>
          Yorumları gizle...
        </div>
        {comments.map((comment) => {
          return (
            <div key={comment._id}>
              {' '}
              <div className="card " style={{ border: 'none' }}>
                <div className="card-body">
                  <div className="card-text">
                    {' '}
                    <Link
                      style={{
                        fontWeight: 600,
                        color: '#242424',
                        textDecoration: 'none',
                      }}
                      to={'/user/' + post.postedBy._id}
                    >
                      {comment.author.name}
                    </Link>{' '}
                    {comment.message}
                  </div>
                  <div style={{ textAlign: 'end' }}>
                    <span
                      class={
                        comment.likes.includes(session.user._id)
                          ? 'badge bg-danger me-1'
                          : 'badge bg-secondary me-1'
                      }
                      onClick={
                        comment.likes.includes(session.user._id)
                          ? () => unLikeComment(comment._id)
                          : () => likeComment(comment._id)
                      }
                    >
                      Beğen
                    </span>
                    <span
                      class="badge bg-primary"
                      onClick={() => {
                        //hata çıkarsa || yap
                        setReplyChecker(!replyChecker);
                        setParentCommentId(comment._id);
                        setTag(comment.author.name);
                      }}
                    >
                      Yanıtla
                    </span>
                  </div>
                </div>

                {comment.replies && comment.replies.length > 0
                  ? comment.replies.map((reply) => {
                      return (
                        <div
                          key={reply._id}
                          className="card col-11"
                          style={{ marginLeft: 'auto', border: 'none' }}
                        >
                          <div className="card-body">
                            <div className="card-text">
                              {' '}
                              <span
                                style={{
                                  fontWeight: 600,
                                  color: '#242424',
                                }}
                              >
                                <Link
                                  className="me-1 text-dark"
                                  style={{ textDecoration: 'none' }}
                                  to={'/user/' + reply.author._id}
                                >
                                  {reply.author.name}
                                </Link>
                                {reply.tag ? (
                                  <Link
                                    style={{ color: '#3F72AF' }}
                                    to={'/user/' + reply.tagId}
                                  >
                                    {console.log('Here+', reply)}@{reply.tag}
                                  </Link>
                                ) : (
                                  ''
                                )}
                              </span>{' '}
                              {reply.message}
                            </div>
                            <div style={{ textAlign: 'end' }}>
                              <span
                                class={
                                  reply.likes.includes(session.user._id)
                                    ? 'badge bg-danger me-1'
                                    : 'badge bg-secondary me-1'
                                }
                                onClick={
                                  reply.likes.includes(session.user._id)
                                    ? () => unLikeReplyComment(reply._id)
                                    : () => likeReplyComment(reply._id)
                                }
                              >
                                Beğen
                              </span>
                              <span
                                class="badge bg-primary"
                                onClick={() => {
                                  setReplyChecker(!replyChecker);
                                  setParentCommentId(comment._id);
                                  setTag(reply.author.name);
                                }}
                              >
                                Yanıtla
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : ''}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {Array.isArray(comments) && comments.length > 0 ? (
        checker ? (
          showComments()
        ) : (
          <div onClick={() => setChecker(true)} className="comment-expand">
            {comments.length} yorumun tümünü gör.
          </div>
        )
      ) : (
        'Yorum yok'
      )}
      {checkerInput ? (
        <form class="mt-3 input-group" onSubmit={addComment}>
          <input
            type="text"
            class="form-control"
            placeholder="Yorum yaz..."
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            type="submit"
            class="fas fa-paper-plane input-group-text"
            style={{ color: '#3498db' }}
          />
        </form>
      ) : (
        ''
      )}
      {replyChecker ? (
        <form class="mt-3 input-group" onSubmit={addReplyComment}>
          <input
            type="text"
            class="form-control"
            placeholder="Cevap yaz..."
            onChange={(e) => setReply(e.target.value)}
          />

          <button
            type="submit"
            class="fas fa-paper-plane input-group-text"
            style={{ color: '#3498db' }}
          />
        </form>
      ) : (
        ''
      )}
    </>
  );
};

export default Comment;
