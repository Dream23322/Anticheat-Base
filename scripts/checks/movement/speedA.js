import config from "../../data/config";
import { getSpeed } from "../../utils/player/playerMotion";

export function speed_a(player) {
    if(!config.modules.movement.speedA.enabled) return;

    if(getSpeed(player) > 2) {
        // Placeholder
    }
}