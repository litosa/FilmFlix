using FilmFlix.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FilmFlix.Interfaces
{
    public interface IVideoRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAllAsync();

        //Film
        IEnumerable<Film> GetAllFilms();
        Film GetFilm(int id);
        Film GetFilmIdByName(string title);

        //Serie
        IEnumerable<Serie> GetAllSeries();
        Serie GetSerie(int id);
        Serie GetSerieIdByName(string title);
        
    } 
}
