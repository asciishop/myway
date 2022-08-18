import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import BookTableRowProfile from './BookTableRowProfile';
import {URL_BACKEND} from "./const";
import {Link} from "react-router-dom";
import LogoMyWay from "../asset/image/myway-logo-small.png";


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        minutes  =d.getMinutes();

    year = year +" "+ hour + ":"+ minutes

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('-');
}

export default class UserInbox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {},
            books: []
        }
    }

    componentDidMount() {

        const user = JSON.parse(localStorage.getItem("user"))
        this.setState({
            user: user
        });

        axios.get(URL_BACKEND +"books/inbox/"+user._id)
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
            return <div>

                <Link to={'/show-book/'+res.idBook}className="nav-link">
                    <div className="row d-flex justify-content-center">
                        <div className="col d-flex align-items-center justify-content-center pt-1">
                            {res.message}
                        </div>
                        <div className="col d-flex align-items-center justify-content-center pt-3">
                            {formatDate(res.date)}
                        </div>
                    </div>

                </Link>




            </div>
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

                <h4><b>Mensajes </b></h4>

                {this.DataTable()}
                </tbody>
            </Table>
        </div>);
    }
}
