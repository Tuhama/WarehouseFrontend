import React, {Component} from 'react';

import './IndexList.css';
import {getAllIndexes, deleteIndex} from '../../../util/APIUtils';

import { Table } from 'antd';


export default class IndexList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            indexs: [],
            isLoading: false
        };
        this.loadIndexList = this.loadIndexList.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    async handleDelete(id) {

        let p = deleteIndex( this.props.indexType, id);

        if (!p) {
            return;
        }
        try {
            var data = await p;

        } catch (err) {

        }
    }
    async loadIndexList() {

        let p = getAllIndexes( this.props.indexType );

        if (!p) {
            return;
        }

            var data = await p;
            this.setState({
                indexs: data
            })
/*
            const indexs = this.state.indexs.slice();
            this.setState({
                indexs: indexs.concat(data),
                isLoading: false
            });
        } catch (err) {
            this.setState({
                isLoading: false
            });
        }*/
    }

    componentDidMount() {
        this.loadIndexList();
    }

    /*    componentDidUpdate(nextProps) {
            if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
                // Reset State
                this.setState({
                    indexs: [],
                    isLoading: false
                });
                this.loadIndexList();
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
            <div className="indexs-container">
                <Table size="small" columns={columns} dataSource={ this.state.indexs} rowKey="id" />

                {
                    !this.state.isLoading && this.state.indexs.length === 0 ? (
                        <div className="no-indexs-found">
                            <span>لا يوجد بيانات</span>
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

