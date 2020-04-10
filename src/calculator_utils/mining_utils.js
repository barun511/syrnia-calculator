export default function calculate_mining_timer(ore_index, tool_index, player_level, ore_details_list, tools_details_list) {
    const ore = ore_details_list[ore_index];
    const tool = tools_details_list[tool_index];

    /*
        if($begtime < 800)
        {
            $time=ceil(
                $begtime*
                (
                    (
                        (1-
                            (
                                pow($miningl, 0.7728)+($miningl/5)
                            )/100
                        )
                    *$minespeed)
                )
            );
        }
        else if($begtime < 1500)
        {
            $time=ceil($begtime*(((1-(pow($miningl, 0.73)+($miningl/5))/100)*$minespeed)));
        }
        else
        {
            $time=ceil($begtime*(((1-(pow($miningl, 0.67)+($miningl/5))/100)*$minespeed)));
        }

        if($S_location=='Abydos')
        {
            $time*=1.5;
        }

        $time = ceil($time+($workersTime*2));

        if($time<$minTime){$time=$minTime;}
    */
    var exponential_factor;
    if(ore.timer < 800)
    {
        exponential_factor = 0.7728;
    }
    else if(ore.timer < 1500)
    {
        exponential_factor = 0.73;
    }
    else
    {
        exponential_factor = 0.67;
    }
    var tool_reduction_factor = tool.reduction/100;
    var work_timer_factor = ore.timer;
    var player_level_factor = 1 - (Math.pow(player_level, exponential_factor) + (player_level/5))/100;
    var min_timer = 29;
    if(ore.hasOwnProperty("throttle_level"))
    {
        var throttle_timer = ore.throttle_timer - (player_level >= ore.throttle_level ? player_level - ore.throttle_level : 0);
        if(throttle_timer < ore.min_timer)
        {
            throttle_timer = ore.min_timer;
        }
        min_timer = throttle_timer;
        console.log(throttle_timer);
    }
    if(ore.hasOwnProperty("abydos"))
    {
        player_level_factor*=1.5;
    }
    return Math.max(min_timer, Math.ceil(tool_reduction_factor*work_timer_factor*player_level_factor));
}