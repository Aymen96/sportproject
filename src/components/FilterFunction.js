import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Switch } from '@mui/material'
import React from 'react'
import './filterFunction.css'

export default function FilterFunction(props) {
  const {athletes, titles, initialEvaluations, updateEvaluations} = props;
  
  // STATE

  const [selectedAthlete, setSelectedAthlete] = React.useState(false);
  const [selectedTitle, setSelectedTitle] = React.useState(false);
  const [planned, setPlanned] = React.useState(null);
  const [achieved, setAchieved] = React.useState(null);
  const [difference, setDifference] = React.useState(null);
  const [searchText, setSearchText] = React.useState("");
  const [filterNotSet, setFilterNotSet] = React.useState(true); // missing input fields
  const [filterActive, setFilterActive] = React.useState(false); // filter function is showing
  
  // EVENT HANDLERS

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedAthlete(value);
  };

  const toggleFilterFunction = () => {
    setFilterActive(!filterActive);
  };

  const apply = event => {
    if(!filterActive) return;
    if(!selectedAthlete && !selectedTitle && !planned && !achieved && !difference && !searchText) {
      setFilterNotSet(true);
      return;
    }
    let filteredData = initialEvaluations;
    if (searchText) {
      filteredData = filteredData.filter(el => (el.name + el.title + el.comments).includes(searchText));
    }
    if (selectedAthlete) {
      filteredData = filteredData.filter(el => el.name === selectedAthlete);
    }
    if (selectedTitle) {
      filteredData = filteredData.filter(el => el.title === selectedTitle);
    }
    if (planned) {
      filteredData = filteredData.filter(el => el.planned === planned);
    }
    if (achieved) {
      filteredData = filteredData.filter(el => el.achieved === achieved);
    }
    if (difference) {
      filteredData = filteredData.filter(el => el.difference === difference);
    }
    updateEvaluations(filteredData);
    setFilterActive(false);
  }

  const reset = event => {
    setSelectedAthlete(false);
    setSelectedTitle(false);
    setPlanned(null);
    setAchieved(null);
    setDifference(null);
    updateEvaluations(initialEvaluations);
    setFilterNotSet(false);
  }

  // COMPONENTS

  const numberInput = () => {
    return (
      <div style={{marginTop: '18px', width:'100%', padding: 0, display: 'flex', justifyContent: 'space-between'}}>
        <div className="number-input-container">
          <TextField
            type="number"
            size="small"
            name="Difference"
            label="Difference"
            variant="filled"
            value={difference}
            onChange={event => setDifference(event.target.value)}/>
        </div>
        <div className="number-input-container">
          <TextField
            type="number"
            size="small"
            name="Achieved"
            label="Achieved"
            variant="filled"
            value={achieved}
            onChange={event => setAchieved(event.target.value)}/>
        </div>
        <div className="number-input-container">
          <TextField
            type="number"
            size="small"
            name="Planned"
            label="Planned"
            variant="filled"
            value={planned}
            onChange={event  => setPlanned(event.target.value)}/>
        </div>
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
        <MenuItem value={false}>No selection.</MenuItem>
        {elements && elements.map((el, idx) => {
          return <MenuItem value={el} key={'key-select-' + idx}>{el}</MenuItem>
        })}
      </Select>
    </FormControl>
    </div>
  );


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
      {!filterActive && (<div>
        {selectedAthlete && (<span style={{display: 'block'}}><b>Athlete:</b>{' ' + selectedAthlete}</span>)}
        {selectedTitle && (<span style={{display: 'block'}}><b>Title:</b>{' ' + selectedTitle}</span>)}
        <hr />
      </div>)}
      {filterActive && (<div className="filter-function-wrapper">
            <div className="row">
                <TextField id="search-general" label="Search text" variant="standard" onChange={event => setSearchText(event.target.value)}/>
                {selectComponent('Athlete', selectedAthlete, athletes, (event) => {setSelectedAthlete(event.target.value)})}
                {selectComponent('Title', selectedTitle, titles, (event) => {setSelectedTitle(event.target.value)})}
                {numberInput()}
            </div>
            { filterNotSet && (
              <div style={{margin:'12px 0 0'}}>
                <span style={{color:'red'}}> *No fields were set. Filter can't be applied. </span>
              </div>
            )}
            <div className="row">
                <Button 
                    variant="contained" 
                    style={{marginTop: '12px', width: '33%'}}
                    onClick={apply}
                  >
                    Apply
                  </Button>
                  {!filterNotSet && (<Button 
                    variant="contained" 
                    style={{marginTop: '12px', marginLeft: '12px', width: '25%'}}
                    onClick={reset}
                  >
                    Reset
                  </Button>)}
            </div>      
      </div>)}
    </div>
  )
}
