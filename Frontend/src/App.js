import React, { useEffect, useRef, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import './App.css';
import { Box, Container, Grid, TextField } from '@material-ui/core';
import debounce from 'debounce';
import Skeleton from '@material-ui/lab/Skeleton';
import { alpha, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    margin: 'auto',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 0,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function DummyRow({ children }) {
  return (
    <TableRow>
      <TableCell component="th" scope="row" colSpan={2}>
        {children}
      </TableCell>
    </TableRow>
  );
}

function App() {
  const classes = useStyles();

  const [make, setMake] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [models, setModels] = useState([]);

  const debouncedFetchModels = useRef(debounce(fethModels, 1000)).current;

  function fethModels(make) {
    setModels([]);

    if (!make) {
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`http://localhost:5000/vehicle-checks/makes/${make}`)
      .then(res => res.json())
      .then(vehicles => {
        setModels(vehicles.models);
      })
      .catch(e => {
        setError('Oops! Something went wrong. Please try again or contact us if the problem persists.');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    debouncedFetchModels(make);
  }, [make, debouncedFetchModels]);

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Vehicle List
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search car make"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={make}
              onChange={e => setMake(e.target.value)}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Box my={4}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Years Available</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {!make && <DummyRow>Start by searching car make on the top right.</DummyRow>}
                    {error && (
                      <DummyRow>
                        <Box color="error.main">{error}</Box>
                      </DummyRow>
                    )}
                    {loading && (
                      <TableRow>
                        <TableCell component="th" scope="row" colSpan={2}>
                          <Skeleton animation="wave" />
                        </TableCell>
                      </TableRow>
                    )}
                    {models.map(model => (
                      <TableRow key={model.name + model.yearsAvailable}>
                        <TableCell component="th" scope="row">
                          {model.name}
                        </TableCell>
                        <TableCell>{model.yearsAvailable}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default App;
