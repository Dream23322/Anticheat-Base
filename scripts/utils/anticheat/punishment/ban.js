import { notifyAdmins } from "../../world/notify";

/**
 * @name checkBan
 * @description Checks if a player is banned and if so, handles the ban.
 * @param {object} player - The player to check.
 * @returns {void}
 */
export function checkBan(player) {

    if(player.hasTag("anticheat_isbanned")) {

        // Get ban information
        player.getTags().forEach(t => {
            if(t.includes("anticheat_by:")) by = t.slice(12);
                else if(t.includes("anticheat_reason:")) reason = t.slice(18);
                else if(t.includes("anicheat_time:")) time = t.slice(13);
        });

        // Handle time stuff
        if(time) {
            if(time < Date.now()) {
                console.log("[Anticheat] Ban expired for player: " + player.name);
                notifyAdmins(`[Anticheat] Ban expired for player: ${player.name}`);
                // ban expired, woo
                player.removeTag("isBanned");
                player.getTags().forEach(t => {
                    if(t.includes("reason:") || t.includes("by:") || t.includes("time:")) player.removeTag(t);
                });
                return;
            }
    
            time = msToTime(Number(time));
            time = `${time.w} weeks, ${time.d} days, ${time.h} hours, ${time.m} minutes, ${time.s} seconds`;
        }

        // Kick the player with punishment information
        try {
            console.log("[Anticheat] Player " + player.name + " was removed for being banned! Reason: " + reason + " By: " + by + " Time: " + time);
            player.runCommandAsync(`kick "${player.name}" §r\n§l§cYOU ARE BANNED!\n§mBanned By:§r ${by || "N/A"}\n§bReason:§r ${reason || "N/A"}\n§aBan Length:§r ${time || "Permanant"}`);
        } catch (error) {
            console.warn("[Anticheat] Error removing player: " + player.name);
        }
    }
}