import React, {Component} from 'react';
import {getAllIndexes, deleteIndex, deleteEmployee} from '../../../util/APIUtils';

import { Table, Divider, Tag } from 'antd';

import {withRouter} from 'react-router-dom';
import './MaterialList.css';





class MaterialList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            positions: [],
            isLoading: false
        };
        this.loadPositionList = this.loadPositionList.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    async handleDelete(id) {

        let p = deleteIndex("positions",id);

        if (!p) {
            return;
        }
        try {
            var data = await p;

        } catch (err) {

        }
    }
    async loadPositionList() {

        let p = getAllIndexes("positions");

        if (!p) {
            return;
        }

            var data = await p;
            this.setState({
                positions: data
            })
/*
            const positions = this.state.positions.slice();
            this.setState({
                positions: positions.concat(data),
                isLoading: false
            });
        } catch (err) {
            this.setState({
                isLoading: false
            });
        }*/
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
                <button onClick={() => this.handleDelete(record.id)}>حذف</button>
            ),
        }];

        return (
            <div className="positions-container">
                <Table size="small" columns={columns} dataSource={ this.state.positions} rowKey="id" />

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

export default withRouter(MaterialList);