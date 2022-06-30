import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class Createchapter extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.handleOnChangeContent = this.handleOnChangeContent.bind(this);
    this.handleInputFileChange = this.handleInputFileChange.bind(this);
    this.handleClick = this.handleClick.bind(this);



    // Setting up state
    this.state = {
      id: this.props.match.params.id,
      content : '',
      file : '',
    }
  }


  handleClick() {

    let book = {
      id:this.state.id,
      content:this.state.content,
      file : this.state.file};

    axios.post('http://localhost:4000/books/add-chapter', book)
        .then((res) => {
          console.log(res.data)
          console.log('chapter successfully created')
        }).catch((error) => {
      console.log(error)
    })


    // Redirect to book List
    this.props.history.push('/show-book/'+ this.state.id)
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
