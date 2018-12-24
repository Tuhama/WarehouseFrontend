import React, {Component} from 'react';
import {getAllIndexes, deleteIndex} from '../../../util/APIUtils';

import { Table, Divider, Tag } from 'antd';

import {withRouter} from 'react-router-dom';
import './SubMaterialList.css';





class SubMaterialList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subMaterials: [],
            isLoading: false
        };
        this.loadSubMaterialList = this.loadSubMaterialList.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    async handleDelete(id) {

        let p = deleteIndex("subMaterials",id);

        if (!p) {
            return;
        }
        try {
            var data = await p;

        } catch (err) {

        }
    }
    async loadSubMaterialList() {

        let p = getAllIndexes("subMaterials");

        if (!p) {
            return;
        }

            var data = await p;
            this.setState({
                subMaterials: data
            })
/*
            const submaterials = this.state.submaterials.slice();
            this.setState({
                submaterials: submaterials.concat(data),
                isLoading: false
            });
        } catch (err) {
            this.setState({
                isLoading: false
            });
        }*/
    }

    componentDidMount() {
        this.loadSubMaterialList();
    }

    /*    componentDidUpdate(nextProps) {
            if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
                // Reset State
                this.setState({
                    submaterials: [],
                    isLoading: false
                });
                this.loadSubMaterialList();
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
            <div className="submaterials-container">
                <Table size="small" columns={columns} dataSource={ this.state.subMaterials} rowKey="id" />

                {
                    !this.state.isLoading && this.state.subMaterials.length === 0 ? (
                        <div className="no-submaterials-found">
                            <span>لا يوجد مواد</span>
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

export default withRouter(SubMaterialList);