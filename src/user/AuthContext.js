import React from 'react';

import {
    notification
} from 'antd';

import {getCurrentUser} from "../util/APIUtils";

import {ACCESS_TOKEN, APP_NAME} from '../constants';

const AuthContext = React.createContext();

class AuthProvider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false,
        };


        notification.config({
            placement: 'bottomRight',
            bottom: 20,
            duration: 1,
        });

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
    }

    componentDidMount() {
        this.loadCurrentUser();
    }

    handleLogin() {
        notification.success({
            message: APP_NAME,
            description: "You're successfully logged in.",
        });
        this.loadCurrentUser();
    }

    loadCurrentUser() {
        console.log("loading user");
        this.setState({
            isLoading: true
        });
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoading: false
                });
            }).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }

    handleLogout(redirectTo = "/", notificationType = "success", description = "You're successfully logged out.") {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        notification[notificationType]({
            message: APP_NAME,
            description: description,
        });
    }

    render() {
        return (
            <AuthContext.Provider
                value={{
                    isAuthenticated: this.state.isAuthenticated,
                    currentUser: this.state.currentUser,
                    handleLogin: this.handleLogin,
                    handleLogout: this.handleLogout
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

const AuthConsumer = AuthContext.Consumer;

export {AuthProvider, AuthConsumer};