import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import lightBlue from '@material-ui/core/colors/lightBlue';
import blueGrey from '@material-ui/core/colors/blueGrey';

import { getTasks, getOrganisationTasks } from '../dataaccess/AccessAPI';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: lightBlue[700],
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: blueGrey[50]
    }
  }
}))(TableRow);

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'id', numeric: true, disablePadding: false, label: 'Task Id' },
  {
    id: 'OrganisationId',
    numeric: true,
    disablePadding: false,
    label: 'Organisation Id'
  },
  {
    id: 'tasksummary',
    numeric: false,
    disablePadding: true,
    label: 'Task'
  },
  {
    id: 'priority',
    numeric: false,
    disablePadding: true,
    label: 'Priority'
  },
  {
    id: 'taskStatus',
    numeric: false,
    disablePadding: true,
    label: 'Status'
  },
  {
    id: 'assignedto',
    numeric: false,
    disablePadding: true,
    label: 'Assigned To'
  },
  {
    id: 'timestamp',
    numeric: false,
    disablePadding: true,
    label: 'Incident Time'
  }
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'desc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}));

const EnhancedTable = (props) => {
  const [rows, setRows] = useState([]);
  const [orgName, setOrgName] = useState('');

  const orgId = props.match.params.orgid;

  useEffect(() => {
    // A local async function created to be able to use await inside useEffect without issues
    async function loadData() {
      try {
        if (orgId) {
          const orgTasksData = await getOrganisationTasks(orgId);
          setRows(orgTasksData.tasks);
          setOrgName(orgTasksData.organisation.name);
        } else {
          const data = await getTasks();
          setRows(data);
        }
      } catch (error) {
        console.log('error', error);
      }
    }
    // Execute the above created function
    loadData();
  }, [orgId]);

  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      {orgId && <div className="pageHeader2">Organisation: {orgName}</div>}
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow hover tabIndex={-1} key={row.id}>
                      <StyledTableCell align="left">{row.id}</StyledTableCell>
                      <StyledTableCell align="left">
                        <Link to={`/organisations/${row.OrganisationId}`}>
                          {row.OrganisationId}
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell id={labelId} scope="row" padding="none">
                        <Link to={`/edittask/${row.id}`}>
                          {row.tasksummary}
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell id={labelId} scope="row" padding="none">
                        {row.priority}
                      </StyledTableCell>
                      <StyledTableCell id={labelId} scope="row" padding="none">
                        {row.taskStatus}
                      </StyledTableCell>
                      <StyledTableCell id={labelId} scope="row" padding="none">
                        {row.assignedto}
                      </StyledTableCell>
                      <StyledTableCell id={labelId} scope="row" padding="none">
                        {moment(row.timestamp).isValid()
                          ? moment(row.timestamp).format('DD/MM/YYYY hh:mm a')
                          : ''}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={6} />
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
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default withRouter(EnhancedTable);
