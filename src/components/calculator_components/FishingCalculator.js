import React from 'react';
import {FormControl, Grid, InputLabel, MenuItem, Paper, TextField, Select, Slider} from '@material-ui/core';
import './calculator.scss';
import calculate_fishing_timer from './../../calculator_utils/fishing_utils';
// [W] 23:18 Mr Tiddles[CFH]: mariners locker is 350, depths is 550
const base_working_timers = [
  {
    level: 1,
    timer: 65,
    computeMinTimer: () => {return 29},
    label: "Net Fishing",
    name_type: "Net",
  },
  {
    level: 5,
    timer: 61,
    computeMinTimer: () => {return 29},
    label: "Rod Fishing",
    name_type: "Rod",
  },
  {
    level: 23,
    timer: 117,
    computeMinTimer: () => {return 29},
    label: "SFB Fishing",
    name_type: "Small fishing boat"
  },
  {
    level: 35,
    timer: 150,
    label: "Sloop fishing",
    computeMinTimer: () => {return 29},
    name_type: "Sloop",
  },
  {
    level: 46,
    timer: 249,
    label: "Boat fishing",
    computeMinTimer: () => {return 29},
    name_type: "Boat",
  },
  {
    level: 50,
    timer: 450, //  $minTime = 90 - ($fishingl >= 170 ? $fishingl - 170 : 0);
    computeMinTimer: (level => {
      return level > 170? Math.max(90 - level + 170 , 44) : 90;
    }),
    label: "Trawler fishing",
    name_type: "Trawler",
  },
  {
    level: 100,
    timer: 900,
    label: "Canoe fishing",
    computeMinTimer: () => {return 59},
    name_type: "Canoe",
  },
];

const working_tools = [
  {
    reduction: 1.00,
    name: "Rod/Net/Tinsel Net"
  },
  {
    reduction: 0.95,
    name: "Bone Fishing Rod"
  },
];

export default class WoodcuttingCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tool_reduction: 1.00,
      fishing_level: 1,
      base_fishing_timer: 65,
      player_level: 1,
      compute_min_timer: () => {return 29},
    };
    this.handleFishingChange = this.handleFishingChange.bind(this);
    this.handleToolChange = this.handleToolChange.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
  }

  handleFishingChange(event) {
    this.setState({
      base_fishing_timer: event.target.value,
      fishing_level: base_working_timers.find((element) => {return element.timer == event.target.value}).level,
      compute_min_timer:  base_working_timers.find((element) => {return element.timer == event.target.value}).computeMinTimer,
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
    console.log(this.state);
    return (
      <div className="calculator">
        <Grid container spacing={5}>
          <Grid item md={4}>
          <FormControl>
            <InputLabel id="fishing-label">Fishing</InputLabel>
            <Select
              labelId="fishing-label"
              value={this.state.base_fishing_timer}
              name="Forest"
              onChange={this.handleFishingChange}
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
          {this.state.fishing_level <= this.state.player_level ? "Base timer : " + calculate_fishing_timer(this.state.base_fishing_timer, Number(this.state.tool_reduction) , this.state.player_level, this.state.compute_min_timer(this.state.player_level)) : "You probably can't fish here yet."}
        </div>
      </div>
    )
  }
}
