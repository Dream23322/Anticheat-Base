import * as Minecraft from "@minecraft/server";

import { handleCombatClick } from "./managers/anticheat/check/combat/clickData";
import { handleData } from "./managers/player/tagData";
import { runTickChecks } from "./managers/anticheat/check/checkRunner";
import { checkOnHit } from "./checks/combat/handleCombat";

const world = Minecraft.world;
const system = Minecraft.system;

Minecraft.system.runInterval(() => {
    for (const player of world.getPlayers()) {
        handleData(player);
        // Run checks
        runTickChecks(player);
    }
});

world.afterEvents.entityHitEntity.subscribe(({ hitEntity: entity, damagingEntity: player}) => {
    console.warn(`[Anticheat] Entity: ${entity} was hit by Entity: ${player.name}`);
    handleCombatClick(player);

    // Run checks
    checkOnHit(player, entity);
    
});