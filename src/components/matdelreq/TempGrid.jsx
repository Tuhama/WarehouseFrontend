import React from "react";
//import "./styles.css";

/*import DateEditor from "react-tabulator/lib/editors/DateEditor";
import MultiValueFormatter from "react-tabulator/lib/formatters/MultiValueFormatter";
import MultiSelectEditor from "react-tabulator/lib/editors/MultiSelectEditor";*/

import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)

import { ReactTabulator } from "react-tabulator";
import {getAllIndexes} from "../../util/APIUtils";
import {
   Button
} from 'antd';
/*
const data = [
/!*    {
/!*        id: 1,
        name: "Oli Bob",
        age: "12",
        color: "red",
        dob: "01/01/1980",
        rating: 5,
        passed: true,
        pets: ["cat", "dog"]*!/
        id: 1,
        subMaterial: '',
        amount: '0',
        notes: '',
    }*!/
];
*/


class TempGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            subMaterials:null,
        };

        this.ref = null;
        this.setDetails = this.setDetails.bind(this);
    }


    rowClick = (e, row) => {
        console.log("ref table: ", this.ref.table); // this is the Tabulator table instance
        console.log("rowClick id: ${row.getData().id}", row, e);
    };

    setDetails = () => {
       // this.setState({ data });
        if(this.ref)
        {
            this.props.reqDetails(this.ref.table.getData());}

    };

    clearData = () => {
        this.setState({ data: [] });
    };
    handleAdd = () => {
        this.ref.table.addRow({});
    };
    render() {
        if(!this.state.subMaterials)

            return <span></span>
        else {
            const options = {
            height: 150,
            addRowPos:"bottom"
        };

            const editableColumns = [
                {
                    title: 'المادة',
                    field: 'subMaterial',
                    width: '35%',
                    editor: "select",
                    editorParams: {
                        allowEmpty: true,
                        showListOnEmpty: true,
                        values: this.state.subMaterials
                    },
                }, {
                    title: 'الكمية',
                    field: 'amount',
                    width: '15%',
                    editor: "input",
                }, {
                    title: 'الملاحظات',
                    field: 'notes',
                    width: '35%',
                    editor: "input",
                },
            ];

            return (
                <div>
                    <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                        Add a row
                    </Button>
                    <ReactTabulator
                        ref={ref => (this.ref = ref)}
                        columns={editableColumns}
                        data={this.state.data}
                        footerElement={<span>Footer</span>}
                        cellEdited={this.setDetails}
                    />

                </div>
            );}


    }

    componentDidMount() {
        this.loadSubMaterials();
    }
    async loadSubMaterials() {

        let p = getAllIndexes("subMaterials");

        if (!p) {
            return;
        }
        try {
            let data = await p;
            let options = {};
            data.map(sm => {
                options[sm.name]= sm.name;

                return options;});
            this.state.subMaterials =options;
        } catch (err) {
        }
    }
}

export default TempGrid;