export default function calculate_fishing_timer(base_working_timer, tool_reduction, player_level, min_timer) {
  // construct timer function
  // line : $time=ceil(($tooloff/100)*$werktijd*(((1-(pow($woodcuttingl, 0.7728)+($woodcuttingl/5))/100))))+$workersTime*2;
  // part 1
  var tool_reduction_factor = tool_reduction;
  // part 2 : we already have base working Timer
  var work_timer_factor = base_working_timer;
  // part 3:
  let player_level_factor;
  if(base_working_timer < 600) {
    player_level_factor = 1 - (Math.pow(player_level, 0.7728) + (player_level/5))/100;
  }
  else {
    player_level_factor = 1 - (Math.pow(player_level, 0.67) + (player_level/5))/100;
  }
  return Math.max(min_timer, Math.ceil(tool_reduction_factor*work_timer_factor*player_level_factor));
}
