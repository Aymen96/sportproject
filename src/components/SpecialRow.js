import React, { Component } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import './specialRow.css';
import { IconButton, Tooltip } from '@mui/material';
import GridView from './GridView';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default class SpecialRow extends Component {
  
  render() {
    const {handleCloseSpecialRow, index, data} = this.props;
    const tableCellStyle = {width: '25%', paddingBottom: '8px'};

    const athletesDataKeys = ['name', 'title', 'age', 'gender', 'sports', 'trainer', 'last_training'];
    const evaluationDataKeys = ['quality', 'achieved', 'planned', 'start_time', 'end_time', 'comments', 'as_planned', 'difference'];
    const statistics = [];

    return (
      <div className="srow-wrapper">
          <div className="srow-header"> 
          <Tooltip title="Close">
            <IconButton onClick={() => handleCloseSpecialRow(index)}>
                <CloseIcon />
            </IconButton>
        </Tooltip>
           </div>
          <div className="srow-content">
              <table className="srow-grid-view">
                <h4>Athlete's Data</h4>
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
                
              </table>
          </div>
          <div>
            <h4>Training</h4>
            <GridView data={data} />
            <h4>Statistics</h4>
          </div>
      </div>
    )
  }
}
