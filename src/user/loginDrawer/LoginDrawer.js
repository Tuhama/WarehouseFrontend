import React, {Component} from 'react';
import './LoginDrawer.less';

import {Drawer, Icon} from 'antd';
import Login from '../login/Login';
import Signup from '../signup/Signup';
import Profile from '../profile/Profile';
import {AuthConsumer} from '../../user/AuthContext';


export default class LoginDrawer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signUp: false
        };
        this.switchSign = this.switchSign.bind(this);
    }


    switchSign() {
        this.setState({
            signUp: !this.state.signUp,
        });
    }


    render() {

        return (

            <AuthConsumer>
                {({isAuthenticated}) => isAuthenticated
                    ? (

                        <Drawer
                            title="User"
                            placement="right"
                            onClose={this.props.onClose}
                            width="400px"
                            visible={this.props.visible}
                        >
                            <Profile/>
                        </Drawer>

                    ) : (
                        <Drawer
                            title="User"
                            placement="right"
                            onClose={this.props.onClose}
                            width="400px"
                            visible={this.props.visible}
                        >

                            {(this.state.signUp) ?
                                <Signup/>
                                :
                                <Login/>}


                            {(this.state.signUp) ?
                                <div>Already registered? <span style={{color: "blue", cursor: "pointer"}}
                                                               onClick={this.switchSign}>Login now!</span></div>
                                :
                                <div> Or <span style={{color: "blue", cursor: "pointer"}} onClick={this.switchSign}>register now!</span>
                                </div>}
                        </Drawer>
                    )}
            </AuthConsumer>
        );
    }
}


