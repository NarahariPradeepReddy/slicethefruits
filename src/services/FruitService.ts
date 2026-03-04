import { Fruits, fruitsList } from '../models/Fruits';

export class FruitService {
    getAllFruits(): Fruits[] {
        return fruitsList;
    }
} 
