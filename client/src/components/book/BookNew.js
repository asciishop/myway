import React, { Component } from 'react';
import {connect} from "react-redux";
import {fetchBook, fetchBooks, submitBook} from "../../actions";
import * as actions from "../../actions";
import {withRouter} from "react-router-dom";


class BookNew extends Component {

    handleClick() {

        let book = {title:"Mono",content:"BAO"};
        this.props.addBook(book,this.props.history);
    }

  render() {
    return (
      <div>
          La Vida
        <button
            className="yellow darken-3 white-text btn-flat"
            onClick={this.handleClick.bind(this)}
        >LIFE</button>
      </div>
    );
  }
}


function mapStateToProps({ book }) {
    return { book};
}

export default connect(mapStateToProps, { addBook: submitBook })(BookNew);


