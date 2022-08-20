import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import BookTableRow from './BookTableRow';
import {URL_BACKEND} from "./const";
import Button from "react-bootstrap/Button";
import {BsFillCameraFill, BsPlus, BsSearch} from "react-icons/bs";
import {FiPlus} from "react-icons/fi";

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

export default class bookList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      books: [],
      searchBar : '',
      pageNumber : 1
    };

    this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handlePage = this.handlePage.bind(this)
    this.getBooks = this.getBooks.bind(this)


  }




  componentDidMount() {

    let payload = {'pageNumber' : this.state.pageNumber, 'userId': ''}
    let urlSufix = 'page';
    let token = '';
    if(localStorage.getItem("token")){
      const user = parseJwt(localStorage.getItem("token"));
      token = localStorage.getItem("token")
      payload.userId = user._id;
      urlSufix = 'bookListAuth';
    }

    axios.post(URL_BACKEND + 'books/'+ urlSufix,payload, {headers: { Authorization: 'Bearer '+ token }})

        .then((res) => {
          this.setState({
            books: res.data
          });
        }).catch((error) => {
      console.log(error)
    })

    var urlParams = new URLSearchParams(this.props.location.search);

    if(urlParams.has('token')) {
      console.log("QUERY :" + this.props.location.search)
      let token = urlParams.get('token')
      localStorage.setItem("token", token)
      this.setUser(token)
    }

    this.setState({ pageNumber: this.state.pageNumber + 1 })

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

    this.props.history.push('/search/'+ this.state.searchBar)


  }

  handleOnChangeSearch (e)  {
    const { target: { value, title } } = e;
    this.setState({ searchBar: value })

  }

  handlePage(){
    this.setState({ pageNumber: this.state.pageNumber + 1 })

    let payload = {'pageNumber' : this.state.pageNumber, 'userId': ''}
    let urlSufix = 'page';
    let token = '';
    if(localStorage.getItem("token")){
      const user = parseJwt(localStorage.getItem("token"));
      token = localStorage.getItem("token")
      payload.userId = user._id;
      urlSufix = 'bookListAuth';
    }


    axios.post(URL_BACKEND + 'books/'+ urlSufix, payload)
        .then((res) => {
          let newBookList = [...this.state.books, ...res.data]
          this.setState({
            books: newBookList
          });
          window.scrollTo(0, document.body.scrollHeight);

        }).catch((error) => {
      console.log(error)
    })

  }

  getBooks(){


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
        <div className="row d-flex justify-content-center">
          <div className="col d-flex align-items-center justify-content-center pt-3">

              <FiPlus size={40} color={"green"} onClick={this.handlePage} />&nbsp;Libros
          </div></div>
        </tbody>
      </Table>
    </div>);
  }
}
