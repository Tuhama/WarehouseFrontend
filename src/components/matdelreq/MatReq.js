import React, {Component} from 'react';
import moment from "moment/moment";

export default class MatReq extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }



    render() {
        //don't load async inside render
        if (!this.state.employees)

            return <span>
                لا يوجد بيانات
            </span>
        else {
            return (
                <div>


                    {this.props.id}
                </div>

            );
        }
    }

}

