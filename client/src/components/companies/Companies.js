import React, {useEffect, useState} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from "react-router-dom"
import * as userActions from '../../redux/actions/userActions';
import "./css/company.scss"

const Companies = ({...props}) => {
    useEffect(() => {
        props.actions.getCompanies();
        console.log("asdsad", props.companies)
    }, [])
    const rateCalc = (rates) => {
        let calcted = 0;
        rates.map(rate => {
            calcted += parseInt(rate.rate);
        })
        return calcted
    }
    return <>
        <div className="container">
            <h1 className="text-center mt-3 mb-5">Dükkanlar</h1>
            <div className=" d-flex flex-column bd-highlight mb-3">

                {props.companies && props.companies.length > 0 ? (
                    props.companies.map(company => {
                        console.log("ehere")
                        return (
                            <div className="card mb-3" style={{width: "90%"}}>
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={'http://localhost:5000/img/' + company.image}
                                             style={{width: "18rem", height: "15rem", objectFit: "cover"}}
                                             className="companyImage img-fluid rounded-start " alt="..."/>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title"><Link to={"/user/" + company._id}
                                                                             style={{
                                                                                 textDecoration: "none",
                                                                                 color: "#00ADB5"
                                                                             }}>{company.name}
                                            </Link></h5>
                                            <p className="card-text">About The Car Fixer</p>
                                            <p className="card-text"><small className="text-muted">Oylama Puanı:
                                                {rateCalc(company.rate)}</small>
                                            </p>
                                            <p className="card-text">Konum: {company.city}/{company.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )


                    })
                ) : ""}
                {/*        <li className=" list-group-item list-group-item-primary">A simple primary list group item</li>
                    <li className=" list-group-item list-group-item-secondary">A simple secondary list group item</li>
           */
                }

            </div>
        </div>
    </>
};

function mapStateToProps(state) {
    return {
        companies: state.companiesReducer,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getCompanies: bindActionCreators(userActions.getCompanies, dispatch),
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Companies);
