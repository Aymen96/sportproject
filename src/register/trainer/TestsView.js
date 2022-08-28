import React from 'react'
import CustomTable from '../../components/CustomTable';
import axios from "axios";
import { Button, FormControl, getAppBarUtilityClass, InputLabel, MenuItem, Select } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';

const defaultDates = {
  from:new Date(2020, 0, 1),
  to:new Date(2023, 0, 1),
};

// requesting data from API

async function getTests (fromDate, toDate) {
  return await axios.create({
     baseURL: "http://inprove-sport.info:80",
     json: true,
     headers: {
         "Content-type": "application/json"
     },
  }).get("/csvapi/get_slice/" + fromDate + "/" + toDate);
}

async function getStats () {
  return await axios.create({
     baseURL: "http://inprove-sport.info:80",
     json: true,
     headers: {
         "Content-type": "application/json"
     },
  }).get("/csvapi/get_stats");
}

// utils

const getColLabelsFromData = data => {
  let labels = [];
  data.forEach(test => {
    labels = labels.concat(Object.keys(test['json_record']));
  })
  return labels;
 };

const germanDatePresentation = date => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getUTCFullYear() + 1;
  return day + "." + month + "." + year
}

// components

const getFilterFunction = (fromDate, toDate, space, discipline, allSpaces, allDisciplines, setSpace, setDiscipline, setFromDate, setToDate) => {
  return (<div>
    <div style={{marginTop: '18px', padding: 0}}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="From Date"
          value={fromDate}
          onChange={setFromDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
    </div>
    <div style={{marginTop: '18px', padding: 0}}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="To Date"
          value={toDate}
          onChange={setToDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
    </div><br></br>
    Available disciplines and spaces:
    <div style={{marginTop: '18px', padding: 0}}>
      <FormControl fullWidth size="small">
      <InputLabel id="demo-select-small">Discipline</InputLabel>
      <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={discipline}
          label={'Discipline'}
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
          label={'Space'}
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

  const [allTests, setAllTests] = React.useState([]);
  const [filteredTests, setFilteredTests] = React.useState([]);
  const [jsonRecords, setJsonRecords] = React.useState([]);
  const [space, setSpace] = React.useState(false);
  const [discipline, setDiscipline] = React.useState(false);
  const [fromDate, setFromDate] = React.useState(defaultDates['from']);
  const [toDate, setToDate] = React.useState(defaultDates['to']);
  const [allDisciplines, setAllDisciplines] = React.useState([]);
  const [allSpaces, setAllSpaces] = React.useState([]);
  const [colLabels, setColLabels] = React.useState([]);
  const [isFirstRender, setIsFirstRender] = React.useState(true);

  // event handlers
  const onApply = () => {
    getTests(germanDatePresentation(fromDate), germanDatePresentation(toDate)).then(res => {
      let testsData = res['data']['arr'];
      setAllDisciplines(Array.from(new Set(testsData.map(el => el.discipline))));
      setAllSpaces(Array.from(new Set(testsData.map(el => el.space))));
      // filter the data
      if(discipline) {
        testsData = testsData.filter(el => el['discipline'] === discipline);
      }
      if(space) {
        testsData = testsData.filter(el => el['space'] === space);
      }
      setFilteredTests(testsData);
      setJsonRecords(testsData.map(t => t['json_record']));
      setColLabels(getColLabelsFromData(testsData));
    });
  }

  const onReset = () => {
    if(discipline || space) {
      setDiscipline(false);
      setSpace(false);
      setFromDate(defaultDates['from']);
      setToDate(defaultDates['to']);
      getTests(germanDatePresentation(fromDate), germanDatePresentation(toDate)).then(res => {
        let testsData = res['data']['arr'];
        setAllDisciplines(Array.from(new Set(testsData.map(el => el.discipline))));
        setAllSpaces(Array.from(new Set(testsData.map(el => el.space))));
        setFilteredTests(testsData);
        setJsonRecords(testsData.map(t => t['json_record']));
        setColLabels(getColLabelsFromData(testsData));
      });
    }
  }

  const onDownload = () => {
    // Example data given in question text
    var data = jsonRecords;
    console.log(jsonRecords);
    let csvRows = [Object.keys(data[0])].concat(data);

    const csvContent = csvRows.map(it => {
      return Object.values(it).toString()
    }).join('\n');
    console.log(csvContent);
    var download = function(content, fileName, mimeType) {
      var a = document.createElement('a');
      mimeType = mimeType || 'application/octet-stream';

      if (navigator.msSaveBlob) { // IE10
        navigator.msSaveBlob(new Blob([content], {
          type: mimeType
        }), fileName);
      } else if (URL && 'download' in a) {
        a.href = URL.createObjectURL(new Blob([content], {
          type: mimeType
        }));
        a.setAttribute('download', fileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } 
    };

    // execute the download
    download(csvContent, 'dowload.csv', 'text/csv;encoding:utf-8');
  }

  const onDatesChange = () => {
    const from = germanDatePresentation(fromDate).split('.').map(el => parseInt(el));
    const to = germanDatePresentation(toDate).split('.').map(el => parseInt(el));
    var fetchData = false;
    if(from[2] < to[2]) {
      fetchData = true;
    } else if(from[2] === to[2]) { // same year
      if(from[1] < to[1]) {
        fetchData = true;
      } else if (from[1] === to[1]) { // same year, same month
        if (from[0] <= to[0]) { 
          fetchData = true;
        }
      }
    }
    if(fetchData) {
      getTests(germanDatePresentation(fromDate), germanDatePresentation(toDate)).then(res => {
        const testsData = res['data']['arr'];
        setAllDisciplines(Array.from(new Set(testsData.map(el => el.discipline))));
        setAllSpaces(Array.from(new Set(testsData.map(el => el.space))));
        // reset if the select option is not available anymore
        if(!allDisciplines.includes(discipline)) {
          setDiscipline(false);
        }
        if(!allSpaces.includes(space)) {
          setSpace(false);
        }
      });
    }
  }

  // data preprocessing
  if(isFirstRender) {
    getTests(germanDatePresentation(fromDate), germanDatePresentation(toDate)).then(res => {
      const testsData = res['data']['arr'];
      setAllDisciplines(Array.from(new Set(testsData.map(el => el.discipline))));
      setAllSpaces(Array.from(new Set(testsData.map(el => el.space))));
      setIsFirstRender(false);
    });
  }
  let testHeadCells = Array.from(new Set(colLabels));
  testHeadCells = testHeadCells.map(headCell => { return {'id': headCell, 'label': headCell, 'tableView': true}});

  return (
    <>
    <div className="view-header">
      <div style={{width:'360px'}}>
        {getFilterFunction(fromDate, toDate, space, discipline , allSpaces, allDisciplines, 
          event => setSpace(event.target.value), 
          event => setDiscipline(event.target.value), 
          event => {
            setFromDate(event);
            onDatesChange();
          },
          event => {
            setToDate(event);
            onDatesChange();
          }
          )}
        <div className="row">
                  {<Button
                    variant="contained" 
                    style={{marginTop: '12px', width: '33%'}}
                    onClick={onApply}
                  >
                    Apply
                  </Button>}
                  {(<Button 
                    variant="contained" 
                    style={{marginTop: '12px', marginLeft: '12px', width: '25%'}}
                    onClick={onReset}
                    disabled={!discipline 
                              && !space 
                              && fromDate.getTime() === defaultDates['from'].getTime()
                              && toDate.getTime() === defaultDates['to'].getTime() }
                  >
                    Reset
                  </Button>)}
                  {(<Button 
                    variant="contained" 
                    style={{marginTop: '12px', marginLeft: '12px', width: '25%'}}
                    onClick={onDownload}
                    disabled={filteredTests.length == 0}
                  >
                    Download
                  </Button>)}
            </div>      
      </div>
    </div>
    <div className="view-content">
      {<CustomTable
              rows={jsonRecords} 
              headCells={testHeadCells}
              title={'Tests of Trainer: TrainerName'}
              hasSpecialRow={false}
              hasChartRepresentation={false}
              dense={true}
              rowsPerPage={10}
              />}
        
    </div>
    <div className="view-footer"></div></>
  )
}
