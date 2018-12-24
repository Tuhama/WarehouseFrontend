import React, {Component} from 'react';

import {createIndex} from '../../../util/APIUtils';

//import { MAX_CHOICES, POLL_QUESTION_MAX_LENGTH, POLL_CHOICE_MAX_LENGTH } from '../constants';
import './NewMaterial.css';
import {Form, Input, Button, Icon, Col, notification} from 'antd';
import MaterialList from './MaterialList';


const FormItem = Form.Item;
const FormText = Input;

class NewMaterial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                text: ''
            },
            id: {
                text: ''
            },
            unit: {
                text: ''
            },
            type: {
                text: ''
            },
            note: {
                text: ''
            },

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: {text: value}
        });
    }


    handleSubmit(event) {
        event.preventDefault();
        const materialData = {
            name: this.state.name.text,
            id: this.state.id.text,
            type: this.state.type.text,
            unit: this.state.unit.text,
            note: this.state.note.text,
        };

        createIndex("materials", materialData)
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
        if (nameText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'الرجاء ادخال اسم'
            }
        } /*else if (nameText.length > POLL_QUESTION_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Question is too long (Maximum ${POLL_QUESTION_MAX_LENGTH} characters allowed)`
            }
        } */ else {
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
               // ...this.validateName(value)
            }
        });
    }


    isFormInvalid() {
       /* if (this.state.name.validateStatus !== 'success') */{
            return false;
        }
    }

    render() {

        return (

            <div className="new-index-container">
                <MaterialList/>
                <h1 className="page-title">صنف رئيسي جديد</h1>
                <div className="new-index-content">
                    <Form onSubmit={this.handleSubmit} className="create-material-form">
                        <FormItem
                          /*  validateStatus={this.state.name.validateStatus}
                                  help={this.state.name.errorMsg} */
                                  className="index-form-row">
                            <FormText
                                placeholder="اسم الصنف"
                                style={{fontSize: '16px'}}
                                autosize={{minRows: 3, maxRows: 6}}
                                name="name"
                                value={this.state.name.text}
                                onChange={this.handleInputChange}
                            />
                        </FormItem>
                        <FormItem  className="index-form-row">
                            <FormText
                                placeholder="رمز المادة"
                                style={{fontSize: '16px'}}validateStatus={this.state.id.validateStatus}
                                help={this.state.id.errorMsg}
                                autosize={{minRows: 3, maxRows: 6}}
                                name="id"
                                value={this.state.id.text}
                                onChange={this.handleInputChange}
                            />
                        </FormItem>
                        <FormItem validateStatus={this.state.unit.validateStatus}
                                  help={this.state.unit.errorMsg} className="index-form-row">
                            <FormText
                                placeholder="واحدة القياس"
                                style={{fontSize: '16px'}}
                                autosize={{minRows: 3, maxRows: 6}}
                                name="unit"
                                value={this.state.unit.text}
                                onChange={this.handleInputChange}
                            />
                        </FormItem>
                        <FormItem validateStatus={this.state.type.validateStatus}
                                                                     help={this.state.type.errorMsg} className="index-form-row">
                        <FormText
                            placeholder="النوع"
                            style={{fontSize: '16px'}}
                            autosize={{minRows: 3, maxRows: 6}}
                            name="type"
                            value={this.state.type.text}
                            onChange={this.handleInputChange}
                        />
                    </FormItem>
                        <FormItem validateStatus={this.state.note.validateStatus}
                                                                 help={this.state.note.errorMsg} className="index-form-row">
                        <FormText
                            placeholder="ملاحظات"
                            style={{fontSize: '16px'}}
                            autosize={{minRows: 3, maxRows: 6}}
                            name="note"
                            value={this.state.note.text}
                            onChange={this.handleInputChange}
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

export default NewMaterial;