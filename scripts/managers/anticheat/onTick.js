import { getScore, setScore } from "../utils/player/playerGeneral";
import { handleSecond } from "./check/other/packetData";

export function onTick(player) {

    setScore(player, "anticheat_ticks", getScore(player, "anticheat_ticks") + 1);

    if(getScore(player, "anticheat_ticks") >= 20) {
        
        setScore(player, "anticheat_ticks", 0);

        handleSecond(player);
    }
}