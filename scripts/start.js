import * as Minecraft from "@minecraft/server";

const world = Minecraft.world;

// As of version 2.0.0-beta or somewhere around that you have to do this in a tick... why mojang?
Minecraft.system.run(() => {
    const logsList = world.getDynamicProperty("anticheat_logs");
    if(logsList) {
        console.warn(`[Anticheat] Logs list loaded correctly`);
    }
});

import './main.js'
console.warn(`[Anticheat] Script started`);