import { Player } from "../tick/types";

export const deductHealth = (hp: number, player: Player): Player => ({
    ...player,
    currentHP: player.currentHP - hp,
});
