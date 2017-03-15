import { Category } from '../enums/category';
export class Film {
 
    constructor(public filmTitle:string,
                public description: string, 
                public imageUrl:string, 
                public category: Category, 
                public voters:number,
                public resourceUrl:string,
                public published:string,
                public length:number) {}    
}