using FilmFlix.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FilmFlix.Models
{
    public class Film
    {
        [Key]
        public int FilmId { get; set; }
        public string FilmTitle { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public Category Category { get; set; }
        public int Voters { get; set; }
        public string ResourceUrl { get; set; }
        public DateTime Published { get; set; } = DateTime.Now;
        public int Length { get; set; }


        //[ForeignKey("VideoCollectionId")]
        //public VideoCollection VideoCollection { get; set; }
        //public int VideoCollectionId { get; set; }
    }
}
