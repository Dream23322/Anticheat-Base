import * as Minecraft from "@minecraft/server";

// Import Movement Checks
import { speed_a } from "./checks/movement/speedA";

const world = Minecraft.world;
const system = Minecraft.system;

Minecraft.system.runInterval(() => {
    for (const player of world.getPlayers()) {
        // Run checks
        speed_a(player);
    }
});

world.afterEvents.entityHitEntity.subscribe(({ hitEntity: entity, damagingEntity: player}) => {
    console.warn(`[Anticheat] Entity: ${entity} was hit by Entity: ${player.name}`);
    player.cps++;
    // Run checks
    
});