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
        </div>
    );
};
