import React, {Component, useState} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {URL_BACKEND} from "./const";


export default class Register extends Component {

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
        this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
        this.handleOnChangeFirstname = this.handleOnChangeFirstname.bind(this);


        this.state = {
            isSubmitting : '',
            error : '',
            email : '',
            password: '',
            firstname : '',
            lastname: '',
        }
    }


    setUser(token) {

        axios.get(URL_BACKEND +'users/me', {headers: { Authorization: 'Bearer '+ token }})
            .then( async (response) => {

                if (response.status === 200) {
                    localStorage.setItem("user", JSON.stringify(response.data))
                    window.location.href = "https://myways.cl/"


                } else {
                    this.state.error("Error getting user.")
                }

            }).catch((error) => {
            console.log(error)
        })


    }

    handleCancel() {
        this.props.history.push('/')
    }

    handleSubmit() {


        if (this.state.email === '' && this.state.password === '' && this.state.firstname === ''){
            alert("Debe ingresar Nombre, correo y password")
            return
        }


        let user = { username: this.state.email, password : this.state.password, firstName : this.state.firstname, lastName : this.state.lastname }
        axios.post(URL_BACKEND +'users/signup', user)
            .then( (response) => {
                console.log(response.data)
                console.log('book successfully created')


                if (response.status === 400) {
                    this.state.error("Please fill all the fields correctly!")
                } else if (response.status === 401) {
                    this.state.error("Invalid email and password combination.")
                } else if (response.status === 200) {
                    localStorage.setItem("token", response.data.token)
                    this.setUser(response.data.token)
                }


            }).catch((error) => {
            console.log(error)
        })


    }

    handleOnChangeEmail (e)  {
        const { target: { value, title } } = e;
        this.setState({ email: value })


    }

    handleOnChangePassword (e)  {
        const { target: { value, title } } = e;
        this.setState({ password: value })

    }

    handleOnChangeFirstname (e)  {
        const { target: { value, firstname } } = e;
        this.setState({ firstname: value })

    }



    parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    render() {



        return (

            <>
                <br/>
                <br/>

                <div className="row d-flex justify-content-center">
                    <div className="col d-flex align-items-center justify-content-center pt-1">
                        <label htmlFor="email">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            required
                            name="email"
                            onChange={this.handleOnChangeEmail}
                        />
                    </div>
                    <div className="col d-flex align-items-center justify-content-center pt-1">

                    </div>
                </div>


                <div className="row d-flex justify-content-center">
                    <div className="col d-flex align-items-center justify-content-center pt-1">
                        <label htmlFor="fn">Nombre&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstname"
                            required
                            name="firstname"
                            onChange={this.handleOnChangeFirstname}
                        />
                    </div>
                    <div className="col d-flex align-items-center justify-content-center pt-1">

                    </div>
                </div>




                <div className="row d-flex justify-content-center">
                    <div className="col d-flex align-items-center justify-content-center pt-1">
                        <label htmlFor="pwd">Password&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input
                            type="text"
                            className="form-control"
                            id="password"
                            required
                            name="password"
                            onChange={this.handleOnChangePassword}
                        />
                    </div>
                    <div className="col d-flex align-items-center justify-content-center pt-1">

                    </div>
                </div>

<br/><br/>
                <div className="row d-flex justify-content-center">
                    <div className="col d-flex align-items-center justify-content-center pt-1">
                        <Button variant="danger" onClick={this.handleCancel}>Cancelar</Button>&nbsp;&nbsp;&nbsp;
                        <Button variant="success" onClick={this.handleSubmit}>Enviar</Button>


                    </div>
                    <div className="col d-flex align-items-center justify-content-center pt-1">


                    </div>
                </div>


            </>
        );
    }
}


