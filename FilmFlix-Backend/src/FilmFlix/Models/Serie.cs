using FilmFlix.Enums;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

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


        //[ForeignKey("VideoCollectionId")]
        //public VideoCollection VideoCollection { get; set; }
        //public int VideoCollectionId { get; set; }

        public ICollection<SerieEpisode> SerieEpisodes { get; set; }
    }
}
