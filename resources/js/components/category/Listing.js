import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Pagination from "react-js-pagination";
import DeleteAlert from './DeleteAlert';
import ErrorAlert from './ErrorAlert';


export default class Listing extends Component {

    constructor() {
        super();
        this.state = {
            categories: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed: 3,
            alert_message: ''

        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/category')
            .then(response => {
                this.setState(
                    {
                        categories: response.data.data,
                        activePage: response.data.current_page,
                        itemsCountPerPage: response.data.per_page,
                        totalItemsCount: response.data.total,
                    }
                );
            });
    }


    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        axios.get('http://localhost:8000/api/category?page=' + pageNumber)
            .then(response => {
                this.setState({
                    categories: response.data.data,
                    activePage: response.data.current_page,
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,

                });
            });
    }

    onDelete(category_id) {
        axios.delete('http://localhost:8000/api/category/delete/' + category_id)
            .then(response => {
                var categories = this.state.categories;
                for (var i = 0; i < categories.length; i++) {
                    if (categories[i].id == category_id) {
                        categories.splice(i, 1);
                        this.setState({
                            categories: categories
                        });
                    }
                }

                this.setState({alert_message: "success"})
            }).catch(error => {
            this.setState({alert_message: "error"});
        });
    }

    render() {

        return (

            <div>
                <br></br>
                <hr/>
                {this.state.alert_message == "success" ?
                    <DeleteAlert message={"Category deleted successfully."}/> : null}
                {this.state.alert_message == "error" ?
                    <ErrorAlert message={"Error occured while the deleting category."}/> : null}

                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Update At</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.categories.map(category => {
                            return (
                                <tr>
                                    <th scope="row">{category.id}</th>
                                    <td>{category.name}</td>
                                    <td>{category.active == 1 ? ("Active") : ("InActive")}</td>
                                    <td>{category.created_at}</td>
                                    <td>{category.updated_at}</td>
                                    <td>
                                        <Link to={`/category/edit/${category.id}`} className="btn btn-info">Edit</Link>
                                        &nbsp;
                                        <a className="btn btn-danger" href="#"
                                           onClick={this.onDelete.bind(this, category.id)}>Delete</a>
                                    </td>
                                </tr>
                            )
                        })
                    }

                    </tbody>
                </table>

                <div className="d-flex justify-content-center">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={this.state.pageRangeDisplayed}
                        onChange={this.handlePageChange}
                        itemClass='page-item'
                        linkClass='page-link'
                    />
                </div>
            </div>

        );
    }
}
