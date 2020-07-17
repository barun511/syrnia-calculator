import React from 'react';
import { TextField } from '@material-ui/core';
import calculate_average_hit from '../../calculator_utils/averagehit_utils';

export default class AverageHitCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attack_level: 1,
            strength_level: 1,
            enemy_defence_level: 1,
            aim: 1,
            power: 1,
        };
    }
    render() {
        return (
            <div className="average-hit-calculator">
                <div className="player-stats-row">
                    <div className="player-stats player-attack-level">
                        <TextField label="Player Attack Level"
                        type="number"
                        value={this.state.attack_level >=1 ? this.state.attack_level : ""}
                        onChange={(e) => {
                            this.setState({
                                attack_level: Number(e.target.value),
                            });
                        }}
                        />
                    </div>
                    <div className="player-stats player-strength-level">
                        <TextField label="Player Strength Level"
                        type="number"
                        value={this.state.strength_level >=1 ? this.state.strength_level : ""}
                        onChange={(e) => {
                            this.setState({
                                strength_level: Number(e.target.value),
                            });
                        }}
                        />
                    </div>
                    <div className="player-stats player-aim">
                        <TextField label="Aim"
                        type="number"
                        value={this.state.aim >=1 ? this.state.aim : ""}
                        onChange={(e) => {
                            this.setState({
                                aim: Number(e.target.value),
                            });
                        }}
                        />
                    </div>
                    <div className="player-stats player-power">
                        <TextField label="Power"
                        type="number"
                        value={this.state.power >=1 ? this.state.power : ""}
                        onChange={(e) => {
                            this.setState({
                                power: Number(e.target.value),
                            });
                        }}
                        />
                    </div>
                </div>
                {/* <div className="enemy-stats-row">
                    <TextField label="Enemy Defence Level"
                        type="number"
                        value={this.state.enemy_defence_level >=1 ? this.state.enemy_defence_level : ""}
                        onChange={(e) => {
                            this.setState({
                                enemy_defence_level: Number(e.target.value),
                            });
                        }}
                    />
                </div> */}
                <div className="player-stats result">
                    Your average hit is {calculate_average_hit(this.state.attack_level, this.state.strength_level, this.state.aim, this.state.power, this.state.enemy_defence_level)}.
                </div>
            </div>
        )
    }
}