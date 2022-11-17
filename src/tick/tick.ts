import { Logger } from 'pino';
import { setTimeout } from 'timers/promises';
import { CharacterAttributes } from '../characters/types';

type GameState = {
    p1: CharacterAttributes & CharacterState;
    p2: CharacterAttributes & CharacterState;
    tick: number;
};

export type CharacterState = {
    currentHP: number;
    isAlive: boolean;
};

export const run = async (
    log: Logger,
    interval: number,
    chars: [CharacterAttributes, CharacterAttributes]
) => {
    const state: GameState = {
        p1: {
            ...chars[0],
            currentHP: chars[0].maxHP,
            isAlive: true,
        },
        p2: {
            ...chars[1],
            currentHP: chars[1].maxHP,
            isAlive: true,
        },
        tick: 0,
    };
    while (state.p1.isAlive && state.p2.isAlive) {
        await setTimeout(interval);

        if (state.tick % state.p1.attackCooldown === 0) {
            state.p2.currentHP -= state.p1.damage;
            log.info({p2Health: state.p2.currentHP}, 'P1 attacks P2');
        }
        if (state.tick % state.p2.attackCooldown === 0) {
            state.p1.currentHP -= state.p2.damage;
            log.info({p1Health: state.p1.currentHP}, 'P2 attacks P1');
        }

        if (state.p1.currentHP <= 0) {
            state.p1.isAlive = false;
        }
        if (state.p2.currentHP <= 0) {
            state.p2.isAlive = false;
        }
        state.tick++;
    }
    const winner = state.p1.isAlive ? state.p1 : state.p2;
    log.info(winner, 'Winner');
};
