import React, {Component,Suspense} from 'react';
import { chapters} from './data.js'
import ImageNode from "./ImageNode";
import TextNode from "./TextNode";
import AudioNode from "./AudioNode";
import VideoNode from "./VideoNode";
import Edge from "./Edge";
import { useParams } from "react-router-dom";




class Graph extends Component {

    componentDidMount() {
        const { bookid } = this.props.match.params;


    }

    render() {

        return (
                                <div className='content'>
                                    {chapters.map(function(node, index){
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


