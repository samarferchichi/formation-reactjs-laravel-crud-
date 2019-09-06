import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class About extends Component {
    render() {
        return (
            <div>
                <div className="alert alert-danger">
                    404 Page Not Found. <Link to="/" className="alert-link">Back to home page.</Link>
                </div>
            </div>
        );
    }
}
