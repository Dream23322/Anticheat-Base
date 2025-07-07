import * as Minecraft from "@minecraft/server";
import config from "../../../data/config";

const world = Minecraft.world;
/**
 * @name notifyAdmins
 * @description Sends a message to all players who have the "anticheat_notify" tag.
 * @param {string} message - The message to be sent to the notifying players.
 * @returns {void}
 */
export function notifyAdmins(message) {
    for (const player of world.getPlayers()) if(player.hasTag("anticheat_notify")) {
        player.sendMessage(message);
    }
}