import React from 'react';

export default ({ node}) => {
    return (
        <div>
            <video controls={true} width={200} height={150}>
                <source src={node.link} type="video/mp4" />
            </video>
        </div>
    );
};
