import create from './createCharacter';
import { CharacterCategory } from './types';

test.each([
    {
        name: 'light',
        category: 'lightweight',
        expected: {
            name: 'light',
            category: 'lightweight',
            agility: 1.25,
            hp: 75,
            damage: 10,
        },
    },
    {
        name: 'middle',
        category: 'middleweight',
        expected: {
            name: 'middle',
            category: 'middleweight',
            agility: 1,
            hp: 100,
            damage: 15,
        },
    },
    {
        name: 'heavy',
        category: 'heavyweight',
        expected: {
            name: 'heavy',
            category: 'heavyweight',
            agility: 0.75,
            hp: 125,
            damage: 20,
        },
    }
])('creates a $category character', ({ name, category, expected }) => {
    expect(create(name, category as CharacterCategory)).toEqual(expected);
});
