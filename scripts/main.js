import * as Minecraft from "@minecraft/server";

// Import Movement Checks
import { speed_a } from "./checks/movement/speedA";
import { handleCombatClick } from "./managers/anticheat/check/combat/clickData";
import { handleData } from "./managers/player/tagData";

const world = Minecraft.world;
const system = Minecraft.system;

Minecraft.system.runInterval(() => {
    for (const player of world.getPlayers()) {
        handleData(player);
        // Run checks
        speed_a(player);
    }
});

world.afterEvents.entityHitEntity.subscribe(({ hitEntity: entity, damagingEntity: player}) => {
    console.warn(`[Anticheat] Entity: ${entity} was hit by Entity: ${player.name}`);
    handleCombatClick(player);

    // Run checks
    
});