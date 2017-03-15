using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FilmFlix.Models
{
    public class SerieEpisode
    {
        [Key]
        public int EpisodeId { get; set; }
        public string EpisodeTitle { get; set; }
        public string ResourceUrl { get; set; }
        public DateTime Published { get; set; }
        public int Length { get; set; }


        [ForeignKey("SerieId")]
        public Serie Serie { get; set; }
        public int SerieId { get; set; }

    }
}
