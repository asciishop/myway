import React, { Component } from 'react';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllBooks } from '../../actions';

class AllBooks extends Component {
  componentDidMount() {
    this.props.fetchListBooks();
  }

  renderBooks() {
    return map(this.props.listBooks, book => {
      return (
        <div className="card darken-1 horizontal" key={book._id}>
          <div className="card-stacked">
            <div className="card-content">
              <span className="card-title">{book.title}</span>
              <p>{book.content}</p>
            </div>
            <div className="card-action">
              <Link to={`/book/${book._id}`}>Read</Link>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderBooks()}</div>;
  }
}

function mapStateToProps({ books }) {
  return { listBooks : books};
}

export default connect(mapStateToProps, { fetchListBooks: fetchAllBooks })(AllBooks);
