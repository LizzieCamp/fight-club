import logger from './lib/logger';
import { cli } from './cli/cli';

const log = logger();

(async () => {
    await cli(log);
})();
