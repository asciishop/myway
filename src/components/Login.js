import React, {Component, useState} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {URL_BACKEND} from "./const";


export default class Login extends Component {

constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
    this.handleOnChangePassword = this.handleOnChangePassword.bind(this);

    this.state = {
        isSubmitting : '',
        error : '',
        email : '',
        password: '',
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


        if (this.state.email === '' && this.state.password === ''){
            alert("Debe ingresar usuario y password")
            return
        }


        let user = { username: this.state.email, password : this.state.password }
        axios.post(URL_BACKEND +'users/login', user)
            .then( async (response) => {

                if (response.status === 400) {
                    this.state.error("Please fill all the fields correctly!")
                } else if (response.status === 401) {
                    this.state.error("Invalid email and password combination.")
                } else if (response.status === 200) {
                    localStorage.setItem("token", response.data.token)
                    this.setUser(response.data.token)




                    //this.props.history.push('/')


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
                <br/><br/>
                <label htmlFor="title">Usuario</label>

                <input
                    type="text"
                    className="form-control"
                    id="email"
                    required
                    name="email"
                    onChange={this.handleOnChangeEmail}
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
