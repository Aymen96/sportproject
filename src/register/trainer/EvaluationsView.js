import React, { Component } from 'react'
import CustomChart from '../../components/CustomChart';
import CustomTable from '../../components/CustomTable';
import FilterFunction from '../../components/FilterFunction';
import { evaluations, evaluationsHeadCells } from '../../temp-data/evaluations';

export default function EvaluationsView(props) {

  const [isChartView, setIsChartView] = React.useState(false);
  const [chartAthlete, setChartAthlete] = React.useState(false);
  const [filteredEvaluations, setFilterEvaluations] = React.useState(evaluations);

  const updateEvaluations = data => {
    setFilterEvaluations(data);
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
          updateEvaluations={updateEvaluations}
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
              evaluations={filteredEvaluations} 
              headCells={evaluationsHeadCells}
              toggleChartView={athlete => {
                setChartAthlete(athlete);
                setIsChartView(!isChartView);
              }}
              />}
        
    </div>
    
    
    <div className="view-footer"></div></>
  )
}
