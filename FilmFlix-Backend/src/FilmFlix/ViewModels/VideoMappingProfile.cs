using AutoMapper;
using FilmFlix.Models;

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
