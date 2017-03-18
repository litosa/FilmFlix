using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


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
