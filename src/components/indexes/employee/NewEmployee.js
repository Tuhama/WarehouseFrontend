import React, {Component} from 'react';

import EmployeeList from './EmployeeList';
import {createEmployee, getAllEmployees, getAllIndexes} from '../../../util/APIUtils';


import {Form, Input, Button, Select, InputNumber } from 'antd';
import LoadingIndicator from "../../ui/LoadingIndicator";

const FormItem = Form.Item;
const FormText = Input;
const Option = Select.Option;

class NewEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                text: ''
            },
            fname: {
                text: ''
            },
            lname: {
                text: ''
            },
            mname: {
                text: ''
            },
            natId: {
                text: 0
            },
            departmentId:
                0
            ,
            positionId:
                0
            ,
            positions: []
            ,
            departments: [],
            employees: [],
            isLoading: false

        };
        //this.loadEmployeeList = this.loadEmployeeList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
        this.handlePositionChange = this.handlePositionChange.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);

        this.isFormInvalid = this.isFormInvalid.bind(this);
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: {text: value}
        });
    }

    loadEmployeeList() {
        let promise =  getAllEmployees();

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

     loadPositions() {
         let promise =  getAllIndexes("positions");

         if (!promise) {
             return;
         }

         this.setState({
             isLoading: true
         });

         promise
             .then(response => {
                 this.setState({
                     positions: response,
                     isLoading: false
                 });
             }).catch(err => {
             this.setState({
                 positions: null,
                 isLoading: false
             });
         })
     }

     loadDepartments() {
         let promise =  getAllIndexes("departments");

         if (!promise) {
             return;
         }

         this.setState({
             isLoading: true
         });

         promise
             .then(response => {
                 this.setState({
                     departments: response,
                     isLoading: false
                 });
             }).catch(err => {
             this.setState({
                 departments: null,
                 isLoading: false
             });
         })
    }

    componentDidMount() {
        this.loadDepartments();
        this.loadPositions();
        this.loadEmployeeList();
    }

    handleSubmit(event) {
        event.preventDefault();

        const employeeData = {
            name: this.state.name.text,
            lname: this.state.lname.text,
            fname: this.state.fname.text,
            mname: this.state.mname.text,
            natId: this.state.natId.text,
            department: this.state.departments.find(x => x.id === this.state.departmentId),
            position: this.state.positions.find(x => x.id === this.state.positionId),
        };

        createEmployee(employeeData)

            .then(response => {
                this.props.history.push("/");
            })/*.catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create poll.');
            } else {
                notification.error({
                    message: 'Polling App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            }
        })*/;
    }

    validateName = (nameText) => {
        if (nameText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'الرجاء ادخال اسم'
            }
        } /*else if (nameText.length > POLL_QUESTION_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Question is too long (Maximum ${POLL_QUESTION_MAX_LENGTH} characters allowed)`
            }
        } */ else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handlePositionChange(value) {
        this.setState({
            positionId: value
        });
    }
    handleDepartmentChange(value) {
        this.setState({
            departmentId: value
        });
    }
    isFormInvalid() {
        if (this.state.name.validateStatus !== 'success') {
            return true;
        }
    }

    render() {

        return (

            <div className="new-index-container">

                <EmployeeList employees={this.state.employees}/>

                {
                    this.state.isLoading ?
                        <LoadingIndicator />: null
                }


                <h1 className="page-title">موظف جديد</h1>
                <div className="new-index-content">
                    <Form onSubmit={this.handleSubmit} className="create-position-form">
                        <FormItem validateStatus={this.state.name.validateStatus}
                                  help={this.state.name.errorMsg} className="index-form-row">
                            <FormText
                                placeholder="ادخل الاسم هنا"
                                style={{fontSize: '16px'}}
                                autosize={{minRows: 3, maxRows: 6}}
                                name="name"
                                value={this.state.name.text}
                                onChange={this.handleInputChange}
                            />
                        </FormItem>
                        <FormItem validateStatus={this.state.fname.validateStatus}
                                  help={this.state.fname.errorMsg} className="index-form-row">
                            <FormText
                                placeholder="اسم الاب هنا"
                                style={{fontSize: '16px'}}
                                autosize={{minRows: 3, maxRows: 6}}
                                name="fname"
                                value={this.state.fname.text}
                                onChange={this.handleInputChange}
                            />
                        </FormItem>
                        <FormItem validateStatus={this.state.lname.validateStatus}
                                  help={this.state.lname.errorMsg} className="index-form-row">
                            <FormText
                                placeholder="الكنية هنا"
                                style={{fontSize: '16px'}}
                                autosize={{minRows: 3, maxRows: 6}}
                                name="lname"
                                value={this.state.lname.text}
                                onChange={this.handleInputChange}
                            />
                        </FormItem>
                        <FormItem validateStatus={this.state.mname.validateStatus}
                                  help={this.state.mname.errorMsg} className="index-form-row">
                            <FormText
                                placeholder="اسم الام هنا"
                                style={{fontSize: '16px'}}
                                autosize={{minRows: 3, maxRows: 6}}
                                name="mname"
                                value={this.state.mname.text}
                                onChange={this.handleInputChange}
                            />
                        </FormItem>
                        <FormItem validateStatus={this.state.natId.validateStatus}
                                  help={this.state.natId.errorMsg} >
                            <FormText
                                placeholder="الرقم الوطني هنا"
                                style={{fontSize: '16px'}}
                                autosize={{minRows: 3, maxRows: 6}}
                                name="natId"
                                value={this.state.natId.text}
                                onChange={this.handleInputChange}
                            />
                        </FormItem>
                        <FormItem validateStatus={this.state.name.department}
                                  help={this.state.departmentId.errorMsg} className="index-form-row">

                            <span style={{marginRight: '18px'}}>
                                &nbsp;القسم:
                                    <Select
                                        name="departmentId"
                                        defaultValue="1"
                                        onChange={this.handleDepartmentChange}
                                        value={this.state.departmentId}
                                        >
                                        {
                                            this.state.departments.map(dep =>
                                                <Option key={dep.id}>{dep.name}</Option>
                                            )
                                        }

                                    </Select>
</span>
                        </FormItem>
                        <FormItem validateStatus={this.state.name.department}
                                  help={this.state.departmentId.errorMsg} className="index-form-row">

                            <span style={{marginRight: '18px'}}>

                                &nbsp;الموقع الوظيفي:
                                    <Select
                                        name="positionId"
                                        defaultValue="1"
                                        onChange={this.handlePositionChange}
                                        value={this.state.positionId}
                                        >
                                        {
                                            this.state.positions.map(pos =>
                                                <Option key={pos.id}>{pos.name}</Option>
                                            )
                                        }

                                    </Select>
                            </span>
                        </FormItem>
                        <FormItem className="index-form-row">
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    disabled={this.isFormInvalid()}
                                    className="create-index-form-button">حفظ</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default NewEmployee;