import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import { visuallyHidden } from '@mui/utils';
import { evaluations, evaluationsHeadCells } from '../temp-data/evaluations';
import SpecialRow from './SpecialRow';
import { getComparator, reformatDate, stableSort } from './utils';
import './customTable.css';
import FilterFunction from './FilterFunction';

const rows = evaluations;

const chartIcon = (clickHandle) => {
  return (<Tooltip title="Show as Chart">
  <IconButton onClick={clickHandle}>
    <StackedLineChartIcon />
  </IconButton>
</Tooltip>);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {evaluationsHeadCells.filter(headCell => headCell.tableView).map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
const tableCellStyle = {width: '25%', paddingBottom: '8px'};

const EnhancedTableToolbar = () => {

  return (
    <><Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Evaluations of Trainer: TrainerName
      </Typography>
    </Toolbar>
    <div style={{padding: '0 18px', marginBottom: '32px'}}>
        <tr>
            <td style={tableCellStyle}><b>Training sessions this Month:</b></td>
            <td style={tableCellStyle}>9</td>
        </tr>
        <tr>
            <td style={tableCellStyle}><b>Number of Athletes:</b></td>
            <td style={tableCellStyle}>5</td>
        </tr>
        <tr>
            <td style={tableCellStyle}><b>Athletes:</b></td>
            <td style={tableCellStyle}>{Array.from(new Set(evaluations.map(ev => ev.name))).join(', ')}</td>
        </tr>
        <tr>
            <td style={tableCellStyle}><b>Last Training Session:</b></td>
            <td style={tableCellStyle}>May 15th, 2022 22:00</td>
        </tr>
      </div>
    </>
  );
};

export default function CustomTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [clickedRow, setClickedRow] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowClick = index => {
    if(index == clickedRow) {
      setClickedRow(null);
    } else {
      setClickedRow(index);
    }
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const showChart = () => {};

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <><TableRow
                      hover
                      key={'row' + index}
                      role="checkbox"
                      tabIndex={-1}
                      onClick={() => handleRowClick(index)}
                      style={{backgroundColor: clickedRow !== index ? '#fff' : '#eee'}}
                      className="table-row"
                    >
                      {evaluationsHeadCells.map(el => {
                        return !(el.tableView) ? '' : 
                          <TableCell 
                            align={'left'}
                            key={"row-element-" + el.id + index}
                            >
                              {el.id != 'date' ? row[el.id] : reformatDate(row[el.id])}
                          </TableCell>; 
                      })
                      }
                    </TableRow>
                    <TableRow 
                      key={'special-row' + index}
                      className="table-row-srow"
                      >
                        
                        <TableCell colSpan={6} style={clickedRow === index ? {} : { display: 'none'}}>
                          <SpecialRow 
                            handleCloseSpecialRow={() => {
                              setClickedRow(null);
                            }}
                            data={row}
                          />
                        </TableCell>
                    </TableRow>
                  </>);
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
