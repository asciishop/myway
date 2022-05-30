import React, {Component,Suspense} from 'react';
import { chapters} from './data.js'
import ImageNode from "./ImageNode";
import TextNode from "./TextNode";
import AudioNode from "./AudioNode";
import VideoNode from "./VideoNode";
import Edge from "./Edge";
import {Link, useParams} from "react-router-dom";
import {fetchBook} from "../../actions";
import {connect} from "react-redux";
import map from 'lodash/map';


class Graph extends Component {


    render() {

        const { bookid } = this.props.match.params;
        this.props.fetchBook(bookid,this.props.history);
        console.log(this.props.book)

        return (
            <div>
                <div className="fixed-action-btn">
                    <Link to="/chapter/new" className="btn-floating btn-large red">
                        <i className="material-icons">add</i>
                    </Link>
                </div>

                <div className='content'>
                    {this.props.book.chapters.map(function(node, index){
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
            </div>
        )


    }
}

function mapStateToProps({ book }) {
    return { book};
}

export default connect(mapStateToProps, { fetchBook})(Graph);
