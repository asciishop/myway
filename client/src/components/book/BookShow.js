import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBook } from '../../actions';

class BookShow extends Component {
  componentDidMount() {
    this.props.fetchBook(this.props.match.params._id);
  }

  render() {
    if (!this.props.book) {
      return '';
    }

    const { title, content } = this.props.book;

    return (
      <div>
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    );
  }
}

function mapStateToProps({ books }, ownProps) {
  return { book: books[ownProps.match.params._id] };
}

export default connect(mapStateToProps, { fetchBook: fetchBook })(BookShow);
