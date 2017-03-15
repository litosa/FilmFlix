using FilmFlix.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FilmFlix.ViewModels
{
    public class FilmViewModel
    {
        public string FilmTitle { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public Category Category { get; set; }
        public int Voters { get; set; }
        public string ResourceUrl { get; set; }
        public DateTime Published { get; set; }
        public int Length { get; set; }
    }
}
