using FilmFlix.Enums;
using System.Collections.Generic;


namespace FilmFlix.ViewModels
{
    public class SerieViewModel
    {
        public string SerieTitle { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public Category Category { get; set; }
        public int Voters { get; set; }

        public ICollection<SerieEpisodesViewModel> SerieEpisodes { get; set; }
        
    }
}
