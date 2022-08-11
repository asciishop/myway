import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import BookTableRowProfile from './BookTableRowProfile';
import {URL_BACKEND} from "./const";


export default class UserInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {},
            books: []
        }
    }

    componentDidMount() {

        axios.get(URL_BACKEND +"users/me",{headers: { Authorization: 'Bearer '+ localStorage.getItem("token") }})
            .then(res => {
                this.setState({
                    user: res.data
                });
            })
            .catch((error) => {
                console.log(error);
            })


        const user = JSON.parse(localStorage.getItem("user"))

        axios.get(URL_BACKEND +"books/book-by-user/"+user._id)
            .then(res => {
                this.setState({
                    books: res.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }



    DataTable() {

        return this.state.books.map((res, i) => {
            return <BookTableRowProfile obj={res} key={i} />;
        });

    }


    render() {
        return (<div className="table-wrapper">
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th></th>

                </tr>
                </thead>
                <tbody>
                <h2>Hola {this.state.user.username}</h2>;
                <br/>
                {this.DataTable()}
                </tbody>
            </Table>
        </div>);
    }
}
