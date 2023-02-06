import { Logger } from 'pino';
import { StateUpdater } from '../characters/types';
import { canAttack } from './canAttack';
import { resetDodgeState } from './resetDodgeState';
import { didDodge } from './didDodge';
import { deductHealth } from './deductHealth';
import { Player } from '../tick/types';

export const updateAttackResults =
    (log: Logger): StateUpdater =>
    (state) => {
        const newState = { ...state };

        const turns: [Player, Player][] = [
            [newState.p1, newState.p2],
            [newState.p2, newState.p1],
        ];

        turns.forEach(([attacker, defender]) => {
            if (!canAttack(state.tick, attacker.attackCooldown)) {
                return;
            }

            if (defender.canDodge) {
                log.info('%s is about to try and dodge', defender.characterName);
                resetDodgeState(state.tick, defender);

                if (!didDodge(defender.agility)) {
                    defender === newState.p1
                        ? (newState.p1 = deductHealth(attacker.damage, defender))
                        : (newState.p2 = deductHealth(attacker.damage, defender));
                    log.warn(
                        '%s was attacked. HP remaining: %s',
                        defender.characterName,
                        defender.currentHP
                    );
                    return;
                }
                log.info('%s dodged!', defender.characterName);
                return;
            }
            log.warn(
                '%s was attacked. HP remaining: %s',
                defender.characterName,
                defender.currentHP
            );
            return deductHealth(attacker.damage, defender);
        });

        return newState;
    };
