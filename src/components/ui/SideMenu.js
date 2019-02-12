import React, {Component} from 'react';


import {NavLink} from 'react-router-dom';
import {Menu, Icon} from 'antd';
import { withRouter } from "react-router";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class SideMenu extends Component {


    render() {
        return (

            <Menu
                //onClick={this.handleClick}
                // style={{width: 256}}
                //theme="dark"
                defaultSelectedKeys={['7']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >

                <SubMenu key="sub1" title={<span></span>}>

                    <Menu.Item key="7">
                        <NavLink to="/matdelreq">
                            طلب تسليم مواد
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <NavLink to="/internaldelivery">
                            مذكرة تسليم
                        </NavLink>
                    </Menu.Item>
                </SubMenu>

                <SubMenu key="sub2" title={<span>فهارس</span>}>
                    <Menu.Item key="1">
                        <NavLink to="/employees">
                            موظفين
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <NavLink to="/positions">
                            مواقع وظيفية
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <NavLink to="/departments">
                            أقسام
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <NavLink to="/materials">
                            أصناف رئيسية
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <NavLink to="/submaterials">
                            المواد
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <NavLink to="/contacts">
                            الجهات الخارجية
                        </NavLink>
                    </Menu.Item>
                </SubMenu>

            </Menu>


        );
    }
}

export default SideMenu;