import React, {Component} from 'react';

import {createIndex,getAllIndexes} from '../../../util/APIUtils';

//import { MAX_CHOICES, POLL_QUESTION_MAX_LENGTH, POLL_CHOICE_MAX_LENGTH } from '../constants';
import './NewSubMaterial.css';
import {Form, Input, Button,Select, Icon, Col, notification} from 'antd';
import SubMaterialList from './SubMaterialList';

const FormItem = Form.Item;
const FormText = Input;
const Option = Select.Option;

class NewSubMaterial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                text: ''
            },
            min: {
                text: ''
            },
            max: {
                text: ''
            },
            quantity: {
                text: ''
            },
            note: {
                text: ''
            },
            materialId:0,
            materials: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleMaterialChange = this.handleMaterialChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }


    async loadMaterials() {

        let p = getAllIndexes("materials");

        if (!p) {
            return;
        }
        try {
            var data = await p;
 console.log("load: "+data);
            const materials = this.state.materials.slice();
            this.setState({
                materials: materials.concat(data),
                isLoading: false
            });
        } catch (err) {
            this.setState({
                isLoading: false
            });
        }
        console.log("load2: "+this.state.materials);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: {text: value}
        });
    }

/*
    loadMaterials() {
        let promise;

        /!*        if(this.props.username) {
                    if(this.props.type === 'USER_CREATED_POLLS') {
                        promise = getUserCreatedPolls(this.props.username, page, size);
                    } else if (this.props.type === 'USER_VOTED_POLLS') {
                        promise = getUserVotedPolls(this.props.username, page, size);
                    }
                } else*!/
        {
            promise = getAllIndexes("materials");
        }

        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {
                const materials = this.state.materials.slice();

                this.setState({
                    materials: materials.concat(response.content),
                    //isLoading: false
                })
            }).catch(error => {
            /!*            this.setState({
                            isLoading: false
                        })*!/
        });

    }*/

    componentDidMount() {
        this.loadMaterials();
    }


    handleSubmit(event) {
        event.preventDefault();
        const subMaterialData = {
            name: this.state.name.text,
            min: this.state.min.text,
            max: this.state.max.text,
            quantity: this.state.quantity.text,
            note: this.state.note.text,
            material: this.state.materials.find(x => x.id == this.state.materialId),
        };
        console.log(subMaterialData);
        createIndex("subMaterials", subMaterialData)
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



    handleMaterialChange(value) {
        this.setState({
            materialId: value
        });
    }
    isFormInvalid() {
        if (this.state.name.validateStatus !== 'success') {
            return false;
        }
    }

    render() {

        return (

            <div className="new-index-container">
                <SubMaterialList/>
                <h1 className="page-title">مادة جديدة</h1>
                <div className="new-index-content">
                    <Form onSubmit={this.handleSubmit} className="create-subMaterial-form">
                        <FormItem  className="index-form-row">

                            <span style={{marginRight: '18px'}}>
                                &nbsp;الصنف:
                                    <Select
                                        name="materialId"
                                        defaultValue="1"
                                        onChange={this.handleMaterialChange}
                                        value={this.state.materialId}
                                    >
                                        {
                                            this.state.materials.map(mat =>
                                                <Option key={mat.id}>{mat.name}</Option>
                                            )
                                        }

                                    </Select>
                            </span>
                        </FormItem>
                        <FormItem  className="index-form-row">
                            <FormText
                                placeholder="ادخل الاسم هنا"
                                style={{fontSize: '16px'}}
                                autosize={{minRows: 3, maxRows: 6}}
                                name="name"
                                value={this.state.name.text}
                                onChange={this.handleInputChange}
                            />
                        </FormItem>
                        <FormItem  className="index-form-row">
                            <FormText
                                placeholder="الحد الأدنى"
                                style={{fontSize: '16px'}}
                                autosize={{minRows: 3, maxRows: 6}}
                                name="min"
                                value={this.state.min.text}
                                onChange={this.handleInputChange}
                            />
                        </FormItem>
                        <FormItem  className="index-form-row">
                            <FormText
                                placeholder="الحد الأعلى"
                                style={{fontSize: '16px'}}
                                autosize={{minRows: 3, maxRows: 6}}
                                name="max"
                                value={this.state.max.text}
                                onChange={this.handleInputChange}
                            />
                        </FormItem>
                        <FormItem  className="index-form-row">
                            <FormText
                                placeholder="الكمية"
                                style={{fontSize: '16px'}}
                                autosize={{minRows: 3, maxRows: 6}}
                                name="quantity"
                                value={this.state.quantity.text}
                                onChange={this.handleInputChange}
                            />
                        </FormItem>
                        <FormItem  className="index-form-row">
                            <FormText
                                placeholder="ادخل الاسم هنا"
                                style={{fontSize: '16px'}}
                                autosize={{minRows: 3, maxRows: 6}}
                                name="note"
                                value={this.state.note.text}
                                onChange={this.handleInputChange}
                            />
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

export default NewSubMaterial;