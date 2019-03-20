import React, {Component} from 'react';

import './App.css';
import { withRouter,Route, Switch, Redirect} from 'react-router-dom';

import SideMenu from './components/ui/SideMenu';
import Header from './components/ui/Header';

import NewEmployee from './components/indexes/employee/NewEmployee';
import NewSubMaterial from './components/indexes/subMaterial/NewSubMaterial';
import NewMaterial from './components/indexes/material/NewMaterial';
import NewMatReq from './components/matdelreq/NewMatReq';
import MatReq from './components/matdelreq/MatReq';
import NewIndex from './components/indexes/basicIndex/NewIndex';

import { LocaleProvider,  Row, Col} from 'antd';
import ar from 'antd/lib/locale-provider/ar_EG';
import { AuthProvider } from "./user/AuthContext";



class App extends Component {


    render() {
        let params = new URLSearchParams(this.props.location.search);
        return (
            <AuthProvider>
            <LocaleProvider locale={ar}>

                <div style={{direction: 'rtl', height: '100vh',width:'100vw'}}>
                    <Header />
                    <Row style={{height:'80vh'}}>

                        <Col span={18}>

                                <Switch>

                                        <Route exact path="/" render={() => <Redirect to='/newmatdelreq'/>}/>

                                        <Route  path="/positions"
                                               component={ () => <NewIndex indexType='positions'/>}/>
                                        <Route  path="/departments"
                                               component={ () => <NewIndex indexType='departments'/>}/>

                                        <Route  path="/contacts"
                                               component={() => <NewIndex indexType='contacts'/>}/>
                                        <Route
                                            exact
                                            path="/units"
                                            component={() => <NewIndex indexType="units" />}/>
                                        <Route
                                            exact
                                            path="/users"
                                            component={ () => <NewIndex indexType="users" />}/>

                                        <Route  path="/materials" component={NewMaterial}/>
                                        <Route  path="/submaterials" component={NewSubMaterial}/>
                                        <Route  path="/employees" component={NewEmployee}/>


                                        <Route  path="/newmatdelreq" component={NewMatReq}/>
                                    <Route  path="/matdelreq" component={() => <MatReq id={params.get("id")}/>}/>
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


                                </Switch>

                        </Col>
                        <Col span={6}>
                            <Route path="/" render={(props) => <SideMenu {...props}/>} />
                        </Col>
                    </Row>
                    <Row style={{textAlign: 'center',height:'5vh'}}>

                        ©2018 Created by Team

                    </Row>
                </div>

            </LocaleProvider>
            </AuthProvider>
        );
    }
}

export default withRouter(App);
