import React from 'react';
import './calculator.scss';
import {FormControl, Grid, InputLabel, MenuItem, Paper, TextField, Select, Slider} from '@material-ui/core';
export default class CombatLevelCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attack_level: 1,
      defence_level: 1,
      strength_level: 1,
      health_level: 1,
    };
  }
  render() {
    return (
      <div className="calculator">
      <Grid container spacing={5}>
        <Grid item md={3}>
          <TextField
            label="Attack Level"
            type="number"
            value={this.state.attack_level >=1 ? this.state.attack_level : ""}
            onChange={(e) => this.setState({
              attack_level: Number(e.target.value)
            })}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            label="Defence Level"
            type="number"
            value={this.state.defence_level >=1 ? this.state.defence_level : ""}
            onChange={(e) => this.setState({
              defence_level: Number(e.target.value),
            })}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            label="Strength Level"
            type="number"
            value={this.state.strength_level >=1 ? this.state.strength_level : 0}
            onChange={(e) => this.setState({
              strength_level: Number(e.target.value),
            })}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            label="Health Level"
            type="number"
            value={this.state.health_level >= 1? this.state.health_level : 0}
            onChange={(e) => this.setState({
              health_level: Number(e.target.value),
            })}
          />
        </Grid>
      </Grid>
      <div className="timer">
        Your combat level : {Math.floor((this.state.attack_level + this.state.strength_level + this.state.defence_level)/3) + Math.floor(this.state.health_level/5)}
      </div>
      </div>
    )
  }
}
