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


    handleSubmit() {


        if (this.state.email === '' && this.state.password === ''){
            alert("Debe ingresar usuario y password")
            return
        }


        let user = { username: this.state.email, password : this.state.password }
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
                    this.props.history.push('/')
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
        this.setState({ password: value })

    }

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


