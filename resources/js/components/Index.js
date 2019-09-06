import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.js';
import Footer from './Footer.js';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

export default class Index extends Component {
    render() {
        return (
            <div className="container">
               <Header/>
               <Footer/>

            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Router><Index /></Router>, document.getElementById('app'));
}
