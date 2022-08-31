import React, {Component, useState} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {URL_BACKEND} from "./const";


export default class Comment extends Component {

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);


        this.state = {
            isSubmitting : '',
            error : '',
            email : ''
        }
    }


    setUser(token) {

        axios.get(URL_BACKEND +'users/me', {headers: { Authorization: 'Bearer '+ token }})
            .then( async (response) => {

                if (response.status === 200) {
                    localStorage.setItem("user", JSON.stringify(response.data))



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


        if (this.state.email === ''){
            alert("Debe ingresar un comentario")
            return
        }

        let user = "Anonymous"
        if(localStorage.getItem("user")){
            user = JSON.parse(localStorage.getItem("user")).username;
        }


        let comment = { message: this.state.email, user : user }
        axios.post(URL_BACKEND +'books/add-comment', comment)
            .then( (response) => {
                console.log(response.data)
                console.log('comment successfully created')


                if (response.status === 400) {
                    this.state.error("Please fill all the fields correctly!")
                } else if (response.status === 401) {
                    this.state.error("Invalid email and password combination.")
                } else if (response.status === 200) {
                    window.location.href = "https://myways.cl/"
                }


            }).catch((error) => {
            console.log(error)
        })


    }

    handleOnChangeEmail (e)  {
        const { target: { value, title } } = e;
        this.setState({ email: value })


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
                <label htmlFor="email">Dejanos tus consultas y/o sugerencias :&nbsp;&nbsp;&nbsp;</label>

                <div className="row d-flex justify-content-center">
                    <div className="col d-flex align-items-center justify-content-center pt-3">


                        <textarea
                            className="form-control"
                            id="content"
                            required
                            name="content"
                            onChange={this.handleOnChangeEmail}
                            rows="4" cols="40"
                            maxLength="125"
                        />
                    </div>

                </div>


                <br/><br/>
                <div className="row d-flex justify-content-center">
                    <div className="col d-flex align-items-center justify-content-center pt-1">
                        <Button variant="danger" onClick={this.handleCancel}>Cancelar</Button>&nbsp;&nbsp;&nbsp;
                        <Button variant="success" onClick={this.handleSubmit}>Enviar</Button>


                    </div>

                </div>


            </>
        );
    }
}


