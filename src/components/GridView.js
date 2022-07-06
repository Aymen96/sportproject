import React, { Component } from 'react';
import './gridView.css';
import {moment} from 'moment';
import { reformatDate, reformatKey } from './utils';


const athleteKeys = ['name', 'age', 'gender', 'sports', 'trainer', 'last_training'];
const trainingKeys = ['quality', 'achieved', 'planned', 'date', 'start_time', 'end_time', 'comments', 'as_planned', 'difference'];

export default class GridView extends Component {
    render() {
        const {data} = this.props;
        const tableCellStyle = {width: '25%', paddingBottom: '8px'};
        return (
        <div class="grid-view-container">
            <div class="grid-view-column">
                <div class="grid-view-row">
                    <h5>Personal Data</h5>
                    {data && athleteKeys.map((key) => {
                        return (<tr key={"tr-pd-" + key}>
                            <td style={tableCellStyle}><b>{reformatKey(key)}</b></td>
                            <td style={tableCellStyle}>{data[key] ? data[key] : '-' }</td>
                        </tr>);
                    })}
                </div>
            </div>
            <div class="grid-view-column">
                <div class="grid-view-row">
                    <h5>Training</h5>
                    {data && trainingKeys.map( key => {
                        return (<tr key={"tr-tra-" + key}>
                            <td style={tableCellStyle}><b>{reformatKey(key)}</b></td>
                            <td style={tableCellStyle}>{key == 'date' ? reformatDate(data[key]) : data[key]}</td>
                        </tr>);
                    })}
                </div>
            </div>
        </div>
        )
    }
}
