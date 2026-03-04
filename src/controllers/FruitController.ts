import { fruitsList } from '../models/Fruits';

export class FruitController {
    displayFruits() {
        fruitsList.forEach(fruit => {
            console.log(`Name: ${fruit.name}, Color: ${fruit.color}, Weight: ${fruit.weight}`);
        });
    }
}