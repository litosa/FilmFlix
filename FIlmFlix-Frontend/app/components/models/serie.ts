import { SerieEpisode } from './serieEpisode';
import { Category } from '../enums/category';


export class Serie {
 
    constructor(public serieTitle:string, 
                public description: string, 
                public imageUrl:string, 
                public category: Category, 
                public voters:number,
                public serieEpisodes:SerieEpisode[]) {}    
}