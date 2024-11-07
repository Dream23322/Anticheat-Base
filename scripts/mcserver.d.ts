//import { Player, Entity, EntityComponent, Container, ItemComponent, EnchantmentList } from "@minecraft/server";

declare module "@minecraft/server" {
	interface Player {
		Player,
		// Numbers
		cps: number,
		//@ts-ignore
		lastSafePos: Vector3,

		// Arrays
		// @ts-ignore
		entitiesHit: array
	}

	interface Entity {
		Entity,
		// Strings
		name: string,

		// Numbers
		cps: number,

		// Arrays
		// @ts-ignore
		entitiesHit: array
	}
}