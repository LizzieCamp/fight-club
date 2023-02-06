import { CharacterAttributes } from '../characters';

export type Player = CharacterAttributes & CharacterState;

export type GameState = {
    p1: Player;
    p2: Player;
    tick: number;
};

export type CharacterState = {
    currentHP: number;
    isAlive: boolean;
    canDodge: boolean;
    lastAttemptedDodge: number;
};

export type StartFight = (chars: [CharacterAttributes, CharacterAttributes]) => Promise<void>;
