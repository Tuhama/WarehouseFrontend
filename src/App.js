import React, {Component} from 'react';

import './App.css';
import {Route, withRouter, Switch, Redirect} from 'react-router-dom';

import SideMenu from './components/ui/SideMenu';

import NewPosition from './components/indexes/position/NewPosition';
import NewDepartment from './components/indexes/department/NewDepartment';
import NewEmployee from './components/employee/NewEmployee';

import {LocaleProvider, Layout} from 'antd';
import ar from 'antd/lib/locale-provider/ar_EG';



const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
    render() {
        return (
            <LocaleProvider locale={ar}>
                <Switch >

                    <Layout style={{direction: 'rtl', minHeight: '100vh'}}>
                        <Header>Header</Header>
                        <Layout>
                            <Sider>
                                <SideMenu/>
                            </Sider>
                            <Content>
                                <div>
                                    <Route exact path="/" render={() => <Redirect to='/position'/>}/>
                                    <Route exact path="/position" component={NewPosition}/>
                                    <Route exact path="/department" component={NewDepartment}/>

                                    <Route exact path="/employee" component={NewEmployee}/>


                                    {/*    <Route exact path="/"
                               render={(props) => <PollList isAuthenticated={this.state.isAuthenticated}
                                                            currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}>
                        </Route>
                      <Route path="/login"
                               render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                        <Route path="/signup" component={Signup}></Route>
                        <Route path="/users/:username"
                               render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                        </Route>
                        <PrivateRoute authenticated={this.state.isAuthenticated} path="/poll/new" component={NewPoll} handleLogout={this.handleLogout}></PrivateRoute>
                        <Route component={NotFound}></Route>*/}

                                </div>
                            </Content>

                        </Layout>
                        <Footer style={{ textAlign: 'center' }}>
                            ©2018 Created by Team
                        </Footer>
                    </Layout>

                </Switch>
            </LocaleProvider>
        );
    }
}

export default withRouter(App);
