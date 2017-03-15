using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FilmFlix.ViewModels
{
    public class SerieEpisodesViewModel
    {
        [Required]
        [MinLength(5)]
        public string EpisodeTitle { get; set; }
        public string ResourceUrl { get; set; }
        public DateTime Published { get; set; }
        public int Length { get; set; }
    }
}
