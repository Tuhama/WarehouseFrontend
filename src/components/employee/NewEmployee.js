import React, { Component } from 'react';

import EmployeeList from './EmployeeList';
import {createEmployee} from '../../util/APIUtils';


import { Form, Input, Button, Select } from 'antd';

const FormItem = Form.Item;
const FormText  = Input;
const Option = Select.Option;

class NewEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                text: ''
            },
            fname: {
                text: ''
            },
            lname: {
                text: ''
            },
            mname: {
                text: ''
            },
            natId: {
                text: ''
            },
            department:
                []
            ,
            position:
                []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }




    handleSubmit(event) {
        event.preventDefault();
        const employeeData = {
            name: this.state.name.text,
        };

         createEmployee(employeeData)
        //createIndex("employees",employeeData)
            .then(response => {
                this.props.history.push("/");
            })/*.catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create poll.');
            } else {
                notification.error({
                    message: 'Polling App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            }
        })*/;
    }

    validateName = (nameText) => {
        if(nameText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'الرجاء ادخال اسم'
            }
        } /*else if (nameText.length > POLL_QUESTION_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Question is too long (Maximum ${POLL_QUESTION_MAX_LENGTH} characters allowed)`
            }
        } */else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({
            name: {
                text: value,
                ...this.validateName(value)
            }
        });
    }


    isFormInvalid() {
        if(this.state.name.validateStatus !== 'success') {
            return true;
        }
    }

    render() {

        return (

            <div className="new-index-container">
                <EmployeeList />
                <h1 className="page-title">موظف جديد</h1>
                <div className="new-index-content">
                    <Form onSubmit={this.handleSubmit} className="create-position-form">
                        <FormItem validateStatus={this.state.name.validateStatus}
                                  help={this.state.name.errorMsg} className="index-form-row">
                            <FormText
                                placeholder="ادخل الاسم هنا"
                                style = {{ fontSize: '16px' }}
                                autosize={{ minRows: 3, maxRows: 6 }}
                                name = "name"
                                value = {this.state.name.text}
                                onChange = {this.handleNameChange}
                            />
                        </FormItem>
                        <FormItem validateStatus={this.state.fname.validateStatus}
                                  help={this.state.fname.errorMsg} className="index-form-row">
                            <FormText
                                placeholder="ادخل الاسم هنا"
                                style = {{ fontSize: '16px' }}
                                autosize={{ minRows: 3, maxRows: 6 }}
                                name = "fname"
                                value = {this.state.fname.text}
                                onChange = {this.handleFnameChange}
                            />
                        </FormItem>
                        <FormItem validateStatus={this.state.lname.validateStatus}
                                  help={this.state.lname.errorMsg} className="index-form-row">
                            <FormText
                                placeholder="ادخل الاسم هنا"
                                style = {{ fontSize: '16px' }}
                                autosize={{ minRows: 3, maxRows: 6 }}
                                name = "lname"
                                value = {this.state.lname.text}
                                onChange = {this.handleLnameChange}
                            />
                        </FormItem>
                        <FormItem validateStatus={this.state.mname.validateStatus}
                                  help={this.state.mname.errorMsg} className="index-form-row">
                            <FormText
                                placeholder="ادخل الاسم هنا"
                                style = {{ fontSize: '16px' }}
                                autosize={{ minRows: 3, maxRows: 6 }}
                                name = "mname"
                                value = {this.state.mname.text}
                                onChange = {this.handleMnameChange}
                            />
                        </FormItem>
                        <FormItem validateStatus={this.state.natId.validateStatus}
                                  help={this.state.natId.errorMsg} className="index-form-row">
                            <FormText
                                placeholder="ادخل الاسم هنا"
                                style = {{ fontSize: '16px' }}
                                autosize={{ minRows: 3, maxRows: 6 }}
                                name = "natId"
                                value = {this.state.natId.text}
                                onChange = {this.handleNatIdChange}
                            />
                        </FormItem>
                        <FormItem validateStatus={this.state.name.department}
                                  help={this.state.department.errorMsg} className="index-form-row">

                            <span style = {{ marginRight: '18px' }}>
                                &nbsp;القسم:
                                    <Select
                                        name="days"
                                        defaultValue="1"
                                        onChange={this.handlePollDaysChange}
                                        value={this.state.department}
                                        style={{ width: 60 }} >
                                        {
                                            Array.from(Array(8).keys()).map(i =>
                                                <Option key={i}>{i}</Option>
                                            )
                                        }
                                    </Select>
</span>
                        </FormItem>
                        <FormItem className="index-form-row">
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    disabled={this.isFormInvalid()}
                                    className="create-index-form-button">حفظ</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}
export default NewEmployee;