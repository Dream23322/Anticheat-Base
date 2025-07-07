import { getScore } from "../player/playerGeneral";
import config from "../../data/config";
import { movement_checks, combat_checks, world_checks, other_checks } from "../../data/data";
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

/**
 * @name getViolationsTotal
 * @description Gets the total violations of all checks
 * @param {object} player 
 * @returns Total violations of all checks (as on integer)
 */
export function getViolationsTotal(player) {
    let total_vl = 0;
    for (const check_name of [...movement_checks, ...combat_checks, ...world_checks, ...other_checks]) {
        total_vl += getViolationsCheck(player, check_name);
    }
    return total_vl;
}

/**
 * @name getViolationsCategory
 * @description Gets the violations of a check category
 * @param {object} player
 * @param {string} category
 * @returns Integer value of violations of a category
 */
export function getViolationsCategory(player, category) {
    if(category === "movement" || category === "world" || category === "combat" || category === "other") {
        let catergory_vl = 0;
        const checks = category === "movement" ? movement_checks : category === "world" ? world_checks : category === "combat" ? combat_checks : other_checks;
        for (const check of checks) {
            catergory_vl += getViolationsCheck(player, check);
        }
        return catergory_vl;
    } else {
        return 0;   
    }
}