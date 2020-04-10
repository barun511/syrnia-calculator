import React from 'react';
import {FormControl, Grid, InputLabel, MenuItem, Paper, TextField, Select, Slider} from '@material-ui/core';
import './calculator.scss';
import calculate_mining_timer from './../../calculator_utils/mining_utils';

const base_working_timers = [
  {
    level: 1,
    timer: 60,
    exp: 15,
    label: "Tin Ore",
    name_type: "Tin Ore",
  },
  {
    level: 10,
    timer: 80,
    exp: 22,
    label: "Iron Ore",
    name_type: "Iron Ore",
  },
  {
    level: 25,
    timer: 100,
    exp: 37,
    label: "Coal",
    name_type: "Coal"
  },
  {
    level: 40,
    timer: 135,
    exp: 60,
    label: "Silver",
    name_type: "Silver",
  },
  {
    level: 55,
    timer: 330,
    exp: 155,
    label: "Gold ore",
    name_type: "Gold ore",
  },
  {
    level: 70,
    timer: 600,
    throttle_level: 170,
    throttle_timer: 90,
    min_timer: 29,
    exp: 310,
    label: "Platina ore",
    name_type: "Platina ore",
  },
  {
    level: 70,
    timer: 600,
    throttle_level: 170,
    throttle_timer: 90,
    min_timer: 29,
    abydos: true,
    exp: 310,
    label: "Platina ore (Abydos)",
    name_type: "Platina ore (Abydos)",
  },
  {
    level: 85,
    timer: 800,
    exp: 1000,
    throttle_level: 190,
    throttle_timer: 100,
    min_timer: 29,
    label: "Syriet ore",
    name_type: "Syriet ore",
  },
  {
    level: 100,
    timer: 1500,
    exp: 3000,
    min_timer: 59,
    throttle_level: 257,
    throttle_timer: 90,
    label: "Obsidian ore", 
    name_type: "Obsidian ore",
  },
  {
    level: 120,
    timer: 2000,
    exp: 5000,
    min_timer: 74,
    throttle_level: 257,
    throttle_timer: 90,
    label: "Puranium ore",
    name_type: "Puranium ore",
  }
];

const working_tools = [
  {
    name: "Bronze pickaxe",
    reduction: 100,
    durability: 750,
  },
  {
    name: "Iron pickaxe",
    reduction: 97,
    durability: 1000,
  },
  {
    name: "Steel pickaxe (Ogre pickaxe)",
    reduction: 94,
    durability: 1000,
  },
  {
    name: "Elven pickaxe",
    reduction: 89,
    durability: 1000,
  },
  {
    name: "Silver pickaxe",
    reduction: 89,
    durability: 1500,
  },
  {
    name: "Gold pickaxe",
    reduction: 85,
    durability: 1750,
  },
  {
    name: "Platina pickaxe",
    reduction: 83,
    durability: 2500,
  },
  {
    name: "Bone pickaxe",
    reduction: 81,
    durability: 10000,
  },
  {
    name: "Syriet pickaxe",
    reduction: 80,
    durability: 2750,
  },
  {
    name: "Obsidian pickaxe",
    reduction: 78,
    durability: 3000,
  },
  {
    name: "Puranium pickaxe",
    reduction: 75,
    durability: 3500,
  }
];

export default class MiningCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ore_index: 0,
      tool_index: 0,
      player_level: 1,
    };
    this.handleMineChange = this.handleMineChange.bind(this);
    this.handleToolChange = this.handleToolChange.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
  }

  handleMineChange(event) {
    console.log(event.target.value);
    this.setState({
      ore_index: event.target.value,
    });
  }

  handleToolChange(event) {
    this.setState({
      tool_index: event.target.value,
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
    const timer = calculate_mining_timer(this.state.ore_index, this.state.tool_index, this.state.player_level, base_working_timers, working_tools);
    const hourly_exp = Math.ceil(3600*base_working_timers[this.state.ore_index].exp/(timer+1));
    return (
      <div className="calculator">
        <Grid container spacing={5}>
          <Grid item md={4}>
          <FormControl>
            <InputLabel id="mining-label">Ore</InputLabel>
            <Select
              labelId="mining-label"
              value={this.state.ore_index}
              name="Ore"
              onChange={this.handleMineChange}
            >
              {
                base_working_timers.map((element, index) => {
                  return <MenuItem key={index} value={index}>{element.label}</MenuItem>
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
             value={this.state.tool_index}
             name="Working Tool"
             onChange={this.handleToolChange}
            >
            {
              working_tools.map((element, index) => {
                return <MenuItem key={index} value={index}>{element.name}</MenuItem>
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
          {base_working_timers[this.state.ore_index].level <= this.state.player_level ? "Base timer : " + timer + " (about " + hourly_exp + " experience per hour)" : "You probably can't mine this ore yet."}
        </div>
      </div>
    )
  }
}
