import React, {Component} from 'react';


import {withRouter,NavLink} from 'react-router-dom';
import {Menu, Icon} from 'antd';
import PropTypes from 'prop-types';


const SubMenu = Menu.SubMenu;


class SideMenu extends Component {

    static propTypes = {
        location: PropTypes.object.isRequired
    }
    render() {
        const { location } = this.props;
        return (

            <Menu
                //onClick={this.handleClick}
                // style={{width: 256}}
                //theme="dark"
                selectedKeys={[location.pathname]}
                //defaultSelectedKeys={['11']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >

                <SubMenu key="sub1" title={<span></span>}>

                    <Menu.Item key="/newmatdelreq">
                        <NavLink to="/newmatdelreq">
                            طلب تسليم مواد
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/internaldelivery">
                        <NavLink to="/internaldelivery">
                            مذكرة تسليم
                        </NavLink>
                    </Menu.Item>
                </SubMenu>

                <SubMenu key="sub2" title={<span>فهارس</span>}>
                    <Menu.Item key="/employees">
                        <NavLink to="/employees">
                            موظفين
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/positions">
                        <NavLink to="/positions">
                            مواقع وظيفية
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/departments">
                        <NavLink to="/departments">
                            أقسام
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/materials">
                        <NavLink to="/materials">
                            أصناف رئيسية
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/submaterials">
                        <NavLink to="/submaterials">
                            المواد
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/contacts">
                        <NavLink to="/contacts">
                            الجهات الخارجية
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/units">
                        <NavLink to="/units">الواحدات</NavLink>
                    </Menu.Item>
                    <Menu.Item key="/users">
                        <NavLink to="/users">المستخدمين</NavLink>
                    </Menu.Item>

                </SubMenu>

            </Menu>


        );
    }
}

export default withRouter(SideMenu);