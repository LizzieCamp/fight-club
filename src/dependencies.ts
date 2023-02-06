import logger from './lib/logger';
import { cli } from './cli/cli';
import { startFight } from './tick/tick';
import { updateAttackResults } from './attack/updateAttackResults';

const log = logger();

const attack = updateAttackResults(log);

const fight = startFight(log, 100, attack);

export const startCLI = cli(log, fight);
