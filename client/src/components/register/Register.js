import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

import axios from 'axios';

const Register = ({...props}) => {
    const [error, toggleError] = useState(false);
    const [success, toggleSuccess] = useState(false);
    const [userType, setUserType] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [companyType, setCompanyType] = useState(false);
    const [companyTitle, setCompanyTitle] = useState('');
    const [city, setCity] = useState('');
    const [town, setTown] = useState('');
    const [address, setAddress] = useState('');
    const [tcNo, setTcNo] = useState('');
    const [phone, setPhone] = useState('');
    const clickHandlerCompanyType = (event) => {
        setCompanyType(!companyType);
        console.log('Im here');
    };

    const checkedPerson = (event) => {
        setUserType(!userType);
    };
    document.title = 'Ustamsaglam | Register';
    const submitHandler = (e) => {
        e.preventDefault();
        //Sadece kategoriler ekli değil
        const data = new FormData();
        data.append('name', name);
        data.append('surname', surname);
        data.append('email', email);
        data.append('password', password);
        data.append('userType', userType ? '2' : '1');
        data.append('image', image);
        console.log(userType);
        if (userType ? '2' : '1') {
            data.append('companyType', companyType ? '2' : '1'); //burayı log la sonra
            data.append('commercialTitle', companyTitle);
            data.append('city', city);
            data.append('town', town);
            data.append('address', address);
            data.append('tcNo', tcNo);
            data.append('phone', phone);
        }

        axios({
            url: 'http://localhost:5000/user/register',
            method: 'POST',
            data: data,

            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                if (res.data == 'User is registered') {
                    toggleSuccess(true);
                    setTimeout(function () {
                        toggleSuccess(false);
                        props.history.push('/login');
                    }, 2000);

                    console.log(res);
                } else {
                    toggleError(true);

                    setTimeout(function () {
                        toggleError(false);
                    }, 2000);
                }
            })
            .catch((err) => console.log(err));
    };

    function CompanyTitle() {
        return (
            <div className="mb-3">
                <label for="companyTitle" class="form-label">
                    Şirket Unvanı
                </label>
                <input
                    type="text"
                    class="form-control"
                    onChange={(e) => setCompanyTitle(e.target.value)}
                />
            </div>
        );
    }

    function CheckedCompany() {
        return (
            <>
                {' '}
                <div className="mb-3">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"/>
                        <label class="form-check-label" for="flexCheckDefault">
                            Elektrik
                        </label>
                    </div>
                    <div className="form-check">
                        {' '}
                        <input class="form-check-input" type="checkbox"/>
                        <label class="form-check-label" for="flexCheckDefault">
                            Motor
                        </label>
                    </div>
                </div>
                <div class="mb-3">
                    {' '}
                    <div className="mb-1">
                        {' '}
                        <label for="companyType" class="form-label">
                            Şirket tipi
                        </label>
                        <br/>
                        <input
                            checked={!companyType}
                            onClick={clickHandlerCompanyType}
                            type="radio"
                            class="form-check-input mx-2"
                            name="companyType"
                        />{' '}
                        <label for="companyType" class="form-label">
                            Anonim
                        </label>
                        <input
                            onClick={clickHandlerCompanyType}
                            type="radio"
                            class="form-check-input  mx-2"
                            name="companyType"
                        />{' '}
                        <label for="companyType" class="form-label" className="ml-1">
                            Limited
                        </label>
                    </div>
                    {companyType ? CompanyTitle() : null}
                    <br/>
                    <label for="city" class="form-label">
                        İl
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label for="town" class="form-label">
                        İlçe
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        onChange={(e) => setTown(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label for="adress" class="form-label">
                        Adres
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                {' '}
                <div className="mb-3">
                    <label for="town" class="form-label">
                        Tc No
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        onChange={(e) => setTcNo(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label for="town" class="form-label">
                        Telefon no
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
            </>
        );
    }

    return (
        <div class="container pt-5  mb-2">
            <div className="row d-flex flex-row justify-content-center me-5 ms-5">
                {error ? (
                    <div class="alert alert-danger" role="alert">
                        Bir şeyler yanlış gitti tekrar deneyiniz!
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
                        Başarıyla kayıt yapıldı giriş sayfasına yönlediriliyor...
                    </div>
                ) : (
                    ''
                )}
            </div>
            <div class="row">
                <div class=" container col-md-12 ">
                    <div class=" container card my-1">
                        <h5 class="card-title text-center mt-3">Yeni Kayıt</h5>
                        <div class="card-body">
                            <div className="row ">
                                <div className="col-6 ps-5">
                                    <div class="mb-3 form-check">
                                        {' '}
                                        <label class="form-check-label" for="exampleCheck2">
                                            Bireysel
                                        </label>
                                        <input
                                            checked={!userType}
                                            onChange={checkedPerson}
                                            type="radio"
                                            class="form-check-input"
                                            name="flexRadioDefault"
                                        />
                                    </div>
                                </div>
                                <div className="col-6 ps-5">
                                    <div class="mb-3 form-check">
                                        <input
                                            onChange={checkedPerson}
                                            type="radio"
                                            class="form-check-input"
                                            name="flexRadioDefault"
                                        ></input>
                                        <label class="form-check-label" for="exampleCheck2">
                                            İşletme
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={submitHandler}>
                                <div class="mb-3">
                                    <label for="formFile" className="form-label">
                                        Resim
                                    </label>
                                    <input
                                        accept="image/x-png,image/jpeg,image/gif"
                                        class="form-control"
                                        type="file"
                                        name="image"
                                        onChange={(e) => {
                                            setImage(e.target.files[0]);
                                        }}
                                    />
                                </div>
                                <div class="mb-3">
                                    <label for="name" class="form-label">
                                        Adınız
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="name"
                                        onChange={(e) => setName(e.target.value)}
                                    ></input>
                                </div>
                                <div class="mb-3">
                                    <label for="surname" class="form-label">
                                        Soyadınız
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="surname"
                                        onChange={(e) => setSurname(e.target.value)}
                                    ></input>
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">
                                        E-posta adresiniz
                                    </label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        name="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    ></input>
                                </div>
                                <div className="mb-3">
                                    {' '}
                                    <label for="password" class="form-label">
                                        Şifre
                                    </label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        name="password"
                                        aria-describedby="passwordHelp"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                {userType ? CheckedCompany() : null}
                                <div class="mb-3">
                                    <div id="passwordHelp" class="form-text">
                                        <a href="#">şifremi unuttum</a>
                                    </div>
                                </div>
                                <div class="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        class="form-check-input"
                                        id="exampleCheck1"
                                    ></input>
                                    <label class="form-check-label" for="exampleCheck1">
                                        <a href="#"> Bireysel Üyelik Sözleşmesini ve Ekleri'ni</a>{' '}
                                        Kabul ediyorum
                                    </label>
                                </div>
                                <div class="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        class="form-check-input"
                                        id="exampleCheck2"
                                    ></input>
                                    <label class="form-check-label" for="exampleCheck2">
                                        İletişim bilgilerime kampanya, tanıtım ve reklam içerikli
                                        ticari elektronik ileti gönderilmesine, bu amaçla kişisel
                                        verilerimin işlenmesine ve tedarikçilerinizle paylaşılmasına
                                        izin veriyorum
                                    </label>
                                </div>

                                <p class="card-text text-center">
                                    <button type="submit" class="btn btn-primary">
                                        Üye Ol
                                    </button>
                                </p>
                            </form>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            Bu sayfadaki bilgiler 4teker.com üyeliği için alınmaktadır.
                            Kişisel verilerin korunması hakkında detaylı bilgiye{' '}
                            <a href="#">buradan</a> ulaşabilirsiniz.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Register;
