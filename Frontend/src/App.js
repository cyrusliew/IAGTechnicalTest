import React, { useEffect, useRef, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './App.css';
import { Box, Container, Grid, TextField } from '@material-ui/core';
import debounce from 'debounce';
import Skeleton from '@material-ui/lab/Skeleton';

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
  const [make, setMake] = useState('Lotus');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [models, setModels] = useState([]);

  const debouncedFetchModels = useRef(debounce(fethModels, 1000)).current;

  function fethModels(make) {
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
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Vehicle List
          </Typography>
        </Toolbar>
      </AppBar>
      <Box my={4}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField label="Car make" value={make} onChange={e => setMake(e.target.value)} variant="outlined" />
            </Grid>
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
