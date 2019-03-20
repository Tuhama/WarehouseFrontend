import React, { Component } from 'react';

import {createIndex, getAllIndexes} from '../../../util/APIUtils';
import { withRouter} from 'react-router-dom';
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH, APP_NAME } from '../../../constants';
import './NewIndex.css';
import { Form, Input, Button, Icon, notification } from 'antd';
import IndexList from './IndexList';
import {AuthConsumer} from "../../../user/AuthContext";
import LoadingIndicator from "../../ui/LoadingIndicator";
const FormItem = Form.Item;
const  FormText  = Input;

class NewIndex extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: {
                text: ''
            },
            indexes: [],
            isLoading: false
        };
        this.loadIndexList = this.loadIndexList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }


    loadIndexList() {
        let promise = getAllIndexes( this.props.indexType );

        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {
                this.setState({
                    indexes: response,
                    isLoading: false
                });
            }).catch(err => {
            this.setState({
                indexes: null,
                isLoading: false
            });
        })
    }


    componentDidMount() {
        this.loadIndexList();
    }

    handleSubmit(event,handleLogout) {
        event.preventDefault();

        const indexData = {
            name: this.state.name.text,
        };

        createIndex(this.props.indexType,indexData)
            .then(response => {
                this.props.history.push("/"+this.props.indexType);
            }).catch(error => {
            if(error.status === 401) {
                handleLogout('/login', 'error', 'الرجاء تسجيل الدخول للقيام بالعملية!');
            } else {
                notification.error({
                    message: APP_NAME,
                    description: error.message || 'فشل العملية..يرجى المحاولة مرة ثانية.'
                });
            }
        });
    }

    validateName = (nameText) => {
        if(nameText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'الرجاء ادخال اسم'
            }
        } else if (nameText.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `الاسم قصير جدا...لا يسمح بأقل من ${NAME_MIN_LENGTH} حرف`
            }
        }
        else if (nameText.length > NAME_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `الاسم طويل جدا...لا يسمح بأكثر من ${NAME_MAX_LENGTH} حرف`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleInputChange(event) {
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
            <AuthConsumer>
                { ({handleLogout})=>

            <div className="new-index-container">

                <IndexList indexType={this.props.indexType} indexes={this.state.indexes}/>

                {
                    this.state.isLoading ?
                        <LoadingIndicator />: null
                }

                <h1 className="page-title">إضافة جديد:</h1>
                <div className="new-index-content">
                    <Form onSubmit={(event)=>this.handleSubmit(event,handleLogout)} className="create-index-form">
                                             <FormItem validateStatus={this.state.name.validateStatus}
                                  help={this.state.name.errorMsg} className="index-form-row">
                     <FormText
                            placeholder="ادخل الاسم هنا"
                            style = {{ fontSize: '16px' }}
                            autosize={{ minRows: 3, maxRows: 6 }}
                            name = "name"
                            value = {this.state.name.text}
                            onChange = {this.handleInputChange}
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
            </div>}
            </AuthConsumer>
        );
    }
}
export default NewIndex;