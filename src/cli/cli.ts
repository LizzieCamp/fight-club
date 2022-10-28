import { Logger } from 'pino';
import * as prompts from 'prompts';
import createCharacter from '../characters/createCharacter';
import { CharacterCategory } from '../characters/types';

type CategoriesList = CharacterCategory[];

const categories: CategoriesList = ['heavyweight', 'lightweight', 'middleweight'];

export const rando = (categories: CategoriesList) => {
    const number = Math.floor(Math.random() * categories.length);
    return categories[number];
};

console.log(categories);

export const cli = async (log: Logger) => {
    console.log(rando(categories));
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

    const chosenCharacterName =
        response.characterName.charAt(0).toUpperCase() +
        response.characterName.slice(1).toLowerCase();
    const character = createCharacter(chosenCharacterName, response.category);

    const opponent = createCharacter('charlie', rando(categories));
    log.info(opponent);
    log.info(character);
};
