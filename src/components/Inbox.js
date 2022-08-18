import React, {Component, useState} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {URL_BACKEND} from "./const";
import UserInfo from "./UserInfo";
import UserInbox from "./UserInbox";


export default class Inbox extends Component {

    constructor() {
        super();

        this.state = {
            user : {}
        }
    }


    render() {

        return (

            <>

                {localStorage.getItem("token") &&
                    <UserInbox/>

                }

            </>
        );
    }
}


