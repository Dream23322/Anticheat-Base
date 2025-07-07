import * as Minecraft from "@minecraft/server";

const world = Minecraft.world;

/**
 * @name getScore
 * @param {Minecraft.Entity} player - The player to get the scoreboard value from
 * @param {string} objective - The player to get the scoreboard value from
 * @param {number} [defaultValue] - Default value to return if unable to get scoreboard score
 * @example getScore(player, "cbevl", 0)
 * @remarks Get's the scoreboard objective value for a player
 * @returns {number} score - The scoreboard objective value
 */
export function getScore(player, objective, defaultValue = 0) {
    if(typeof player !== "object") throw TypeError(`Error: player is type of ${typeof player}. Expected "object"`);
    if(typeof objective !== "string") throw TypeError(`Error: objective is type of ${typeof objective}. Expected "string"`);
    if(typeof defaultValue !== "number") throw TypeError(`Error: defaultValue is type of ${typeof defaultValue}. Expected "number"`);

    try {
       return world.scoreboard.getObjective(objective).getScore(player) ?? defaultValue;
    } catch {
        return defaultValue;
    }
}

/**
 * @name setScore
 * @param {import("@minecraft/server").Entity} player - The player to set the score for
 * @param {string} objectiveName - The scoreboard objective
 * @param {number} value - The new value of the scoreboard objective
 * @example getScore(player, "cbevl", 0)
 * @remarks Sets the scoreboard objective value for a player
 */
export function setScore(player, objectiveName, value) {
    if(typeof player !== "object") throw TypeError(`Error: player is type of ${typeof player}. Expected "object"`);
    if(typeof objectiveName !== "string") throw TypeError(`Error: objective is type of ${typeof objectiveName}. Expected "string"`);
    if(typeof value !== "number") throw TypeError(`Error: value is type of ${typeof value}. Expected "number"`);

    const objective = world.scoreboard.getObjective(objectiveName);
    if(!objective) {
        player.runCommandAsync(`scoreboard objectives add ${objectiveName} dummy`)
    }
    objective.setScore(player, value);
}