import { Logger, LoggerOptions } from 'pino';
import { rando } from '../lib/randomNumber';
import { GameState } from '../tick/tick';

const afterDodge = (state: GameState, defendent) => {
    defendent.lastAttemptedDodge = state.tick;
    defendent.canDodge = false;
};

const willTheyDodge = (log: Logger<LoggerOptions>, random: Number, attacker, defendent) => {
    if (random <= 5) {
        defendent.currentHP -= attacker.damage;
        log.info(
            { defendentHealth: defendent.currentHP },
            defendent.characterName +
                ' cant dodge in time. ' +
                attacker.characterName +
                ' attacks ' +
                defendent.characterName
        );
    } else {
        log.info(
            { defendentHealth: defendent.currentHP },
            defendent.characterName + ' dodges an attack from ' + attacker.characterName
        );
    }
};

export const attack = (log: Logger<LoggerOptions>, state: GameState, attacker, defendent) => {
    if (state.tick % attacker.attackCooldown === 0) {
        if (defendent.canDodge === true) {
            const random = rando(defendent.agility);
            afterDodge(state, defendent);
            willTheyDodge(log, random, attacker, defendent);
        } else {
            defendent.currentHP -= attacker.damage;
            log.info(
                { defendentHealth: defendent.currentHP },
                attacker.characterName + ' attacks ' + defendent.characterName
            );
        }
    }
};
