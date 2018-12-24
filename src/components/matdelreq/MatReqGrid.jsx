import React, {Component} from 'react';
import {
    Table, Input, Button, Popconfirm, Form, Select
} from 'antd';
import {getAllIndexes} from "../../util/APIUtils";

const FormItem = Form.Item;
const EditableContext = React.createContext();
const Option = Select.Option;

const EditableRow = ({form, index, ...props}) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

class EditableCell extends React.Component {
    state = {
        editing: false,
    }

    componentDidMount() {
        if (this.props.editable) {
            document.addEventListener('click', this.handleClickOutside, true);
        }
    }

    componentWillUnmount() {
        if (this.props.editable) {
            document.removeEventListener('click', this.handleClickOutside, true);
        }
    }

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({editing}, () => {
            if (editing) {
                this.input.focus();
            }
        });
    }

    handleClickOutside = (e) => {
        const {editing} = this.state;
        if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
            this.save();
        }
    }

    save = () => {
        const {record, handleSave} = this.props;
        this.form.validateFields((error, values) => {
            if (error) {
                return;
            }
            this.toggleEdit();
            handleSave({...record, ...values});
        });
    }

    render() {
        const {editing} = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            isSelect,
            items,
            ...restProps
        } = this.props;
        return (
            <td ref={node => (this.cell = node)} {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>
                        {(form) => {
                            this.form = form;
                            return (
                                editing ? ( isSelect ? (
                                        <FormItem style={{margin: 0}}>
                                            {form.getFieldDecorator(dataIndex, {
                                                rules: [{
                                                    required: true,
                                                    message: `${title} is required.`,
                                                }],
                                                initialValue: record[dataIndex],
                                            })(
                                                <Select
                                                    ref={node => (this.input = node)}
                                                    onPressEnter={this.save}
                                                >
                                                    {
                                                       items.map(i =>
                                                            <Option key={i.id}>{i.name}</Option>
                                                        )
                                                    }

                                                </Select>

                                            )}
                                        </FormItem>
                                    ):(
                                    <FormItem style={{margin: 0}}>
                                        {form.getFieldDecorator(dataIndex, {
                                            rules: [{
                                                required: true,
                                                message: `${title} is required.`,
                                            }],
                                            initialValue: record[dataIndex],
                                        })(
                                            <Input
                                                ref={node => (this.input = node)}
                                                onPressEnter={this.save} />
                                        )}
                                    </FormItem>)
                                ) : (
                                    <div
                                        className="editable-cell-value-wrap"
                                        style={{paddingRight: 24}}
                                        onClick={this.toggleEdit}
                                    >
                                        {restProps.children}
                                    </div>
                                )
                            );
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    }
}


const EditableFormRow = Form.create()(EditableRow);

class MatReqGrid extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
            title: 'المادة',
            dataIndex: 'subMaterial',
            width: '35%',
            editable: true,
            isSelect: true,

        }, {
            title: 'الكمية',
            dataIndex: 'amount',
            width: '15%',
            editable: true,
        }, {
            title: 'الملاحظات',
            dataIndex: 'notes',
            width: '35%',
            editable: true,
        }, {
            title: '*',
            dataIndex: 'operation',
            render: (text, record) => (
                this.state.dataSource.length >= 1
                    ? (
                        <Popconfirm title="متأكد من الحذف؟" onConfirm={() => this.handleDelete(record.key)}>
                            <a href="javascript:;">حذف</a>
                        </Popconfirm>
                    ) : null
            ),
            width: '15%',

        }];

        this.state = {
            dataSource: [{
                key: '0',
                subMaterial: 0,
                amount: 0,
                notes: '',
            }],
            count: 1,
            subMaterials:[]
        };
    }
    async loadSubMaterials() {

        let p = getAllIndexes("subMaterials");

        if (!p) {
            return;
        }
        try {
            var data = await p;

            const subMaterials = this.state.subMaterials.slice();
            this.setState({
                subMaterials: subMaterials.concat(data),
            });
        } catch (err) {
        }
    }

    componentDidMount() {
        this.loadSubMaterials();
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({dataSource: dataSource.filter(item => item.key !== key)});
    }

    handleAdd = () => {
        const {count, dataSource} = this.state;
        const newData = {
            key: count,
            subMaterial: 0,
            amount: 32,
            notes: ``,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    }

    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({dataSource: newData});
    }

    render() {
        const {dataSource} = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                    isSelect: col.isSelect,
                    items: this.state.subMaterials
                }),
            };
        });
        return (
            <div>
                <Button onClick={this.handleAdd} type="primary" style={{marginBottom: 16}}>
                    +
                </Button>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        );
    }
}

export default MatReqGrid;