import React, {Component} from 'react';

import EmployeeList from './EmployeeList';
import {createEmployee, getAllIndexes} from '../../util/APIUtils';


import {Form, Input, Button, Select} from 'antd';

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
                text: ''
            },
            departmentId:
                0
            ,
            positionId:
                0
            ,
            positions: []
            ,
            departments: []

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleFnameChange = this.handleFnameChange.bind(this);
        this.handleLnameChange = this.handleLnameChange.bind(this);
        this.handleMnameChange = this.handleMnameChange.bind(this);
        this.handleNatIdChange = this.handleNatIdChange.bind(this);
        this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
        this.handlePositionChange = this.handlePositionChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }


    async loadPositions() {

        let p = getAllIndexes("positions");

        if (!p) {
            return;
        }
        try {
            var data = await p;

            const positions = this.state.positions.slice();
            this.setState({
                positions: positions.concat(data),
                isLoading: false
            });
        } catch (err) {
            this.setState({
                isLoading: false
            });
        }
    }

    async loadDepartments() {

        let p = getAllIndexes("departments");

        if (!p) {
            return;
        }
        try {
            var data = await p;

            const departments = this.state.departments.slice();
            this.setState({
                departments: departments.concat(data),
                isLoading: false
            });
        } catch (err) {
            this.setState({
                isLoading: false
            });
        }
    }

    componentDidMount() {
        this.loadDepartments();
        this.loadPositions();
    }

    handleSubmit(event) {
        event.preventDefault();

        const employeeData = {
            name: this.state.name.text,
            lname: this.state.lname.text,
            fname: this.state.fname.text,
            mname: this.state.mname.text,
            natId: this.state.natId.text,
            department: this.state.departments.find(x => x.id == this.state.departmentId),
            position: this.state.positions.find(x => x.id == this.state.positionId),
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

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({
            name: {
                text: value,
                ...this.validateName(value)
            }
        });
    }
    handleFnameChange(event) {
        const value = event.target.value;
        this.setState({
            fname: {
                text: value,
                ...this.validateName(value)
            }
        });
    }
    handleLnameChange(event) {
        const value = event.target.value;
        this.setState({
            lname: {
                text: value,
                ...this.validateName(value)
            }
        });
    }
    handleMnameChange(event) {
        const value = event.target.value;
        this.setState({
            mname: {
                text: value,
                ...this.validateName(value)
            }
        });
    }
    handleNatIdChange(event) {
        const value = event.target.value;
        this.setState({
            natId: {
                text: value,
                ...this.validateName(value)
            }
        });
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
                <EmployeeList/>
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
                                onChange={this.handleNameChange}
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
                                onChange={this.handleFnameChange}
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
                                onChange={this.handleLnameChange}
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
                                onChange={this.handleMnameChange}
                            />
                        </FormItem>
                        <FormItem validateStatus={this.state.natId.validateStatus}
                                  help={this.state.natId.errorMsg} className="index-form-row">
                            <FormText
                                placeholder="الرقم الوطني هنا"
                                style={{fontSize: '16px'}}
                                autosize={{minRows: 3, maxRows: 6}}
                                name="natId"
                                value={this.state.natId.text}
                                onChange={this.handleNatIdChange}
                            />
                        </FormItem>
                        <FormItem validateStatus={this.state.name.department}
                                  help={this.state.departmentId.errorMsg} className="index-form-row">

                            <span style={{marginRight: '18px'}}>
                                &nbsp;القسم:
                                    <Select
                                        name="days"
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
                                        name="days"
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