import {getScore,setScore} from "../../../../utils/player/playerGeneral";

const tags = [
    "anticheat_packet_move",
    "anticheat_packet_rotation",
    "anticheat_packet_block_place",
    "anticheat_packet_block_break",
    "anticheat_packet_attack",
    "anticheat_packet_sprint",
    "anticheat_packet_jump",
    "anticheat_packet_sneak",
    "anticheat_packet_use_item"
];

/**
 * Increments the player's anticheat packet score.
 * 
 * @param {Object} player - The player object.
 * @param {String} packet - The type of packet
 * @returns {void}
 * @throws Error if packet is not a string or isnt in the case
 */
export function handlePacket(player, packet) {
    doPacket(player);
    switch (packet) {
        case "move":
            setScore(player, "anticheat_packets_move", getScore(player, "anticheat_packets_move") + 1);
            player.addTag(tags[0]);
            break;

        case "rotation":
            setScore(player, "anticheat_packets_rotation", getScore(player, "anticheat_packets_rotation") + 1);
            player.addTag(tags[1]);
            break;
        
        case "blockPlace":
            setScore(player, "anticheat_packets_blockPlace", getScore(player, "anticheat_packets_blockPlace") + 1);
            player.addTag(tags[2]);
            break;
        
        case "blockBreak":
            setScore(player, "anticheat_packets_blockBreak", getScore(player, "anticheat_packets_blockBreak") + 1);
            player.addTag(tags[3]);
            break;

        case "attackEntity":
            setScore(player, "anticheat_packets_attackEntity", getScore(player, "anticheat_packets_attackEntity") + 1);
            player.addTag(tags[4]);
            break;

        case "sprint":
            setScore(player, "anticheat_packets_sprint", getScore(player, "anticheat_packets_sprint") + 1);
            player.addTag(tags[5]);
            break;
        
        case "jump":
            setScore(player, "anticheat_packets_jump", getScore(player, "anticheat_packets_jump") + 1);
            player.addTag(tags[6]);
            break;
        
        case "sneak":
            setScore(player, "anticheat_packets_sneak", getScore(player, "anticheat_packets_sneak") + 1);
            player.addTag(tags[7]);
            break;
        
        case "useItem":
            setScore(player, "anticheat_packets_useItem", getScore(player, "anticheat_packets_useItem") + 1);
            player.addTag(tags[8]);
            break;
    }

    throw(new Error("Error: packet is not a string or isnt in the case"));
}

/**
 * Increments the player's anticheat packet score.
 * 
 * @param {Object} player - The player object.
 * @param {Function} player.addTag - Function to add a tag to the player.
 * @returns {void}
 */
export function doPacket(player) {
    setScore(player, "anticheat_packets", getScore(player, "anticheat_packets") + 1);

    // Maybe make a check using this :thinking:
    // Already in Isolate so I don't see why u cant use it here
}

/**
 * Resets the player's anticheat packet score and removes all associated tags.
 * 
 * @param {Object} player - The player object.
 * @param {Function} player.removeTag - Function to remove a tag from the player.
 * @returns {void}
 */
export function handleSecond(player) {
    setScore(player, "anticheat_packets", 0);
    for (const tag of tags) player.removeTag(tag);
}
