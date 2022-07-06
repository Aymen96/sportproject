import { Input, TextField, Box, Button, FormControl, InputLabel, Select, MenuItem, Switch } from '@mui/material'
import React, { Component } from 'react'
import './filterFunction.css';

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export default function FilterFunction(props) {
  const {athletes, titles} = props;
  // Native Select
  const [personName, setPersonName] = React.useState(null);
  const [selectedTitle, setSelectedTitle] = React.useState(null);
  const [planned, setPlanned] = React.useState('-');
  const [achieved, setAchieved] = React.useState(null);
  const [difference, setDifference] = React.useState(null);
  const [filterActive, setFilterActive] = React.useState(false);
  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };

  const NativeSelect = (<FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
    <InputLabel shrink htmlFor="select-multiple-native">
      Athlete
    </InputLabel>
    <Select
      multiple
      native
      value={personName}
      // @ts-ignore Typings are not considering `native`
      onChange={handleChangeMultiple}
      label="Native"
      inputProps={{
        id: 'select-multiple-native',
      }}
    >
      {names.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </Select>
  </FormControl>);

  const numberInput = () => {
    return (
      <div style={{marginTop: '18px', width:'100%', padding: 0, display: 'flex', justifyContent: 'space-between'}}>
        <div class="number-input-container"><TextField
          type="number"
          size="small"
          name="Difference"
          label="Difference"
          variant="filled"
          value={difference}
          onChange={event => setDifference(event.target.value)}
        /></div>
        <div class="number-input-container"><TextField
          type="number"
          size="small"
          name="Achieved"
          label="Achieved"
          variant="filled"
          value={achieved}
          onChange={event => setAchieved(event.target.value)}
        /></div>
        <div class="number-input-container"><TextField
          type="number"
          size="small"
          name="Planned"
          label="Planned"
          variant="filled"
          value={planned}
          onChange={event  => setPlanned(event.target.value)}
        /></div>
    </div>
   );
  }

  const selectComponent = (label, value, elements, onChange) => (
    <div style={{marginTop: '18px', padding: 0}}>
      <FormControl fullWidth size="small">
      <InputLabel id="demo-select-small">{label}</InputLabel>
      <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={value}
          label={label}
          onChange={onChange}
      >
        <MenuItem value={0}></MenuItem>
        {elements && elements.map((el, idx) => {
          return <MenuItem value={idx + 1} key={'key' + idx}>{el}</MenuItem>
        })}
      </Select>
    </FormControl>
  </div>
);
const toggleFilterFunction = () => {
  setFilterActive(!filterActive);
};

  return (
    <div>
      <div>
        <h4 style={{color: 'black', display: 'inline-block', marginLeft: '18px', marginRight: '12px'}}>Filter Function</h4>
        <Switch 
          checked={filterActive}
          onChange={toggleFilterFunction}
          inputProps={{ 'aria-label': '' }}
          size="small"/>
      </div>

      {filterActive && (<div class="filter-function-wrapper">
            <div class="row">
                <TextField id="search-general" label="Search text" variant="standard" />
                {selectComponent('Athlete', personName, athletes, (event) => {setPersonName(event.target.value)})}
                {selectComponent('Title', selectedTitle, titles, (event) => {setSelectedTitle(event.target.value)})}
                {numberInput()}
            </div>
            <div class="row">
                <Button variant="contained" style={{marginTop: '12px', width: '33%'}}>Apply</Button>
            </div>      
      </div>)}
    </div>
  )
}
