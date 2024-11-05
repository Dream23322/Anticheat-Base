import config from "../../data/config";
import { getSpeed } from "../../utils/player/playerMotion";
import { flag } from "../../utils/anticheat/punishment/flag";

export function speed_a(player) {
    if(!config.modules.movement.speedA.enabled) return;
    const player_speed = getSpeed(player);
    if(player_speed > 2) {
        flag(player, "Speed", "A", "Movement", `speed>>${player_speed}`, true);
    }
}