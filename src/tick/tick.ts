import { Logger } from 'pino';
import { setTimeout } from 'timers/promises';
import { CharacterAttributes } from '../characters/types';
import { attack } from '../lib/attack';
import { willDodge } from '../lib/willDodge';

export type GameState = {
    p1: CharacterAttributes & CharacterState;
    p2: CharacterAttributes & CharacterState;
    tick: number;
};

export type CharacterState = {
    currentHP: number;
    isAlive: boolean;
    canDodge: boolean;
    lastAttemptedDodge: number;
};

export const run = async (
    log: Logger,
    interval: number,
    chars: [CharacterAttributes, CharacterAttributes]
) => {
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

    const updateDodgeCooldowns = (state: Readonly<GameState>): GameState => {
        const newState = { ...state };

        willDodge(state, state.p1, newState.p1);
        willDodge(state, state.p2, newState.p2);

        return newState;
    };

    while (state.p1.isAlive && state.p2.isAlive) {
        await setTimeout(interval);

        state = updateDodgeCooldowns(state);

        attack(log, state, state.p1, state.p2);
        attack(log, state, state.p2, state.p1);


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







//Dodging logic
// if being attacked
// if canDodge
// use random (max: 10)) <--- higher agility will have higher max/ (Could be decimal then do `10 * agility`)
// if lte 5,
// got hit, deduct hp
// set lastAttemptedDodge to tick
// set canDodge to false
// else deduct hp

// if (state.tick % state.p1.attackCooldown === 0) {
//     if (state.p2.canDodge === true) {
//         const random = rando(state.p2.agility);
//         console.log('for p2: ' + random);
//         state.p2.lastAttemptedDodge = state.tick;
//         state.p2.canDodge = false;
//         if (random <= 5) {
//             state.p2.currentHP -= state.p1.damage;
//             log.info(
//                 { p2Health: state.p2.currentHP },
//                 state.p2.characterName +
//                     ' cant dodge in time. ' +
//                     state.p1.characterName +
//                     ' attacks ' +
//                     state.p2.characterName
//             );
//         } else {
//             log.info(
//                 { p2Health: state.p2.currentHP },
//                 state.p2.characterName + ' dodges an attack from ' + state.p1.characterName
//             );
//         }
//     } else {
//         state.p2.currentHP -= state.p1.damage;
//         log.info(
//             { p2Health: state.p2.currentHP },
//             state.p1.characterName + ' attacks ' + state.p2.characterName
//         );
//     }
// }

// if (state.tick % state.p2.attackCooldown === 0) {
//     if (state.p1.canDodge === true) {
//         const random = rando(state.p1.agility);
//         console.log('for p1: ' + random);
//         state.p1.lastAttemptedDodge = state.tick;
//         state.p1.canDodge = false;
//         if (random <= 5) {
//             console.log('p1 cant dodge');
//             state.p1.currentHP -= state.p2.damage;
//             log.info(
//                 { p1Health: state.p1.currentHP },
//                 state.p1.characterName +
//                     ' cant dodge in time. ' +
//                     state.p2.characterName +
//                     ' attacks ' +
//                     state.p1.characterName
//             );
//         } else {
//             log.info(
//                 { p1Health: state.p1.currentHP },
//                 state.p1.characterName + ' dodges an attack from ' + state.p2.characterName
//             );
//         }
//     } else {
//         console.log('p1 cant dodge');
//         state.p1.currentHP -= state.p2.damage;
//         log.info(
//             { p1Health: state.p1.currentHP },
//             state.p2.characterName + ' attacks ' + state.p1.characterName
//         );
//     }
// }

//can dodge logic
// if (state.p1.canDodge === false) {
//     if (state.p1.lastAttemptedDodge + state.p1.dodgeCooldown === state.tick) {
//         newState.p1.canDodge = true;
//     }
// }

// if (state.p2.canDodge === false) {
//     if (state.p2.lastAttemptedDodge + state.p2.dodgeCooldown === state.tick) {
//         newState.p2.canDodge = true;
//     }
// }
