import * as Minecraft from "@minecraft/server";

const world = Minecraft.world;

const logsList = world.getDynamicProperty("anticheat_logs");
if(logsList) {
    console.warn(`[Anticheat] Logs list loaded correctly`);
}

import './main.js'
console.warn(`[Anticheat] Script started`);