import React from 'react';
import {FormControl, Grid, InputLabel, MenuItem, Paper, TextField, Select, Slider} from '@material-ui/core';
import './calculator.scss';
import calculate_woodcutting_timer from './../../calculator_utils/woodcutting_utils';

const base_working_timers = [
  {
    level: 1,
    timer: 50,
    exp: 15,
    label: "Level 1",
    name_type: "Isri",
  },
  {
    level: 15,
    timer: 75,
    exp: 22,
    label: "Level 15",
    name_type: "Lemo",
  },
  {
    level: 25,
    timer: 100,
    exp: 30,
    label: "Level 25",
    name_type: "Unera"
  },
  {
    level: 40,
    timer: 180,
    exp: 65,
    label: "Level 40",
    name_type: "Avinin",
  },
  {
    level: 55,
    timer: 330,
    exp: 130,
    label: "Level 55",
    name_type: "Aloria",
  },
  {
    level: 75,
    timer: 700,
    exp: 275,
    label: "Level 75",
    name_type: "Khaya",
  },
  {
    level: 100,
    timer: 1000,
    exp: 400,
    label: "Level 100",
    name_type: "Ammon",
  },
];

const working_tools = [
  {
    name: "Bronze Hatchet",
    reduction: 100,
    durability: 900,
  },
  {
    name: "Iron Hatchet",
    reduction: 98,
    durability: 1000,
  },
  {
    name: "Steel Hatchet (Ogre Hatchet, Lizard Machete)",
    reduction: 96,
    durability: 1250,
  },
  {
    name: "Elven Hatchet",
    reduction: 94,
    durability: 1500,
  },
  {
    name: "Silver Hatchet",
    reduction: 92,
    durability: 2000,
  },
  {
    name: "Gold Hatchet",
    reduction: 90,
    durability: 2250,
  },
  {
    name: "Platina Hatchet",
    reduction: 86,
    durability: 2500,
  },
  {
    name: "Bone Hatchet",
    reduction: 84,
    durability: 10000,
  },
  {
    name: "Syriet Hatchet",
    reduction: 83,
    durability: 2750,
  },
  {
    name: "Obsidian Hatchet",
    reduction: 81,
    durability: 3000,
  },
  {
    name: "Puranium Hatchet",
    reduction: 78,
    durability: 3500,
  }
];

export default class WoodcuttingCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tool_reduction: 100,
      forest_level: 1,
      action_exp: 15,
      base_forest_timer: 50,
      player_level: 1,
    };
    this.handleForestChange = this.handleForestChange.bind(this);
    this.handleToolChange = this.handleToolChange.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
  }

  handleForestChange(event) {
    this.setState({
      base_forest_timer: event.target.value,
      forest_level: base_working_timers.find((element) => {return element.timer == event.target.value}).level,
      action_exp: base_working_timers.find((element) => {return element.timer == event.target.value}).exp,
    });
  }

  handleToolChange(event) {
    this.setState({
      tool_reduction: event.target.value,
    });
  }

  handleLevelChange(event) {
    this.setState({
      player_level: event.target.value >=1 ? Number(event.target.value) : "",
    });
  }

  valueLabelFormat(value, index) {
    return value;
  }

  ariaLabelFormat(index) {
    return base_working_timers[index].name_type;
  }
  render() {
    const timer = calculate_woodcutting_timer(this.state.base_forest_timer, Number(this.state.tool_reduction), this.state.player_level);
    const hourly_exp = Math.ceil(3600*this.state.action_exp/(timer+1));
    return (
      <div className="calculator">
        <Grid container spacing={5}>
          <Grid item md={4}>
          <FormControl>
            <InputLabel id="forest-label">Forest</InputLabel>
            <Select
              labelId="forest-label"
              value={this.state.base_forest_timer}
              name="Forest"
              onChange={this.handleForestChange}
            >
              {
                base_working_timers.map((element, index) => {
                  return <MenuItem key={index} value={element.timer}>{element.label}</MenuItem>
                })
              }
            </Select>
          </FormControl>
          </Grid>
          <Grid item md={4}>
          <FormControl>
            <InputLabel id="tool-label">Working Tool</InputLabel>
            <Select
             labelId="tool-label"
             value={this.state.tool_reduction}
             name="Working Tool"
             onChange={this.handleToolChange}
            >
            {
              working_tools.map((element, index) => {
                return <MenuItem key={index} value={element.reduction}>{element.name}</MenuItem>
              })
            }
            </Select>
          </FormControl>
          </Grid>
          <Grid item md={4}>
            <TextField
              label="Your Level"
              type="number"
              value={this.state.player_level}
              onChange={this.handleLevelChange}
            />
          </Grid>
        </Grid>
        <div className="timer">
          {this.state.forest_level <= this.state.player_level ? "Base timer : " + timer + " (about " + hourly_exp + " experience per hour)" : "You probably can't chop here yet."}
        </div>
      </div>
    )
  }
}
