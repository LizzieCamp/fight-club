import { Logger } from 'pino';
import * as prompts from 'prompts';
import createCharacter from '../characters/createCharacter';
import { CharacterCategory } from '../characters/types';
import { rando } from '../lib/randomNumber';

type CategoriesList = CharacterCategory[];

const categories: CategoriesList = ['heavyweight', 'lightweight', 'middleweight'];

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

    const opponent = createCharacter('charlie', categories[rando(categories.length)]);
    log.info(opponent);
    log.info(character);
};
