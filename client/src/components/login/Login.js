import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActionCreators from '../../redux/actions/userActions';
const Login = ({ ...props }) => {
  useEffect(() => {
    props.actions.getSession();
    document.title = 'Ustamsaglam | Login';
  }, []);
  const history = useHistory();
  const [error, toggleError] = useState(false);
  const [success, toggleSuccess] = useState(false);
  const SubmitHandler = (e) => {
    e.preventDefault();

    axios({
      method: 'POST',
      url: 'http://localhost:5000/user/login',
      data: { email, password },
      withCredentials: true,
      crossDomain: true,
      dataType: 'json',
    })
      .then((res) => {
        if (res.data == 'User is logged!') {
          toggleSuccess(!success);
          setTimeout(function () {
            toggleSuccess(false);
            props.history.push('/');
          }, 2000);
          console.log(res);
        } else {
          toggleError(!error);

          setTimeout(function () {
            toggleError(false);
          }, 2000);
        }
        console.log(res);
        props.actions.getSession();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [email, emailChange] = useState('');
  const [password, passwordChange] = useState('');
  const emailChangeHandler = (event) => {
    emailChange(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    passwordChange(event.target.value);
  };

  return (
    <div class="container pt-5 ">
      <div className="row d-flex flex-row justify-content-center me-5 ms-5">
        {error ? (
          <div class="alert alert-danger" role="alert">
            Kullanıcı adı veya parola yanlış!
          </div>
        ) : (
          ''
        )}
        {success ? (
          <div class="alert alert-success" role="alert">
            {' '}
            <div class="spinner-border text-primary ms-2 me-3" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            Başarıyla giriş yapıldı yönlediriliyor...
          </div>
        ) : (
          ''
        )}
      </div>
      <div class="row">
        <div class="col-md-6 ">
          <div class="card my-1 pt-2">
            <h5 class="card-title text-center">Üye Girişi</h5>
            <div class="card-body">
              <form onSubmit={SubmitHandler}>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    E-posta
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    onChange={emailChangeHandler}
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Şifre
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    aria-describedby="passwordHelp"
                    onChange={passwordChangeHandler}
                  />
                  <div id="passwordHelp" class="form-text">
                    <a href="#">şifremi unuttum</a>
                  </div>
                </div>
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                  />
                  <label class="form-check-label" for="exampleCheck1">
                    Beni hatırla
                  </label>
                </div>
                <p class="card-text text-center">
                  <button type="submit" class="btn btn-primary">
                    Giriş Yap
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-6 ">
          <div class="card py-5 my-1 ">
            <div class="card-body ">
              <h5 class="card-title text-center">Henüz Üye Değil Misiniz?</h5>
              <p class="card-text text-center">
                Üyelerimize özel hizmetlerimizden faydalanabilmek için üye olun.
              </p>
              <p class="card-text text-center mt-5">
                <Link to={'/register'}>
                  <button
                    type="button"
                    class="btn btn-outline-danger  text-center"
                  >
                    Üye Ol
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    session: state.sessionReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getSession: bindActionCreators(userActionCreators.getSession, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
