using FilmFlix.Enums;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace FilmFlix.Models
{
    public class Serie
    {
        [Key]
        public int SerieId { get; set; }
        public string SerieTitle { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public Category Category { get; set; }
        public int Voters { get; set; }

        

        public ICollection<SerieEpisode> SerieEpisodes { get; set; }
    }
}
