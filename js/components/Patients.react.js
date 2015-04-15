import React from 'react/addons';
import router, {Navigation} from '../router.js';
import {Table, Column} from "fixed-data-table";

import {TextField, FontIcon} from 'material-ui';


var rows = [
  ['a1', 'b1', 'c1'],
    ['a2', 'b3', 'c2'],
      ['a3', 'b3', 'c3']
];

function rowGetter(rowIndex) {
  return rows[rowIndex];
  }


export default class Patients extends React.Component {
    constructor(props) {
        super(props)
        this.state = {username: '', password: ''};
    }

    render() {
        return (
            <div>
                <Navigation/>
                <h1>Pacientes!</h1>

                <i className="fa fa-search"></i>
                <TextField hintText="buscar" />




                <Table
                    rowHeight={50}
                    rowGetter={rowGetter}
                    rowsCount={rows.length}
                    width={5000}
                    height={5000}
                    headerHeight={50}>
                    <Column
                    label="Col 1"
                    width={3000}
                    dataKey={0}
                    />
                    <Column
                    label="Col 2"
                    width={2000}
                    dataKey={1}
                    />
                </Table>
            </div>
        );
    }
}


