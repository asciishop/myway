import React from 'react';

export default ({ node}) => {
    return (
        <audio controls >
            <source src={node.link} type="audio/mpeg" />
        </audio>
    );
};
