import React, {Component, useState} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {URL_BACKEND} from "./const";


export default class Register extends Component {

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
        this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
        this.handleOnChangeFirstname = this.handleOnChangeFirstname.bind(this);
        this.handleOnChangeLastname = this.handleOnChangeLastname.bind(this);


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

    handleSubmit() {


        if (this.state.email === '' && this.state.password === '' && this.state.firstname === ''){
            alert("Debe ingresar Nombre, mail y password")
            return
        }


        let user = { username: this.state.email, password : this.state.password, firstname : this.state.firstname, lastname : this.state.lastname }
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

    handleOnChangeLastname (e)  {
        const { target: { value, lastname } } = e;
        this.setState({ lastname: value })

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
                <label htmlFor="email">Email</label>



                <input
                    type="text"
                    className="form-control"
                    id="email"
                    required
                    name="email"
                    onChange={this.handleOnChangeEmail}
                />

                <label htmlFor="fn">Nombre</label>


                <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    required
                    name="firstname"
                    onChange={this.handleOnChangeFirstname}
                />

                <label htmlFor="ln">Apellido</label>

                <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    required
                    name="lastname"
                    onChange={this.handleOnChangeLastname}
                />

                <label htmlFor="pwd">Password</label>

                <input
                    type="text"
                    className="form-control"
                    id="password"
                    required
                    name="password"
                    onChange={this.handleOnChangePassword}
                />

                <Button variant="success" onClick={this.handleSubmit}>Enviar</Button>
            </>
        );
    }
}


