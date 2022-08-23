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
import { Fab, Action } from 'react-tiny-fab';
import {mainButtonStyles,} from 'react-tiny-fab/dist/styles.css';
import {
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";
import {Navbar} from "react-bootstrap";
import {MdAdd} from "react-icons/all";
import LikeButton from "./LikeButton";
import ShareButton from "./ShareButton";


export default class Showbook extends Component {
    constructor(props) {
        super(props)

        this.someFunctionForTheMainButton = this.someFunctionForTheMainButton.bind(this);



        // State
        this.state = {
            title: '',
            chapters:[],
            urlSocial : '',
            idBook : '',
            isLoading : false,
            like :false,
            likesCounts :0

        }

        this.listSize = this.state.chapters.length -1

        let urlShare = 'https://myways.cl/show-book/' + this.props.match.params.id
        this.setState({ urlSocial: urlShare })
        this.setState({ idBook: this.props.match.params.id })


    }



    componentDidMount() {


        axios.get(URL_BACKEND + 'books/edit-book/' + this.props.match.params.id).then(res => {

            this.setState({
                title: res.data.title,
                chapters: res.data.chapters,
            })

            if (localStorage.getItem("user")) {
                let userId = JSON.parse(localStorage.getItem("user"))._id;
                let index = res.data.likes.find((lk) => lk.idUser === userId);
                let option = false
                if (index === undefined || index === -1) {
                    option = false
                } else {
                    option = true
                }

                this.setState({
                    like: option,
                    likesCounts: res.data.likes.length
                });

                this.setState({
                    isLoading: true
                });
            }



        })
            .catch((error) => {
                console.log(error);
            })

    }



onChangebookTitle(e) {
        this.setState({ name: e.target.value })
    }

    someFunctionForTheMainButton() {


        this.props.history.push('/create-chapter/'+ this.props.match.params.id)

    }


    render() {
        function handleEmailOnClick() {

        }

        function handleHelpOnClick() {

        }



        return (
            <div className="container-fluid">

                <Fab
                    mainButtonStyles={{backgroundColor: "darkseagreen" }}

                    style={{ bottom: 270, right: -20 }}
                    icon={<MdAdd />}
                    alwaysShowTitle={true}
                    onClick={this.someFunctionForTheMainButton}
                >
                    // The Action components are the "buttons" that appear when the Fab is open. You can use the out-of-the-box Action
                    // component or you can use a custom component of any type and style it any way that you'd like. The "text" prop
                    // is the popup label that appears when the Action component is hovered.
                    <Action
                        text="Email"
                        onClick={handleEmailOnClick}
                    />
                    <Action
                        text="Help"
                        onClick={handleHelpOnClick}
                    >
                        <i className="fa fa-help" />
                    </Action>
                    // Using a custom component for this one. See another example in "example/src/index.js"

                </Fab>

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

                                break;
                            case "audio":

                                return <div className="row d-flex justify-content-center"><div className="col d-flex align-items-center justify-content-center pt-3"><AudioNode node={node} /></div></div>


                                break;
                        }

                    })}
                </div>

                <div className="container-fluid">

                    <div className="row d-flex justify-content-center"  ><div className="col d-flex align-items-center justify-content-center pt-3 fixed-bottom" style={{backgroundColor:"darkseagreen", paddingBottom :"10px"}}>


                        <div id="editor" >
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
                        &nbsp;&nbsp;&nbsp;{this.state.isLoading && <LikeButton like={this.state.like} count={this.state.likesCounts} idBook={this.state.idBook}  title={this.state.title}/> }

                    </div>
                    </div>


                </div>


            </div>

        );
    }
}
