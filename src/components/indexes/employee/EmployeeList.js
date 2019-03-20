import React, {Component} from 'react';

import { deleteEmployee } from '../../../util/APIUtils';


import { Table, Divider, Tag } from 'antd';


class EmployeeList extends Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }
     handleDelete(id) {
        let p = deleteEmployee(id);
//reload page
         this.props.history.push("/");
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
                key: 'fname',
                className:'table-header',
                render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: <p  className="table-header">الكنية</p>,
                dataIndex: 'lname',
                key: 'lname',
                className:'table-header',
                render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: <p  className="table-header">الأم</p>,
                dataIndex: 'mname',
                key: 'mname',
                className:'table-header',
                render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: <p  className="table-header">الرقم الوطني</p>,
                dataIndex: 'natId',
                key: 'natId',
                className:'table-header',
                render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: <p  className="table-header">القسم</p>,
                dataIndex: 'department.name',
                key: 'dep',
                className:'table-header',
                render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: <p  className="table-header">المسمى الوظيفي</p>,
                dataIndex: 'position.name',
                key: 'pos',
                className:'table-header',
                render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: <p  className="table-header">*</p>,
                key: 'action',
                className:'table-header',
                render: (text, record) => (
                    <button onClick={() => this.handleDelete(record.id)}>حذف</button>
                ),
            }];

        return (
            <div className="employees-container">
                <Table size="small" columns={columns} dataSource={ this.props.employees}  rowKey="id"/>

                {
                    this.props.employees.length === 0 ? (
                        <div className="no-employees-found">
                            <span>لا يوجد موظفين</span>
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

export default EmployeeList;