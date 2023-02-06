import { StateUpdater } from '../characters/types';
import { willDodge } from '../dodge/willDodge';

export const updateDodgeCooldowns: StateUpdater = (state) => {
    const newState = { ...state };

    willDodge(state, state.p1, newState.p1);
    willDodge(state, state.p2, newState.p2);
    return newState;
};
