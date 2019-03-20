import React, {Component} from 'react';

import { withRouter } from 'react-router-dom';

import './IndexList.css';
import { deleteIndex } from '../../../util/APIUtils';

import { Table } from 'antd';


class IndexList extends Component {

    constructor(props) {
        super(props);
/*        this.state = {
            indexes: [],
            isLoading: false
        };
        this.loadIndexList = this.loadIndexList.bind(this);*/
        this.handleDelete = this.handleDelete.bind(this);
    }

     handleDelete(id) {

         deleteIndex( this.props.indexType, id);
//reload page
        this.props.history.push("/"+this.props.indexType);
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
            render: text => <a >{text}</a>,
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
                <Table size="small" columns={columns} dataSource={ this.props.indexes} rowKey="id" />

                {this.props.indexes.length === 0 ? (
                        <div className="no-indexs-found">
                            <span>لا يوجد بيانات</span>
                        </div>
                    ) : null
               }
            </div>
        );
    }
}

export default withRouter(IndexList);