import { rando } from '../lib/randomNumber';
export const didDodge = (agility: number) => rando(agility) > 5;
