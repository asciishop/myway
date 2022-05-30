import React, {Component} from 'react';
import {connect} from "react-redux";
import {submitBook} from "../../actions";
import Graph from "./Graph";

class BookNew extends Component {

    componentDidMount() {
        this.props.book.title = "";

    }

    handleClick() {

        let book = {title:this.props.book.title,
                    content:this.props.book.content,
                    file : this.props.book.file};

        this.props.addBook(book,this.props.history);
    }


    handleOnChangeTitle (e)  {
        const { target: { value, title } } = e;
        this.props.book.title = value;

    }

    handleOnChangeContent (e)  {
        const { target: { value, title } } = e;
        this.props.book.content = value;

    }

    handleInputFileChange(event) {
        let files = event.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            this.props.book.file = e.target.result;

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
                  onChange={this.handleOnChangeTitle.bind(this)}
              />
              <label htmlFor="title">Contenido</label>
              <input
                  type="text"
                  className="form-control"
                  id="content"
                  required
                  name="content"
                  onChange={this.handleOnChangeContent.bind(this)}
              />
              <input type="file"
                     className="form-control"
                     id="image"
                     onChange={this.handleInputFileChange.bind(this)} />
          </div>

        <button
            className="yellow darken-3 white-text btn-flat"
            onClick={this.handleClick.bind(this)}
        >Enviar</button>

      </div>
    );
  }
}


function mapStateToProps({ book }) {
    return { book};
}

export default connect(mapStateToProps, { addBook: submitBook})(BookNew);


