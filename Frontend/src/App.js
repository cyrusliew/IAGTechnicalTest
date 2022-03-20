import React, { Component } from 'react';
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

export default class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      models: [],
    };
  }

  componentDidMount() {
    fetch('https://localhost:44387/vehicle-checks/makes/Lotus')
      .then(res => res.json())
      .then(vehicles => {
        this.setState({ models: vehicles.models });
      })
      .catch(console.log);
  }

  render = () => {
    return (
      <div>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit">
              Vehicle List
            </Typography>
          </Toolbar>
        </AppBar>
        <Typography variant="h5" component="h2">
          Lotus
        </Typography>
        <Paper>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Years Available</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.models.map(model => (
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
      </div>
    );
  };
}
