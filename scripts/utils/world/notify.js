import * as Minecraft from "@minecraft/server";
import config from "../../../data/config";

const world = Minecraft.world;
export function notifyAdmins(message) {
    for (const player of world.getPlayers()) if(player.hasTag("anticheat_notify")) {
        player.sendMessage(message);
    }
}