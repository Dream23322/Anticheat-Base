import { Player, Entity, EntityComponent, Container, ItemComponent, EnchantmentList } from "@minecraft/server";

declare module "@minecraft/server" {
	interface Player {
		Player,
		// Numbers
		cps: number,

		// Arrays
		entitiesHit: array
	}

	interface Entity {
		Entity,
		// Strings
		name: string,

		// Numbers
		cps: number,

		// Arrays
		entitiesHit: array
	}
}