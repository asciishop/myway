import React from 'react';
import { Link } from 'react-router-dom';
import BookList from './book/BookList';

const Dashboard = () => {
  return (
    <div>
      <BookList />
      <div className="fixed-action-btn">
        <Link to="/book/new" className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
