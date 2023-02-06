import { Player } from "../tick/types";

export const resetDodgeState = (tick: number, player: Player) => {
    player.lastAttemptedDodge = tick;
    player.canDodge = false;
};
