export default function calculate_woodcutting_timer(base_working_timer, tool_reduction, player_level) {
  // construct timer function
  // line : $time=ceil(($tooloff/100)*$werktijd*(((1-(pow($woodcuttingl, 0.7728)+($woodcuttingl/5))/100))))+$workersTime*2;
  // part 1
  var tool_reduction_factor = (tool_reduction/100);
  // part 2 : we already have base working Timer
  var work_timer_factor = base_working_timer;
  // part 3:
  var player_level_factor = 1 - (Math.pow(player_level, 0.7728) + (player_level/5))/100;
  return Math.max(29, Math.ceil(tool_reduction_factor*work_timer_factor*player_level_factor));
}
