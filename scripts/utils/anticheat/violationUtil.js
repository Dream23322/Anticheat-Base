import { getScore } from "../player/playerGeneral";
/**
 * @name getViolationsCheck
 * @description Gets the violations of a check
 * @param {object} player - The target you are getting the viloations from
 * @param {string} check - The check to get violations of, eg. speed, killaura, scaffold
 * @returns Integer value of violations
 */
export function getViolationsCheck(player, check) {
    try {
        return getScore(player, `anticheat_${check}_vl`, 0);
    } catch (error) {
        console.warn("[Anticheat] Error getting violations for check: " + check);
        return 0;
    }
}

export function getViolationsTotal(player, check) {
    
}