import React, { Component } from 'react'
import CustomTable from '../../components/CustomTable';
import axios from "axios";
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

async function getTests () {
  return await axios.create({
     baseURL: "https://inprove-sport.info:8080",
     json: true,
     headers: {
         "Content-type": "application/json"
     },
  }).get("/csvapi/get_slice/1.1.2020/1.1.2023");
}

async function getStats () {
  return await axios.create({
     baseURL: "https://inprove-sport.info:8080",
     json: true,
     headers: {
         "Content-type": "application/json"
     },
  }).get("/csvapi/get_stats");
}

const getFilterFunction = (space, discipline, allSpaces, allDisciplines, setSpace, setDiscipline, setDateRange) => {
  return (<div>
    <div style={{marginTop: '18px', padding: 0}}>
      <FormControl fullWidth size="small">
      <InputLabel id="demo-select-small">Discipline</InputLabel>
      <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={discipline}
          label={discipline}
          onChange={setDiscipline}
      >
        <MenuItem value={false}>No selection.</MenuItem>
        {allDisciplines && allDisciplines.map((el, idx) => {
          return <MenuItem value={el} key={'key-select-discipline-' + idx}>{el}</MenuItem>
        })}
      </Select>
    </FormControl>
    </div>
    <div style={{marginTop: '18px', padding: 0}}>
      <FormControl fullWidth size="small">
      <InputLabel id="demo-select-small">Space</InputLabel>
      <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={space}
          label={space}
          onChange={setSpace}
      >
        <MenuItem value={false}>No selection.</MenuItem>
        {allSpaces && allSpaces.map((el, idx) => {
          return <MenuItem value={el} key={'key-select-' + idx}>{el}</MenuItem>
        })}
      </Select>
    </FormControl>
    </div>
  </div>);
}

export default function TestsView(props) {

  const [isChartView, setIsChartView] = React.useState(false);
  const [chartAthlete, setChartAthlete] = React.useState(false);
  const [tests, setTests] = React.useState([]);
  const [jsonRecords, setJsonRecords] = React.useState([]);
  const [space, setSpace] = React.useState(false);
  const [discipline, setDiscipline] = React.useState(false);
  
  if(tests.length === 0) {
    getTests().then(res => {
      const testsData = res['data']['arr'];
      setTests(testsData);
      setJsonRecords(testsData.map(t => t['json_record']));
    });
  }

  const allDisciplines = Array.from(new Set(tests.map(el => el.discipline)));
  const allSpaces = Array.from(new Set(tests.map(el => el.space)));

  let labels = [];
  tests.forEach(test => {
    labels = labels.concat(Object.keys(test['json_record']));
  })
  let testHeadCells = Array.from(new Set(labels));
  testHeadCells = testHeadCells.map(headCell => { return {'id': headCell, 'label': headCell, 'tableView': true}});
  
  return (
    <>
    <div className="view-header">
      <div style={{width:'360px'}}>
        {getFilterFunction(space, discipline , allSpaces, allDisciplines, (event) => setSpace(event.target.value), (event) => setDiscipline(event.target.value), () => {})}
        <div className="row">
                <Button
                    variant="contained" 
                    style={{marginTop: '12px', width: '33%'}}
                    onClick={() => {}}
                  >
                    Apply
                  </Button>
                  {(<Button 
                    variant="contained" 
                    style={{marginTop: '12px', marginLeft: '12px', width: '25%'}}
                    onClick={() => {}}
                  >
                    Reset
                  </Button>)}
            </div>      
      </div>
    </div>
    <div className="view-content">
      {isChartView ? 
        "ChartView to be implemented for TESTS"
        : <CustomTable
              rows={jsonRecords} 
              headCells={testHeadCells}
              toggleChartView={athlete => {
                setChartAthlete(athlete);
                setIsChartView(!isChartView);
              }} 
              title={'Tests of Trainer: TrainerName'}
              hasSpecialRow={false}
              dense={true}
              />}
        
    </div>
    <div className="view-footer"></div></>
  )
}
