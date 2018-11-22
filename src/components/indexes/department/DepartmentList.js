import React, {Component} from 'react';
import {getAllIndexes} from '../../../util/APIUtils';

import { Table} from 'antd';

//import LoadingIndicator  from '../common/LoadingIndicator';
import {Button, Icon, notification} from 'antd';
//import { POLL_LIST_SIZE } from '../constants';
import {withRouter} from 'react-router-dom';
import './DepartmentList.css';


const columns = [{
    title: <p  className="table-header">الاسم</p>,
    dataIndex: 'name',
    key: 'name',
    className:'table-header',
    render: text => <a href="javascript:;">{text}</a>,
}, {
    title: <p  className="table-header">*</p>,
    key: 'action',
    className:'table-header',
    render: (text, record) => (
        <span>
      <a  href="javascript:;">حذف</a>
    </span>
    ),
}];



class DepartmentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            isLoading: false
        };
        this.loadDepartmentList = this.loadDepartmentList.bind(this);
    }

    async loadDepartmentList() {

        let p = getAllIndexes("departments");

        if (!p) {
            return;
        }
        try {
            var data = await p;

            const departments = this.state.departments.slice();
            this.setState({
                departments: departments.concat(data),
                isLoading: false
            });
        } catch (err) {
            this.setState({
                isLoading: false
            });
        }
    }

    componentDidMount() {
        this.loadDepartmentList();
    }

    /*    componentDidUpdate(nextProps) {
            if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
                // Reset State
                this.setState({
                    departments: [],
                    isLoading: false
                });
                this.loadDepartmentList();
           }
        }*/

    render() {
        return (
            <div className="departments-container">
                <Table size="small" columns={columns} dataSource={ this.state.departments} />

                {
                    !this.state.isLoading && this.state.departments.length === 0 ? (
                        <div className="no-departments-found">
                            <span>No Departments Found.</span>
                        </div>
                    ) : null
                }
                {/*                {
                    this.state.isLoading ?
                        <LoadingIndicator />: null
                }*/}
            </div>
        );
    }
}

export default withRouter(DepartmentList);