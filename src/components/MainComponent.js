import React from 'react';
import {AppBar, Container, CssBaseline, Tabs, Tab, Typography, Box} from '@material-ui/core';
import WoodcuttingCalculator from './calculator_components/WoodcuttingCalculator';
import FishingCalculator from './calculator_components/FishingCalculator';
import CombatLevelCalculator from './calculator_components/CombatLevelCalculator';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({
      selectedValue: value,
    });
  };

  render() {
    return (
      <div className="container">
      <CssBaseline />
        <AppBar position="static">
          <Tabs value={this.state.selectedValue} onChange={this.handleChange}>
          <Tab label="Woodcutting Timer Calculator"/>
          <Tab label="Fishing Timer Calculator"/>
          <Tab label="Combat Level Calculator"/>
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.selectedValue} index={0}>
          <WoodcuttingCalculator />
        </TabPanel>
        <TabPanel value={this.state.selectedValue} index={1}>
          <FishingCalculator />
        </TabPanel>
        <TabPanel value={this.state.selectedValue} index={2}>
          <CombatLevelCalculator />
        </TabPanel>
      </div>
    )
  }
}
