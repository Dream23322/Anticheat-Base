

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

/**
 * @name isMoving
 * @remarks Checks if the player is moving
 * @param {object} player - player object (The target)
 * @returns boolean value of if the player is moving
 */
export function isMoving(player) {
    const speed = getSpeed(player);
    const hasMotion = (
        player.getVelocity().x !== 0 ||
        player.getVelocity().y !== 0 ||
        player.getVelocity().z !== 0
    )
    const posDiff = (
        player.lastPosition.x !== player.location.x ||
        player.lastPosition.y !== player.location.y ||
        player.lastPosition.z !== player.location.z
    )
    return hasMotion || speed > 0 || posDiff
}

/**
 * 
 * @param {object} player 
 * @returns All keys pressed by the player as a list
 */
export function getPressedKeys(player) {
    const keys = [];
    if (player.isSneaking) keys.push("sneak");
    if (player.isSprinting) keys.push("sprint");
    if (player.isJumping) keys.push("jump");

    const inputData = player.inputInfo.getMovementVector();

    if (inputData.y > 0) keys.push("W");
    if (inputData.y < 0) keys.push("S");
    if (inputData.x > 0) keys.push("D");
    if (inputData.x < 0) keys.push("A");
    return keys;
}