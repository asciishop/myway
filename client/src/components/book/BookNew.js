import React, {Component} from 'react';
import {connect} from "react-redux";
import {submitBook} from "../../actions";

class BookNew extends Component {

    componentDidMount() {
        this.props.book.title = "";

    }

    handleClick() {

        let book = {title:this.props.book.title,
                    content:"Loren Ipsum"};


        this.props.book.content
        this.props.addBook(book,this.props.history);
    }


    handleOnChange = e => {
        const { target: { value, title } } = e;
        this.props.book.title = value;

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
                  onChange={this.handleOnChange.bind(this)}
              />
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


