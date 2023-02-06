import { Logger } from 'pino';
import * as prompts from 'prompts';
import createCharacter from '../characters/createCharacter';
import { CharacterCategory } from '../characters/types';
import { rando } from '../lib/randomNumber';
import { StartFight } from '../tick/types';

type CategoriesList = CharacterCategory[];

const categories: CategoriesList = ['heavyweight', 'lightweight', 'middleweight'];

export const cli = (log: Logger, run: StartFight) => async () => {
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

    const opponentCategory = categories[rando(categories.length)];

    const opponent = createCharacter('Bill', opponentCategory);
    log.info(
        character.characterName +
            '(' +
            response.category +
            ') vs ' +
            opponent.characterName +
            '(' +
            opponentCategory +
            ')'
    );
    log.info('ROUND 1 BEGINS!');

    run([character, opponent]);
};
