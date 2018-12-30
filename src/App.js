import React, {Component} from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
//import { withRouter } from "react-router";

import SideMenu from './components/ui/SideMenu';

//import NewPosition from './components/indexes/position/NewPosition';
//import NewDepartment from './components/indexes/department/NewDepartment';
//import NewMaterial from './components/indexes/material/NewMaterial';
import NewEmployee from './components/indexes/employee/NewEmployee';
import NewSubMaterial from './components/indexes/subMaterial/NewSubMaterial';
import NewMaterial from './components/indexes/material/NewMaterial';
import NewMatReq from './components/matdelreq/NewMatReq';
import NewIndex from './components/indexes/basicIndex/NewIndex';

import {LocaleProvider,  Row, Col} from 'antd';
import ar from 'antd/lib/locale-provider/ar_EG';



class App extends Component {
    render() {
        return (
            <Router>
            <LocaleProvider locale={ar}>


                {/*<Layout style={{direction: 'rtl', minHeight: '100vh'}}>*/}
                <div style={{direction: 'rtl', height: '100vh',width:'100vw'}}>
                    <Row  style={{textAlign: 'center',height:'15vh',backgroundColor:'rgb(24, 144, 255)'}}>
                        <h2>برنامج إدارة المستودع</h2>
                    </Row>
                    <Row style={{height:'80vh'}}>

                        <Col span={18}>

                                <Switch>

                                        <Route exact path="/" render={() => <Redirect to='/matdelreq'/>}/>

                                        <Route exact path="/position"
                                               component={() => <NewIndex indexType='positions'/>}/>
                                        <Route exact path="/department"
                                               component={() => <NewIndex indexType='departments'/>}/>
                                        <Route exact path="/contact"
                                               component={() => <NewIndex indexType='contacts'/>}/>
                                        <Route exact path="/material" component={NewMaterial}/>


                                        <Route exact path="/submaterial" component={NewSubMaterial}/>
                                        <Route exact path="/employee" component={NewEmployee}/>


                                        <Route exact path="/matdelreq" component={NewMatReq}/>

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
                                <SideMenu/>
                        </Col>
                    </Row>
<Row style={{textAlign: 'center',height:'5vh'}}>

                        ©2018 Created by Team

</Row>
                </div>


            </LocaleProvider>
            </Router>
        );
    }
}

export default App;
