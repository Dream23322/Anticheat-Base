import * as Minecraft from "@minecraft/server";
import config from "./config";
const world = Minecraft.world;
export function addLog(data) {
    const logsList = world.getDynamicProperty("anticheat_logs");
    if(!logsList) {
        world.setDynamicProperty("anticheat_logs", [data]);
    } else {
        logsList.push(data);
        if(logsList.length > config.settings.maxLogs) logsList.shift();
        world.setDynamicProperty("anticheat_logs", logsList);
    }

    console.warn(`[Anticheat] Log added: ${data}`);
}