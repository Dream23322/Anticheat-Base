import { speed_a } from "../../../checks/movement/speedA";

// Runs checks that don't require event data

/**
 * @name runTickChecks
 * @description Runs checks that don't require event data
 * @param {object} player 
 * @returns {void}
 */
export function runTickChecks(player) {
    speed_a(player);
}