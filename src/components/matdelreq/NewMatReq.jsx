import React, {Component} from 'react';

//import { createEntry } from '../../../util/APIUtils';
import FormHeader from '../common/FormHeader'

//import { MAX_CHOICES, POLL_QUESTION_MAX_LENGTH, POLL_CHOICE_MAX_LENGTH } from '../constants';
//import './NewMatDelReq.css';
import {Form, Input, Button, Icon, Row, Select, Col, notification} from 'antd';
import {createMatReq, getAllEmployees, getAllIndexes} from "../../util/APIUtils";
import moment from "moment/moment";

import TempGrid from "./TempGrid";
import {AuthConsumer} from "../../user/AuthContext";
import {APP_NAME} from "../../constants";

const FormItem = Form.Item;
const FormText = Input;
const Option = Select.Option;

const dateFormat = 'YYYY/MM/DD';

class NewMatReq extends Component {
    constructor(props) {
        super(props);
        this.state = {

            applicantEmpId:
                0
            ,
            details: [],

            folderNumber: {
                text: ''
            },
            serialNumber: {
                text: ''
            },
            date: {
                text: moment('2019/01/01', dateFormat)
            }
            ,
            employees: null,
            subMaterials:null,
            subMaterialOptions:null,
            isLoading: false
        };


        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleApplicantEmpChange = this.handleApplicantEmpChange.bind(this);
        this.handleDetails = this.handleDetails.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.loadEmployeeList = this.loadEmployeeList.bind(this);

    }

    handleInputChange(event) {

        const target = event.target;


        if (target) {
            const value = target.type === 'checkbox' ? target.checked : target.value;

            const name = target.name;

            this.setState({
                [name]: {text: value}
            });
        }
        ///in case of date>>>the event is the value (not: for select elements we use separate methods)
        else {
            this.setState({
                date: {text: event}
            });
        }
    }
    handleApplicantEmpChange(value) {
        this.setState({
            applicantEmpId: value
        });
    }
    loadEmployeeList() {
        let promise = getAllEmployees();

        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {
                this.setState({
                    employees: response,
                    isLoading: false
                });
            }).catch(err => {
            this.setState({
                employees: null,
                isLoading: false
            });
        })
    }
     loadSubMaterials() {
        let promise;

        promise = getAllIndexes("subMaterials");
        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {


                let subMaterialOptions = {};
                response.map(sm => {

                    subMaterialOptions[ sm.id ] = sm.name;

                   // subMaterialOptions[sm.id]= sm.name;

                    return subMaterialOptions;
                });

                this.setState({
                    subMaterialOptions:subMaterialOptions,
                    subMaterials: response,
                    isLoading: false
                });
            }).catch(err => {
            this.setState({
                subMaterialOptions:null,
                subMaterials: null,
                isLoading: false
            });
        })
        /*        let p = getAllIndexes("subMaterials");

                if (!p) {
                    return;
                }
                try {
                    let data = await p;
                    let options = {};
                    data.map(sm => {
                        options[sm.name]= sm.name;

                        return options;});
                    this.subMaterials =options;
                } catch (err) {

                }*/
    }
    componentDidMount() {
        this.loadEmployeeList();
        this.loadSubMaterials();
    }


    handleSubmit(event,handleLogout) {
        event.preventDefault();

        ///replace subMaterial id with subMaterial object

let afterReplace=[];
        this.state.details.map(d =>
        {
           // afterReplace=d;
            d.subMaterial=this.state.subMaterials[parseInt(d.subMaterial)];
            afterReplace.push(d);
            return afterReplace;
        });


         const reqData = {
             date: this.state.date.text,
             serial: this.state.serialNumber.text,
             folderNum: this.state.folderNumber.text,

             employeeByApplicantEmpId: this.state.employees.find(x => x.id == this.state.applicantEmpId),

             matDelReqDetails: afterReplace
         };

         createMatReq(reqData)
             .then(response => {

                 this.props.history.push("/matdelreq?id="+response.id);
             }).catch(error => {
             if(error.status === 401) {
                 handleLogout('/login', 'error', 'الرجاء تسجيل الدخول للقيام بالعملية!');
             } else {
                 notification.error({
                     message: APP_NAME,
                     description: error.message || 'فشل العملية..يرجى المحاولة مرة ثانية.'
                 });
             }
         });
    }


    isFormInvalid() {
        return false;
        /*        if(this.state.name.validateStatus !== 'success') {
                    return true;
                }*/
    }

    handleDetails(details) {
        this.setState({details : details});
    }


    render() {
        //don't load async inside render
        if (!this.state.employees)

            return <span></span>
        else {
            return (
                <AuthConsumer>
                    { ({handleLogout})=>
                <div>
                    <Form onSubmit={(event)=>this.handleSubmit(event,handleLogout)}>
                        <Row>

                            <Col span={6}>
                                <FormHeader folderNum={this.state.folderNumber.text}
                                            serialNum={this.state.serialNumber.text} date={this.state.date.text}
                                            onInputChange={this.handleInputChange}/>
                            </Col>
                            <Col span={18}>
                                <Row>
                                    <h2>طلب تسليم مواد</h2>
                                </Row>
                                <Row>
                                    <FormItem
                                        help={this.state.applicantEmpId.errorMsg}>


                                        <span style={{marginRight: '18px'}}>

                                &nbsp;الجهة الطالبة:
                                    <Select
                                        name="applicantEmpId"
                                        onChange={this.handleApplicantEmpChange}
                                        value={this.state.applicantEmpId}
                                    >
                                        {
                                            this.state.employees.map(emp =>
                                                <Option key={emp.id}>{emp.name + " " + emp.lname}</Option>
                                            )
                                        }

                                    </Select>
                            </span>
                                    </FormItem>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <TempGrid data={this.state.details} subMaterials={this.state.subMaterialOptions} reqDetails={this.handleDetails}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Button type="primary"
                                        htmlType="submit"
                                        size="small"
                                        disabled={this.isFormInvalid()}
                                        className="create-index-form-button">حفظ</Button>
                            </Col>
                        </Row>

                    </Form>
                </div>}
                </AuthConsumer>
            );
        }
    }
}

export default NewMatReq;