import React, { Component } from 'react';

import { createIndex} from '../../../../util/APIUtils';
import DepartmentList from './DepartmentList';
import './NewDepartment.css';

import { Form, Input, Button, Icon,  Col, notification } from 'antd';

const FormItem = Form.Item;
const  FormText  = Input;

class NewDepartment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                text: ''
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }




    handleSubmit(event) {
        event.preventDefault();
        const departmentData = {
            name: this.state.name.text,
        };

       // createDepartment(departmentData)
        createIndex("departments",departmentData)
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
                <DepartmentList />
                <h1 className="page-title">قسم جديد</h1>
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
export default NewDepartment;