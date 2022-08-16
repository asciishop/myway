import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import BookTableRow from './BookTableRow';
import {URL_BACKEND} from "./const";
import Button from "react-bootstrap/Button";
import {BsFillCameraFill, BsSearch} from "react-icons/bs";


export default class bookList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      books: [],
      searchBar : ''
    };

    this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this)
    this.handleSearch = this.handleSearch.bind(this)



  }




  componentDidMount() {
    axios.get(URL_BACKEND +"books/")
      .then(res => {
        this.setState({
          books: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })

    var urlParams = new URLSearchParams(this.props.location.search);

    if(urlParams.has('token')) {
      console.log("QUERY :" + this.props.location.search)
      let token = urlParams.get('token')
      localStorage.setItem("token", token)
      this.setUser(token)
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

  handleSearch(){


    let search = {searchBar:this.state.searchBar};

    axios.post(URL_BACKEND +'books/search', search)
        .then(res => {
          this.setState({
            books: res.data
          });
        })
        .catch((error) => {
          console.log(error);
        })

  }

  handleOnChangeSearch (e)  {
    const { target: { value, title } } = e;
    this.setState({ searchBar: value })

  }

  DataTable() {
    return this.state.books.map((res, i) => {
      return <BookTableRow obj={res} key={i} />;
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

        <div className="row d-flex justify-content-center">
          <div className="col d-flex align-items-center justify-content-center pt-3">

        <input
            type="search"
            placeholder="Buscar"
            value={this.state.searchBar}
            onChange={this.handleOnChangeSearch}
            style={{'width': '150px'}}
        />
            &nbsp;&nbsp;

            <BsSearch size={40} onClick={this.handleSearch} />

          </div></div>

          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}
