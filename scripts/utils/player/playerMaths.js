
/*
Player Maths
- 4urxra

File that contains useful functions for player maths that can be used in anticheat checks
*/

/**
 * @name getAngle
 * @remarks Gets the angle between the player (Attacker) and entityHit (Target)
 * @param {*} player - Player (Attacker)
 * @param {*} entityHit - Entity (Target)
 * @returns The angle between the player (Attacker) and entityHit (Target)
 */
export function getAngle(player, entityHit) {
    const dx = entityHit.location.x - player.location.x;
    const dz = entityHit.location.z - player.location.z;
    const angleToEntity = Math.atan2(dz, dx) * 180 / PI;
    let angle = angleToEntity - player.getRotation().y - 90;
    
    if (angle <= -180) {
        angle += 360;
    }
    
    return fastAbs(angle);
}