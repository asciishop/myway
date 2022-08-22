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

export default class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {},
            chapters: [],
            query : this.props.match.params.query
        }

    }

    componentDidMount() {

        let search = {searchBar:this.state.query};

        axios.post(URL_BACKEND +'books/search', search)
            .then(res => {
                this.setState({
                    chapters: res.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }




    DataTable() {



        return this.state.chapters.map((res, i) => {
            return <div>

                <Link to={'/show-book/'+res.idBook}className="nav-link">
                    <div className="row d-flex justify-content-center">
                        <div className="col d-flex align-items-center justify-content-center pt-1">
                            {res.user.username}
                        </div>
                        <div className="col d-flex align-items-center justify-content-center pt-1">
                            {res.bookTitle}
                        </div>
                        <div className="col d-flex align-items-center justify-content-center pt-1">
                            {res.text}
                        </div>
                    </div>

                </Link>




            </div>
        });

    }


    render() {
        return (<div className="table-wrapper">
            <h4><b>Resultados</b></h4>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th></th>

                </tr>
                </thead>
                <tbody>
                <div className="row d-flex justify-content-center">
                    <div className="col d-flex align-items-center justify-content-center pt-1">
                        <b>Usuario</b>
                    </div>
                    <div className="col d-flex align-items-center justify-content-center pt-1">
                        <b>Libro</b>
                    </div>
                    <div className="col d-flex align-items-center justify-content-center pt-1">
                        <b>Capítulo</b>
                    </div>
                </div>

                {this.DataTable()}
                </tbody>
            </Table>
        </div>);
    }
}
