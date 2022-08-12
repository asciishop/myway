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

        const user = JSON.parse(localStorage.getItem("user"))
        this.setState({
            user: user
        });

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
            return <div>
                <BookTableRowProfile obj={res} key={i} />
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
                <h2><b>Hola {this.state.user.username}</b></h2>
                <br/>
                <h6>Nombre {this.state.user.firstName}</h6>
                <h6>Puntos {this.state.user.points}</h6>


                <br/>
                <h4><b>Mis Libros </b></h4>

                {this.DataTable()}
                </tbody>
            </Table>
        </div>);
    }
}
