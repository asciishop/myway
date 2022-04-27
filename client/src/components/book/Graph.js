import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network';

const Graph = () => {
    const container = document.getElementById("grafo");

    const nodes = [
        { id: 1, label: 'Node 1' },
        { id: 2, label: 'Node 2' },
        { id: 3, label: 'Node 3' },
        { id: 4, label: 'Node 4' },
        { id: 5, label: 'Node 5',
            shape: "image",
            image: "https://w7.pngwing.com/pngs/322/664/png-transparent-yoda-telegram-sticker-kik-messenger-advertising-others-miscellaneous-superhero-fictional-character.png",
            imagePadding: { left: 2, top: 10, right: 8, bottom: 20 }}
    ];

    const edges = [
        { from: 1, to: 3 },
        { from: 1, to: 2 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
        { from: 3, to: 3 }
    ];

    const options = {};

    React.useEffect(() => {
        const network = new Network(container, { nodes, edges }, options);
    }, [container, nodes, edges]);

    return <div id="grafo" style={{ height: '500px', width: '800px' }} />;
};

export default Graph;
