function rand(min, max) {
    let randomNum = Math.random() * (max - min) + min;
    return Math.round(randomNum);
 }

export default function calculate_average_hit(player_attack, player_strength, player_aim, player_power, enemy_defence) {
    if(player_attack <= 0) {
        player_attack = 1;
    }
    if(player_strength <= 0 ) {
        player_strength = 1;
    }
    if(enemy_defence <= 0 ) {
        enemy_defence = 1;
    }
    var attack_factor = (player_attack + player_aim)*.35 + 1;

    var max_hit = (player_strength + player_power)*.35 + 1;

    console.log(max_hit);
    var asratio = (attack_factor)/2/max_hit * 100;

    var sum = 0;
    for(var i=0;i<1000;i++) {
        var hitBelow = rand(0, asratio);
        var hitAbove = rand(asratio, 100);
        var hitPercent = rand(hitBelow, hitAbove);
        hitPercent = Math.min(hitPercent, 100);
        var hit = max_hit*hitPercent/100;
        //
        // var enemyDef = (enemy_defence)*.35;
        // var enemyDefRatio = enemyDef/2/attack_factor * 100;
        // enemyDefRatio = Math.min(enemyDefRatio, 100);
        // var blockBelow = rand(0, enemyDefRatio);
        // var blockAbove = rand(enemyDefRatio, 100);
        // var blockPercent = 100 - rand(blockBelow, blockAbove);
        
        // var final_hit = Math.round(hit*blockPercent/100);
        var final_hit = hit;
        console.log(final_hit);
        sum += final_hit;
    }
    return (sum/1000);
}