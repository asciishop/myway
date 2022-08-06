import React, { Component } from "react";
import axios from 'axios';
import ImageNode from "./ImageNode";
import TextNode from "./TextNode";
import VideoNode from "./VideoNode";
import AudioNode from "./AudioNode";
import {Link} from "react-router-dom";
import Edge from "./Edge";
import { BsFillNodePlusFill } from "react-icons/bs";
import {URL_BACKEND} from "./const";
import {
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";


export default class Showbook extends Component {
    constructor(props) {
        super(props)


        // State
        this.state = {
            title: '',
            chapters:[],
            urlSocial : ''
        }

        this.listSize = this.state.chapters.length -1
    }



    componentDidMount() {
        let urlShare = 'https://myways.cl/show-book/' + this.props.match.params.id
        this.setState({ urlSocial: urlShare })


        axios.get(URL_BACKEND +'books/edit-book/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    chapters : res.data.chapters
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangebookTitle(e) {
        this.setState({ name: e.target.value })
    }


    render() {
        return (
            <div className="container-fluid">

                <div className="row">
                <div className="col d-flex align-items-center justify-content-center pt-3">
                    <FacebookShareButton
                        url={this.state.urlSocial}
                        quote={this.state.title}
                        hashtag={'#myways'}
                    >
                        <FacebookIcon size={40} round={true} />
                    </FacebookShareButton>
                    &nbsp;

                    <WhatsappShareButton
                        url={this.state.urlSocial}
                        quote={this.state.title}
                        hashtag={'#myways'}
                    >
                        <WhatsappIcon size={40} round={true} />
                    </WhatsappShareButton>
                    &nbsp;
                    <TwitterShareButton
                        url={this.state.urlSocial}
                        quote={this.state.title}
                        hashtag={'#myways'}
                    >
                        <TwitterIcon size={40} round={true} />
                    </TwitterShareButton>

                </div>
                </div>

                <div className="row">
                    <div className="col d-flex align-items-center justify-content-center pt-3">

                        <h5 className="card-title">Título : {this.state.title}</h5>
                    </div>
                </div>

                <div className="container-fluid">
                    {this.state.chapters.map(function(node, index){
                        switch(node.type) {
                            case "image":

                                    return <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"><ImageNode node={node} /></div></div>

                                break;
                            case "text":


                                    return <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"><TextNode node={node} /></div></div>


                                break;
                            case "video":

                                    return <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"><VideoNode node={node} /></div></div>


                                break;
                            case "audio":

                                    return <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"><AudioNode node={node} /></div></div>


                                break;
                        }

                    })}
                </div>

                <div className="fixed-action-btn">



                    <div className="row d-flex float-end"><div className="col d-flex align-items-center justify-content-center pt-3"> <Link to={`/create-chapter/${this.props.match.params.id}`} className="btn-floating btn-large red">
                        <i className="material-icons btn btn-success btn-lg ml-auto"><h1><BsFillNodePlusFill /></h1></i>
                    </Link></div></div>
                </div>

            </div>

        );
    }
}
