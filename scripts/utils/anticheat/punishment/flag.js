import * as Minecraft from "@minecraft/server";
import config from "../../../data/config";

const world = Minecraft.world;
const system = Minecraft.system;

// This links into punishmentHandler    

/**
 * @name flag
 * @remarks Sends an alert to all admins who wish to receive anticheat alerts
 * @param {object} player - The player flagging the check
 * @param {string} check - The check name, eg. "Speed", "Killaura", "Scaffold"
 * @param {string} id - The ID of the check, eg "A", "D", "H" (SpeedH, ScaffoldA, KillauraD, etc)
 * @param {string} catergory - The category of the check, eg. "Movement", "Combat", "World", "Other"
 * @param {string} debug - The debug message to send
 * @param {boolean} lagback - Whether or not to send a lagback, only matters if silent is off
 * @returns Nothing
 * @throws Error if check, id, or catergory is invalid
 */
export function flag(player, check, id, catergory, debug, lagback) {

    if(!player) return console.warn("[Anticheat] Player not found in flag from check: " + check);
    if(!check) return console.warn("[Anticheat] Check not found in flag from player: " + player.name);
    if(!id) return console.warn("[Anticheat] ID not found in flag from check: " + check);
    if(!catergory) return console.warn("[Anticheat] Catergory not found in flag from check: " + check);
    if(!debug) return console.warn("[Anticheat] Debug message not found in flag from check: " + check);
    if(!lagback) return console.warn("[Anticheat] Lagback not found in flag from check: " + check);


    for (const player_admin of world.getPlayers()) {
        if(player_admin.hasTag("anticheat_notify")) {
            player_admin.sendMessage("[Anticheat] " + player.name + " has failed " + check + " (" + id + ") [" + catergory + "] -> " + debug + (lagback ? " (lagback)" : "") + ". [x" + "" + "]");
        }
    }
    const playerVelocity = player.getVelocity()
    if(!config.settings.silent) player.teleport(player.location.x - playerVelocity.x, player.location.y, player.location.z - playerVelocity.z);

    
}