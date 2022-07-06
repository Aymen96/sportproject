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

    return (
      <div className="srow-wrapper">
          <div className="srow-header"> 
            <Tooltip title="Close">
              <IconButton onClick={() => handleCloseSpecialRow(index)}>
                  <CloseIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div>
            <GridView data={data}  />
          </div>
      </div>
    )
  }
}
