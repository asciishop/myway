import React from 'react';

export default ({ node}) => {
    return (
        <div>
            <img
                src={node.link}
                alt=""
                width='100px'
                height='100px'
            />
            <h3>By{node.user.lastName}</h3>
        </div>
    );
};
