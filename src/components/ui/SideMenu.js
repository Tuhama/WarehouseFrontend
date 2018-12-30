import React, {Component} from 'react';


import {Link} from 'react-router-dom';
import {Menu, Icon} from 'antd';
//import { withRouter } from "react-router";

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
                        <Link to="/matdelreq">
                            طلب تسليم مواد
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <Link to="/internaldelivery">
                            مذكرة تسليم
                        </Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu key="sub2" title={<span>فهارس</span>}>
                    <Menu.Item key="1">
                        <Link to="/employee">
                            موظفين
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/position">
                            مواقع وظيفية
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/department">
                            أقسام
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/material">
                            أصناف رئيسية
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to="/submaterial">
                            المواد
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Link to="/contact">
                            الجهات الخارجية
                        </Link>
                    </Menu.Item>
                </SubMenu>

            </Menu>


        );
    }
}

export default SideMenu;