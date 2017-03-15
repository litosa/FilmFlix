using AutoMapper;
using FilmFlix.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FilmFlix.ViewModels
{
    public class VideoMappingProfile : Profile
    {
        public VideoMappingProfile()
        {
            CreateMap<Film, FilmViewModel>().ReverseMap();

            CreateMap<Serie, SerieViewModel>().ReverseMap();

            CreateMap<SerieEpisode, SerieEpisodesViewModel>().ReverseMap();

        }
    }
}
