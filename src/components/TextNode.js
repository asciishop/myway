import React from 'react';


export default ({ node}) => {
    return (
        <div >
            <label>{node.text}</label>
            <h6>By{node.user.lastName}</h6>
        </div>
    );
};
