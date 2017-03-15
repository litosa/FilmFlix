using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FilmFlix.Models
{
    public class VideoCollection
    {
        [Key]
        public int VideoCollectionId { get; set; }
        public ICollection<Serie> Series { get; set; }
        public ICollection<Film> Films { get; set; }
    }   
    
}
