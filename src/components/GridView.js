import React, { Component } from 'react'
import './gridView.css';

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

export default class GridView extends Component {
    render() {
        const {data} = this.props;
        const tableCellStyle = {width: '25%', paddingBottom: '8px'};
        return (
        <div class="grid-view-container">
            <div class="grid-view-column">
                <div class="grid-view-row">
                    <h5>Personal Data</h5>
                    {data && Object.keys(data).map((key, index) => {
                        return index % 2 === 0 && (<tr>
                            <td style={tableCellStyle}><b>{capitalizeFirstLetter(key)}</b></td>
                            <td style={tableCellStyle}>{data[key]}</td>
                            { Object.keys(data).length > index + 1 && 
                                (<><td style={tableCellStyle}><b>{capitalizeFirstLetter(Object.keys(data)[index + 1])}</b></td>
                                <td style={tableCellStyle}>{data[Object.keys(data)[index + 1]]}</td></>)
                            }
                        </tr>);
                    })}
                </div>
            </div>
            <div class="grid-view-column">
                <div class="grid-view-row">
                    COL2ROW1
                </div>
                <div class="grid-view-row">
                    COL2ROW2
                </div>
            </div>
        </div>
        )
    }
}
