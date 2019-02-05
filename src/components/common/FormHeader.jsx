import React, { Component } from 'react';

//import { createEntry } from '../../../util/APIUtils';

//import { MAX_CHOICES, POLL_QUESTION_MAX_LENGTH, POLL_CHOICE_MAX_LENGTH } from '../constants';

import { Form, Input, DatePicker } from 'antd';
import moment from 'moment';


const FormItem = Form.Item;
const  FormText  = Input;

const dateFormat = 'YYYY/MM/DD';

const formItemLayout = {

    wrapperCol: {
       span: 14 ,
    },
};

class FormHeader extends Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.props.onInputChange(event);
    }

    isFormInvalid() {
        if(this.state.name.validateStatus !== 'success') {
            return true;
        }
    }

    render() {

        return (

            <div >

                <FormItem label="رقم المجلد:"
                          {...formItemLayout}
                          /*validateStatus={this.state.name.validateStatus}
                          help={this.state.name.errorMsg}*/>
                    <FormText
                        placeholder="رقم المجلد هنا"
                        style={{fontSize: '10px'}}
                        autosize={{minRows: 3, maxRows: 6}}
                        name="folderNumber"
                        value={this.props.folderNum}
                        onChange={this.handleInputChange}
                    />
                </FormItem>
                {/*validateStatus={this.state.serialNumber.validateStatus}
                          help={this.state.serialNumber.errorMsg}*/}
                <FormItem  {...formItemLayout} label="الرقم المتسلسل:" className="index-form-row">

                    <FormText
                        placeholder="الرقم المتسلسل هنا"
                        style={{fontSize: '10px'}}

                        name="serialNumber"
                        value={this.props.serialNum}
                        onChange={this.handleInputChange}
                    />
                </FormItem>
                {/*validateStatus={this.state.date.validateStatus}
                          help={this.state.date.errorMsg}*/}
                <FormItem  {...formItemLayout} label="التاريخ:"  >
                <DatePicker name="date"  style={{fontSize: '10px'}}
                            value={moment(this.props.date)}   format={dateFormat}  onChange={this.handleInputChange} />
                </FormItem>
            </div>
        );
    }
}
export default FormHeader;