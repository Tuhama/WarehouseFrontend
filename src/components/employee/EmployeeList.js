import React, {Component} from 'react';

import {getAllEmployees, deleteEmployee} from '../../util/APIUtils';


import { Table, Divider, Tag } from 'antd';
import {withRouter} from 'react-router-dom';



class EmployeeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            isLoading: false
        };
        this.loadEmployeeList = this.loadEmployeeList.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    async handleDelete(id) {

        let p = deleteEmployee(id);

        if (!p) {
            return;
        }
        try {
            var data = await p;

        } catch (err) {

        }
    }
    async loadEmployeeList() {

        let p = getAllEmployees();

        if (!p) {
            return;
        }
        try {
            var data = await p;

            const employees = this.state.employees.slice();
            this.setState({
                employees: employees.concat(data),
                isLoading: false
            });
        } catch (err) {
            this.setState({
                isLoading: false
            });
        }
    }

    componentDidMount() {
        this.loadEmployeeList();
    }

    /*    componentDidUpdate(nextProps) {
            if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
                // Reset State
                this.setState({
                    employees: [],
                    isLoading: false
                });
                this.loadEmployeeList();
           }
        }*/

    render() {

        const columns = [
            {
            title: <p  className="table-header">الاسم</p>,
            dataIndex: 'name',
            key: 'name',
            className:'table-header',
            render: text => <a href="javascript:;">{text}</a>,
        },
            {
                title: <p  className="table-header">الاب</p>,
                dataIndex: 'fname',
                key: 'name',
                className:'table-header',
                render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: <p  className="table-header">الكنية</p>,
                dataIndex: 'lname',
                key: 'name',
                className:'table-header',
                render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: <p  className="table-header">الأم</p>,
                dataIndex: 'mname',
                key: 'name',
                className:'table-header',
                render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: <p  className="table-header">الرقم الوطني</p>,
                dataIndex: 'natId',
                key: 'name',
                className:'table-header',
                render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: <p  className="table-header">القسم</p>,
                dataIndex: 'department.name',
                key: 'name',
                className:'table-header',
                render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: <p  className="table-header">المسمى الوظيفي</p>,
                dataIndex: 'position.name',
                key: 'name',
                className:'table-header',
                render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: <p  className="table-header">*</p>,
                key: 'action',
                className:'table-header',
                render: (text, record) => (
                    <button onClick={this.handleDelete(record.id)}>حذف</button>
                ),
            }];

        return (
            <div className="employees-container">
                <Table size="small" columns={columns} dataSource={ this.state.employees}  rowKey="id"/>

                {
                    !this.state.isLoading && this.state.employees.length === 0 ? (
                        <div className="no-employees-found">
                            <span>لا يوجد موظفين</span>
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

export default withRouter(EmployeeList);