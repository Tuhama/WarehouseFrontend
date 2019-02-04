import React, {Component} from 'react';
import {getAllIndexes, deleteIndex} from '../../../util/APIUtils';

import { Table, Divider, Tag } from 'antd';

import {withRouter} from 'react-router-dom';
import './MaterialList.css';


class MaterialList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            materials: [],
            isLoading: false
        };
        this.loadMaterialList = this.loadMaterialList.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    async handleDelete(id) {

        let p = deleteIndex("materials",id);

        if (!p) {
            return;
        }
        try {
            var data = await p;

        } catch (err) {

        }
    }
    async loadMaterialList() {
        console.log("load1");
        let p = getAllIndexes("materials");

        if (!p) {
            return;
        }

            var data = await p;
            this.setState({
                materials: data
            })
        console.log(data);
/*
            const materials = this.state.materials.slice();
            this.setState({
                materials: materials.concat(data),
                isLoading: false
            });
        } catch (err) {
            this.setState({
                isLoading: false
            });
        }*/
    }

    componentDidMount() {
        this.loadMaterialList();
    }

    /*    componentDidUpdate(nextProps) {
            if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
                // Reset State
                this.setState({
                    materials: [],
                    isLoading: false
                });
                this.loadMaterialList();
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
            <div className="materials-container">
                <Table size="small" columns={columns} dataSource={ this.state.materials} rowKey="id" />

                {
                    !this.state.isLoading && this.state.materials.length === 0 ? (
                        <div className="no-materials-found">
                            <span>لا يوجد أصناف رئيسية</span>
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