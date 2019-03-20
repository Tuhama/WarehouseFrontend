import React, { Component } from 'react';
import { login } from '../../util/APIUtils';
import './Login.css';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN, APP_NAME } from '../../constants';
import {AuthConsumer} from '../AuthContext';
import { Form, Input, Button, Icon, notification } from 'antd';
const FormItem = Form.Item;

class Login extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm);
        return (
            <div className="login-container">
                <h1 className="page-title">Login</h1>
                <div className="login-content">
                    <AntWrappedLoginForm />
                </div>
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);

        notification.config({
            placement: 'bottomRight',
            bottom: 20,
            duration: 1,
        });

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event,handleLogin) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {

            if (!err) {
                const loginRequest = Object.assign({}, values);

                login(loginRequest)
                    .then(response => {
                        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                        handleLogin();

                    }).catch(error => {
                    if(error.status === 401) {
                        notification.error({
                            message: APP_NAME,
                            description: 'Your Username or Password is incorrect. Please try again!'
                        });
                    } else {
                        notification.error({
                            message: APP_NAME,
                            description: error.message || 'Sorry! Something went wrong. Please try again!'
                        });
                    }
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <AuthConsumer>
                { ({handleLogin})=>
                    <Form onSubmit={(event)=>this.handleSubmit(event,handleLogin)} className="login-form">
                    <FormItem>
                        {getFieldDecorator('usernameOrEmail', {
                            rules: [{ required: true, message: 'Please input your username or email!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" />}
                                size="large"
                                name="usernameOrEmail"
                                placeholder="Username or Email" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" />}
                                size="large"
                                name="password"
                                type="password"
                                placeholder="Password"  />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>

                    </FormItem>
                </Form>}
            </AuthConsumer>
        );
    }
}


export default Login;