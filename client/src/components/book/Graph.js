import React, {Component,Suspense} from 'react';
import { nodes, edges } from './data.js'
import ImageNode from "./ImageNode";
import TextNode from "./TextNode";
import AudioNode from "./AudioNode";
import VideoNode from "./VideoNode";
import Edge from "./Edge";



class Graph extends Component {

    componentDidMount() {

    }

    render() {

        return (
                                <div className='content'>
                                    {nodes.map(function(node, index){
                                        switch(node.type) {
                                            case "image":
                                                return <div><ImageNode node={node} /><Edge /></div>
                                                break;
                                            case "text":
                                                return <div><TextNode node={node} /><Edge /></div>
                                                break;
                                            case "video":
                                                return <div><VideoNode node={node} /><Edge /></div>
                                                break;
                                            case "audio":
                                                return <div><AudioNode node={node} /><Edge /></div>
                                                break;
                                        }


                                    })}

                                </div>


        );
    }
}


export default Graph;


