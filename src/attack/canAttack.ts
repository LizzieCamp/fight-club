export const canAttack = (tick: number, cooldown: number) => tick % cooldown === 0;
