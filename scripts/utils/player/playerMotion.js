

/*
Player Motion Utils
- 4urxra

File that contains useful functions for player motion/speed that can be used in anticheat checks
*/

/**
 * @name getSpeed
 * @remarks Gets the speed of the player (param#1)
 * @param {object} player - player object (The target)
 * @returns float value of the players speed based on velocity
 */
export function getSpeed(player) {
    const playerVelocity = player.getVelocity();
    const playerSpeed = Number(fastSqrt(fastAbs(playerVelocity.x**2 +playerVelocity.z**2)).toFixed(2));
    return playerSpeed;
}