import React, {Component} from 'react';

//import { createEntry } from '../../../util/APIUtils';
import FormHeader from '../common/FormHeader'

//import { MAX_CHOICES, POLL_QUESTION_MAX_LENGTH, POLL_CHOICE_MAX_LENGTH } from '../constants';
//import './NewMatDelReq.css';
import {Form, Input, Button, Icon, Row, Select, Col, notification} from 'antd';
import {createMatReq, getAllEmployees, getAllIndexes} from "../../util/APIUtils";
import moment from "moment/moment";
//import EditableTable from "./MatReqGrid";


import EditableTable from "./MatReqGrid";
import TempGrid from "./TempGrid";

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
            employees: []
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
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        /* this.handleApplicantChange = this.handleApplicantChange.bind(this);
         this.handleFolderNumberChange = this.handleFolderNumberChange.bind(this);
         this.handleSerialNumberChange = this.handleSerialNumberChange.bind(this);
         this.handleDateChange = this.handleDateChange.bind(this);*/
this.handleDetails=this.handleDetails.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.loadEmployeeList = this.loadEmployeeList.bind(this);
    }

    handleInputChange(event) {
        console.log(event);
        const target = event.target;
        if (target) {
            const value = target.type === 'checkbox' ? target.checked : (target.type === 'date' ? moment(target.value, dateFormat) : target.value);
            const name = target.name;
console.log(name + ":"+ value)
            this.setState({
                [name]: {text: value}
            });
        }
    }

    async loadEmployeeList() {

        let p = getAllEmployees();

        if (!p) {
            return;
        }
        try {
            var data = await p;

            const employees = this.state.employees.slice();
            this.setState({
                employees: employees.concat(data),
                isLoading: false
            });
        } catch (err) {
            this.setState({
                isLoading: false
            });
        }
    }

    /*    handleApplicantChange(value) {
            this.setState({
                applicantEmpId: value
            });
        }

        handleFolderNumberChange(value) {

            this.setState({
                folderNumber: {
                    text: value,
                 //   ...this.validateName(value)
                }
            });
        }

        handleSerialNumberChange(value) {

            this.setState({
                serialNumber: {
                    text: value,
                    //...this.validateName(value)
                }
            });
        }

        handleDateChange(value) {
            this.setState({
                date: {
                    text:  moment(value, dateFormat),
                   /// ...this.validateName(value)
                }
            });
        }*/


    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state)

        /* const reqData = {
             date: this.state.date.text,
             serial: this.state.serialNumber.text,
             folderNum: this.state.folderNumber.text,

             employeeByApplicantEmpId: this.state.employees.find(x => x.id == this.state.applicantEmpId),
         };

         createMatReq(reqData)

             .then(response => {
                 this.props.history.push("/");
             })/!*.catch(error => {
             if(error.status === 401) {
                 this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create poll.');
             } else {
                 notification.error({
                     message: 'Polling App',
                     description: error.message || 'Sorry! Something went wrong. Please try again!'
                 });
             }
         })*!/;*/
    }


    isFormInvalid() {
        return false;
        /*        if(this.state.name.validateStatus !== 'success') {
                    return true;
                }*/
    }

    handleDetails(details) {
        this.state.details = details;
    }


    componentDidMount() {
        this.loadEmployeeList();
    }

    render() {
        return (

            <div>
                <Form onSubmit={this.handleSubmit}>
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
                                <FormItem>{/*validateStatus={this.state.applicantEmpId}
                                      help={this.state.applicantEmpId.errorMsg}*/}


                                    <span style={{marginRight: '18px'}}>

                                &nbsp;الجهة الطالبة:
                                    <Select
                                        name="applicantEmpId"
                                        defaultValue="1"
                                        onChange={this.handleInputChange}
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
                            {/*<EditableTable reqDetails={this.state.details} />*/}
                            {/*<MatReqTable />*/}
                            <TempGrid reqDetails={this.handleDetails}/>
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
            </div>
        );
    }


}

export default NewMatReq;