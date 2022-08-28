import React, { Component } from 'react'
import CustomChart from '../../components/CustomChart';
import CustomTable from '../../components/CustomTable';
import FilterFunction from '../../components/FilterFunction';
import { evaluationsHeadCells } from '../../temp-data/evaluations';
import axios from "axios";
import { reformatDate } from '../../utli/dataConversion';

const tableCellStyle = {width: '25%', paddingBottom: '8px'};

async function getEvaluations () {
  return await axios.create({
     baseURL: "http://inprove-sport.info:80",
     json: true,
     headers: {
         "Content-type": "application/json"
     },
  }).get("/trainer/getHistory");
}

export default function EvaluationsView(props) {

  const [isChartView, setIsChartView] = React.useState(false);
  const [chartAthlete, setChartAthlete] = React.useState(false);
  const [evaluations, setEvaluations] = React.useState([]);
  const [filteredEvaluations, setFilterEvaluations] = React.useState([]);


  if(evaluations.length === 0) {
    getEvaluations().then(res => {
      const athletesData = res['data']['athletes'];
      setEvaluations(athletesData);
      setFilterEvaluations(athletesData);
    });
  }

  const differentTitles = new Set(evaluations.map(el => el.title));
  const differentAthletes = new Set(evaluations.map(el => el.name));

  return (
    <>
    <div className="view-header">
      <div style={{width:'360px'}}>
        <FilterFunction 
          initialEvaluations={evaluations}
          titles={Array.from(differentTitles)} 
          athletes={Array.from(differentAthletes)}
          updateEvaluations={(data) => {
            setFilterEvaluations(data);
          }}
        />
      </div>
    </div>
    <div className="view-content">
      {isChartView ? 
        <CustomChart 
          evaluations={filteredEvaluations.filter(el => el.name === chartAthlete)} 
          headCells={evaluationsHeadCells}
          selectedAthlete={chartAthlete}
          closeChartView={() => {
            setChartAthlete(false);
            setIsChartView(false);
          }}
          />
        : <CustomTable
              rows={filteredEvaluations} 
              headCells={evaluationsHeadCells}
              toggleChartView={athlete => {
                setChartAthlete(athlete);
                setIsChartView(!isChartView);
              }} 
              title={'Evaluations of Trainer: TrainerName'}
              hasSpecialRow={true}
              hasChartRepresentation={true}
              dense={false}
              statsSection={
                  <table  style={{margin: '0 18px 32px'}}>
                    <tbody>
                      <tr>
                          <td style={tableCellStyle}><b>Training sessions this Month:</b></td>
                          <td style={tableCellStyle}>{evaluations.length}</td>
                      </tr>
                      <tr>
                          <td style={tableCellStyle}><b>Number of Athletes:</b></td>
                          <td style={tableCellStyle}>{Array.from(new Set(evaluations.map(ev => ev.name))).length}</td>
                      </tr>
                      <tr>
                          <td style={tableCellStyle}><b>Last Training Session:</b></td>
                          <td style={tableCellStyle}>{reformatDate(Array.from(new Set(evaluations.map(ev => ev.date))).sort().reverse()[0]) }</td>
                      </tr>
                    </tbody>
                  </table>
                }
                rowsPerPage={5}
              />}
        
    </div>
    
    
    <div className="view-footer"></div></>
  )
}
