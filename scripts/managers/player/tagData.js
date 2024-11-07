import * as Minecraft from "@minecraft/server";
import { isMoving } from "../../utils/player/playerMotion";

/**
 * @name handleData
 * @description Handles the player's tag data
 * @param {object} player - The player being handled by the function
 */
export function handleData(player) {
    /*
    You shouldn't really need to edit this when you first start making your anticheat, but later on you might have to.
    Though, be warned, changing stuff in here later on can cause some older checks to not work as intended.
    */


    // Handle damage
    if(player.hasTag("anticheat_damage") && Date.now() - player.lastDamageTime > 5000) player.removeTag("anticheat_damage");


    /*
    Handle Movement
    */

    // Handing isMoving
    if(isMoving(player)) {

        player.addTag("anticheat_ismoving");
        
    } else player.removeTag("anticheat_ismoving");

    // Handle ground
    if(player.onGround) player.addTag("anticheat_ground");
    else player.removeTag("anticheat_ground");

    // Handle jump
    if(!player.hasTag("anticheat_jump") && player.isJumping) player.addTag("anticheat_jump")
    else if(player.hasTag("anticheat_jump") && !player.isJumping && player.onGround) player.removeTag("anticheat_jump");
}