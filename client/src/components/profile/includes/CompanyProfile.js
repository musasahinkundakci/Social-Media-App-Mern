import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import "./css/company.scss"
import "./css/standart.scss"
import {connect} from 'react-redux';
import * as userActionCreators from '../../../redux/actions/userActions';
import * as postActionCreators from '../../../redux/actions/postActions';
import {bindActionCreators} from 'redux';
import Post from "../../main/includes/Post";
import Rate from "./Rate";
import LazyLoad from "react-lazyload";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
            style={{justifyContent: "center", display: "flex"}}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '60%',
        backgroundColor: theme.palette.background.paper,
        minHeight: "17rem",

    },
}));

const CompanyProfile = ({followUser, unFollowUser, user, id, getUser, ...props}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [rate, setRate] = React.useState(user.rate ? user.rate : "0")
    useEffect(() => {
        props.actions.getPostsById(id);
        console.log(user);
    }, []);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="company-container">
            <div className="profile-container">
                <img src={"http://localhost:5000/img/" + user.image} className={"company-profile-image"} alt=""/>

            </div>
            <div className="middlebar" style={{marginBottom: "1rem"}}>
                <div className="text-center">
                    Takip Edilen
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
                <div className="text-center">
                    Puan <br/>
                    4.5
                </div>
            </div>
            {
                props.session.user._id == id ? (
                    <span
                        className="badge rounded-pill bg-primary"
                        style={{cursor: 'pointer', margin: '1rem 0'}}
                    >
            Profili Düzenle
          </span>
                ) : (
                    <div className={"mb-4"}>
                        {props.session.user.following.includes(id) ? (
                            <button className={"btn btn-danger me-2"}
                                    onClick={(e) => (unFollowUser(e, id))}>Takip Bırak</button>
                        ) : <button className={"btn btn-danger me-2"} onClick={(e) => (followUser(e, id))}>Takip
                            Et</button>}
                        <button className={"btn btn-primary"}>Mesaj Gönder</button>
                    </div>
                )
            } {props.session.user._id === id ? "" : (
            <Rate rate={rate} setRate={setRate} targetId={id}/>
        )}
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"

                    >
                        <Tab label="Gönderiler" {...a11yProps(0)} />
                        <Tab label="Çalışanlar" {...a11yProps(1)} />
                        <Tab label="Konum Bilgisi" {...a11yProps(2)} />
                        <Tab label="İletişim" {...a11yProps(3)} />
                        <Tab label="Değerlendirmeler" {...a11yProps(4)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    {props.posts.length > 0 ? (props.posts.map((post) => {
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
                    })) : "Henüz post yok"}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
                <TabPanel value={value} index={3}>
                    Item Four
                </TabPanel>

            </div>
        </div>
    );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfile);
