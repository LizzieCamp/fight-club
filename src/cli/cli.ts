import { Logger } from 'pino';
import * as prompts from 'prompts';
import createCharacter from '../characters/createCharacter';
import { CharacterCategory } from '../characters/types';
import { rando } from '../lib/randomNumber';
import { run } from '../tick/tick';

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

    run(log, 500, [character, opponent]);
};


//agility is chance of dodging - have a dodge cooldown too - dodge logic - percentage change to dodge - percentage chance of hitting
// set up thing incase for draw
// tracking more stuff in state - evade(dodge)cooldown 
