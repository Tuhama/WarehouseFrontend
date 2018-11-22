import React, {Component} from 'react';


import {
    Link,
    withRouter,

} from 'react-router-dom';
import {Menu, Icon} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class SideMenu extends Component {
    render() {
        return (

            <Menu
                onClick={this.handleClick}
                style={{width: 256}}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu key="sub1" title={<span>فهارس</span>}>

                    <Menu.Item key="1">
                        <Link to="/position">
                            مواقع وظيفية
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/department">
                            أقسام
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>

                </SubMenu>
                <SubMenu key="sub2" title={<span><span>موظفين</span></span>}>
                    <Menu.Item key="5">
                        <Link to="/employee">
                        موظف جديد
                    </Link></Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <SubMenu key="sub4" title={<span><Icon type="setting"/><span>Navigation Three</span></span>}>
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
            </Menu>


        );
    }
}

export default withRouter(SideMenu);