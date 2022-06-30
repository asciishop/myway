import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class Createbook extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.handleOnChangeTitle = this.handleOnChangeTitle.bind(this);
    this.handleOnChangeContent = this.handleOnChangeContent.bind(this);
    this.handleInputFileChange = this.handleInputFileChange.bind(this);
    this.handleClick = this.handleClick.bind(this);



    // Setting up state
    this.state = {
      title : '',
      content : '',
      file : '',
    }
  }


  handleClick() {

    let book = {title:this.state.title,
      content:this.state.content,
      file : this.state.file};

    axios.post('http://localhost:4000/books/add-book', book)
        .then((res) => {
          console.log(res.data)
          console.log('book successfully created')
        }).catch((error) => {
      console.log(error)
    })


    // Redirect to book List
    this.props.history.push('/book-list')
  }


  handleOnChangeTitle (e)  {
    const { target: { value, title } } = e;
    this.setState({ title: value })


  }

  handleOnChangeContent (e)  {
    const { target: { value, title } } = e;
    this.setState({ content: value })

  }

  handleInputFileChange(event) {
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      this.setState({ file: e.target.result })

    }
  }


  render() {
    return (

        <div>
          <div className="form-group">
            <label htmlFor="title">Titulo</label>
            <input
                type="text"
                className="form-control"
                id="title"
                required
                name="title"
                onChange={this.handleOnChangeTitle}
            />
            <label htmlFor="title">Contenido</label>
            <input
                type="text"
                className="form-control"
                id="content"
                required
                name="content"
                onChange={this.handleOnChangeContent}
            />
            <input type="file"
                   className="form-control"
                   id="image"
                   onChange={this.handleInputFileChange} />
          </div>

          <button
              className="yellow darken-3 white-text btn-flat"
              onClick={this.handleClick}
          >Enviar</button>

        </div>
    );
  }
}
