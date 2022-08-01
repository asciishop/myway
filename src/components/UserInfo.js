import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import BookTableRow from './BookTableRow';
import {URL_BACKEND} from "./const";


export default class UserInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {},
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
    }

    DataTable() {
        return <h2>Hola {this.state.user.lastName}</h2>;

        /*
        return this.state.books.map((res, i) => {
          return <BookTableRow obj={res} key={i} />;
        });*/
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
                {this.DataTable()}
                </tbody>
            </Table>
        </div>);
    }
}
