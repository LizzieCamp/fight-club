import { Logger } from 'pino';
import * as prompts from 'prompts';
import createCharacter from '../characters/createCharacter';

export const cli = async (log: Logger) => {
    const response = await prompts([
        {
            type: 'text',
            name: 'characterName',
            message: 'Enter character name:',
        },
        {
            type: 'select',
            name: 'category',
            message: 'Select your character class',
            choices: [
                { title: 'Lightweight', value: 'lightweight' },
                { title: 'Middleweight', value: 'middleweight' },
                { title: 'Heavyweight', value: 'heavyweight' },
            ],
        },
    ]);
    const character = createCharacter(response.characterName, response.category);
    log.info(character);
};
