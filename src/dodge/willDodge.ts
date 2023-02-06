import { GameState } from '../tick/types';

export const willDodge = (state: GameState, defendent, newState) => {
    if (defendent.canDodge === false) {
        if (defendent.lastAttemptedDodge + defendent.dodgeCooldown === state.tick) {
            newState.canDodge = true;
        }
    }
};
