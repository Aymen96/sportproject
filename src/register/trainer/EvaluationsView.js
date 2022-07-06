import React, { Component } from 'react'
import CustomTable from '../../components/CustomTable';
import FilterFunction from '../../components/FilterFunction';
import { evaluations, evaluationsHeadCells } from '../../temp-data/evaluations';

export default class EvaluationsView extends Component {

  getEvaluations() {
      const evaluations = {};
      return evaluations;
  }
  render() {
    const differentTitles = new Set(evaluations.map(el => el.title));
    const differentAthletes = new Set(evaluations.map(el => el.name));
    console.log(differentTitles);
    console.log(differentAthletes);
    return (
      <>
      <div className="view-header">
        <div style={{width:'360px'}}>
          <FilterFunction 
            titles={Array.from(differentTitles)} 
            athletes={Array.from(differentAthletes)}
          />
        </div>
      </div>
      <div className="view-content">
          <CustomTable evaluations={evaluations} headCells={evaluationsHeadCells}/>
      </div>
      
      
      <div className="view-footer"></div></>
    )
  }
}
