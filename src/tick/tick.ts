import { Logger } from 'pino';
import { setTimeout } from 'timers/promises';
import { StateUpdater } from '../characters/types';
import { updateDodgeCooldowns } from '../dodge';
import { GameState, StartFight } from './types';

export const startFight =
    (log: Logger, interval: number, attack: StateUpdater): StartFight =>
    async (chars) => {
        let state: GameState = {
            p1: {
                ...chars[0],
                currentHP: chars[0].maxHP,
                isAlive: true,
                canDodge: true,
                lastAttemptedDodge: 0,
            },
            p2: {
                ...chars[1],
                currentHP: chars[1].maxHP,
                isAlive: true,
                canDodge: true,
                lastAttemptedDodge: 0,
            },
            tick: 0,
        };

        // update cooldowns function which calls update dodge cooldowns and update attack cooldowns

        while (state.p1.isAlive && state.p2.isAlive) {
            await setTimeout(interval);

            state = updateDodgeCooldowns(state);
            state = attack(state);

            if (state.p1.currentHP <= 0) {
                state.p1.isAlive = false;
            }
            if (state.p2.currentHP <= 0) {
                state.p2.isAlive = false;
            }
            state.tick++;
        }
        if (!state.p1.isAlive && !state.p2.isAlive) {
            log.info({ P1Stats: state.p1, P2Stats: state.p2 }, 'A Draw!');
        } else {
            const winner = state.p1.isAlive ? state.p1 : state.p2;
            log.info('Winner is: ' + winner.characterName);
        }
    };