import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as userActionCreators from '../../redux/actions/userActions';
import {bindActionCreators} from 'redux';
import * as postActionCreators from '../../redux/actions/postActions';
import axios from 'axios';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {makeStyles} from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import './Navbar.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const defaultProps = {
    color: 'secondary',
    children: <NotificationsIcon/>,
};
const Navbar = ({...props}) => {
    const classes = useStyles();
    const [search, setSearch] = useState("")
    const [visibility, setVisibility] = useState(false)
    const [results, setResults] = useState([]);
    const [hover, setHover] = useState("")
    const searchUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios({
                url: "http://localhost:5000/user/searchUsers",
                data: {
                    keyword: search,
                },
                method: "post",
                withCredentials: true
            })
            console.log(res)
            setResults(res.data)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        props.actions.getSession();
    }, []);
    const isLogin = () => {
        return (
            <>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    {' '}
                    <div className={classes.root}>
                        <Badge
                            className="me-3"
                            style={{color: '#fff', cursor: 'pointer'}}
                            badgeContent={12}
                            max={999}
                            {...defaultProps}
                        />
                    </div>
                    <li class="nav-item dropdown">
                        <Link
                            class="nav-link dropdown-toggle"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            style={{color: 'white'}}
                        >
                            {props.session.user.name}
                        </Link>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li>
                                <Link
                                    class="dropdown-item"
                                    to={'/user/' + props.session.user._id}
                                >
                                    Profili görüntüleyin
                                </Link>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">
                                    Ayarlar ve Gizlilik
                                </a>
                            </li>
                            <li>
                                <hr class="dropdown-divider"/>
                            </li>
                            <li>
                                <Link class="dropdown-item" href="#" onClick={getLogout}>
                                    Oturumu Kapat
                                </Link>
                            </li>
                        </ul>
                    </li>
                    {/* <li class=" nav-item ">
            <Link
              onClick={getLogout}
              class="nav-link active"
              id="position-login"
              href="#"
              style={{ color: '#fff' }}
            >
              Çıkış Yap
            </Link>
          </li>{' '} */}
                </ul>
            </>
        );
    };
    const notLogin = () => {
        return (
            <>
                {' '}
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    {' '}
                    <li class=" nav-item">
                        <Link
                            to="/login"
                            class="nav-link login"
                            id="position-login"
                            style={{color: '#fff'}}
                        >
                            Giriş Yap
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link
                            class="nav-link active"
                            id="position-register"
                            to="/register"
                            style={{color: '#fff'}}
                        >
                            Kayıt Ol
                        </Link>
                    </li>
                </ul>
            </>
        );
    };

    const getLogout = async (e) => {
        e.preventDefault();
        try {
            const res = await axios({
                method: 'GET',
                url: 'http://localhost:5000/user/logout',
                withCredentials: true,
            });
            props.actions.getSession();
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <nav class=" navbar navbar-expand-lg navbar-dark fixed-top  flex-wrap">
            <div class="container" style={{paddingLeft: '7rem'}}>
                {/*bozulursa padding kaldır*/}
                <Link class="navbar-brand me-5" to="/">
                    Ustamsaglam
                </Link>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="nav collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav me-auto mb-2 mb-md-0">
                        <Link to="/" className="nav-link active ">
                            <li class="nav-item me-1">Anasayfa</li>
                        </Link>
                        <Link
                            to="/companies"
                            id="navi-button-text-decoration"
                            class="nav-link active"
                        >
                            <li class="nav-item me-5">Dükkanlar</li>
                        </Link>

                        <div class="input-group">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Kullanıcı ara..."
                                onChange={(e) => setSearch(e.target.value)}
                                onFocus={() => setVisibility(true)}

                            />
                            <button class="btn search-button" type="button" onClick={searchUser}>
                                Ara
                            </button>
                            <ul className={visibility ? "list-group rounded-1" : "hide"}
                                style={{position: "absolute", top: "2.55rem", minWidth: "5rem"}}>
                                {results.map(user => {
                                        return (
                                            <li onMouseEnter={() => setHover(user._id)}
                                                onMouseLeave={() => setHover("")}
                                                className={hover === user._id ? "list-group-item active" : "list-group-item"}>
                                                <Link
                                                    className={hover === user._id ? "text-white" : "text-dark"}
                                                    style={{textDecoration: "none"}}
                                                    to={"/user/" + user._id}>{user.name}</Link></li>
                                        )
                                    }
                                )}

                            </ul>
                        </div>
                    </ul>

                    {props.session.user ? isLogin() : notLogin()}
                </div>
            </div>
        </nav>
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
            getPosts: bindActionCreators(postActionCreators.getPosts, dispatch),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
