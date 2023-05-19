

export class Difficulty {

    constructor(
        public scoreTrigger: number,
        public accelerationModifier: number,
        public maxDistance: number
    ) {}
}

export const DIFFICULTIES = [
    new Difficulty(10, 1, 400),
    new Difficulty(25, 2, 500),
    new Difficulty(40, 3, 550)
];
