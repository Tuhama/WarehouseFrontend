import React, {Component} from 'react';

import { Menu, Dropdown, Icon, Button, Row } from 'antd';
import LoginDrawer from "../../user/loginDrawer/LoginDrawer";


class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginDVisible: false,
        };

        this.onLoginDrawerClose=this.onLoginDrawerClose.bind(this);
        this.showLoginDrawer=this.showLoginDrawer.bind(this);
    }
    showLoginDrawer = () => {
        this.setState({
            loginDVisible: true,
        });
    };
    onLoginDrawerClose = () => {
        this.setState({
            loginDVisible: false,
        });
    };
    render() {

        return (

            <Row  style={{textAlign: 'center',height:'15vh',backgroundColor:'rgb(24, 144, 255)'}}>

                <h2>برنامج إدارة المستودع</h2>

                <Button type="primary" icon="user" onClick={this.showLoginDrawer}></Button>
                <LoginDrawer onClose={this.onLoginDrawerClose} visible={this.state.loginDVisible}/>
            </Row>


        );
    }
}

export default Header;