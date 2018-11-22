import React, {Component} from 'react';
import {getAllIndexes} from '../../../util/APIUtils';

import { Table, Divider, Tag } from 'antd';

import {withRouter} from 'react-router-dom';
import './PositionList.css';


const columns = [{
    title: <p  className="table-header">الاسم</p>,
    dataIndex: 'name',
    key: 'name',
    className:'table-header',
    render: text => <a href="javascript:;">{text}</a>,
}, {
    title: <p  className="table-header">*</p>,
    key: 'action',
    className:'table-header',
    render: (text, record) => (
        <span>
      <a  href="javascript:;">حذف</a>
    </span>
    ),
}];


class PositionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            positions: [],
            isLoading: false
        };
        this.loadPositionList = this.loadPositionList.bind(this);
    }

    async loadPositionList() {

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

    componentDidMount() {
        this.loadPositionList();
    }

    /*    componentDidUpdate(nextProps) {
            if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
                // Reset State
                this.setState({
                    positions: [],
                    isLoading: false
                });
                this.loadPositionList();
           }
        }*/

    render() {
        return (
            <div className="positions-container">
                <Table size="small" columns={columns} dataSource={ this.state.positions} />

                {
                    !this.state.isLoading && this.state.positions.length === 0 ? (
                        <div className="no-positions-found">
                            <span>No Positions Found.</span>
                        </div>
                    ) : null
                }
                {/*                {
                    this.state.isLoading ?
                        <LoadingIndicator />: null
                }*/}
            </div>
        );
    }
}

export default withRouter(PositionList);