using FilmFlix.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FilmFlix.Models;
using FilmFlix.Context;
using Microsoft.EntityFrameworkCore;

namespace FilmFlix.Repositories
{
    public class VideoRepository : IVideoRepository
    {
        private VideoContext _context;

        public VideoRepository(VideoContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public IEnumerable<Film> GetAllFilms()
        {
            return _context.Films
                           .OrderBy(f => f.FilmTitle)
                           .ToList();
        }

        public Film GetFilm(int id)
        {
            return _context.Films
                           .Where(f => f.FilmId == id)
                           .FirstOrDefault();
        }

        public Film GetFilmIdByName(string title)
        {
            return _context.Films.Where(f => f.FilmTitle == title).FirstOrDefault();
        }

        public IEnumerable<Serie> GetAllSeries()
        {
            return _context.Series
                           .Include(s => s.SerieEpisodes)
                           .OrderBy(s => s.SerieTitle)
                           .ToList();
        }        

        public Serie GetSerie(int id)
        {
            return _context.Series
                           .Include(s => s.SerieEpisodes)
                           .Where(s => s.SerieId == id)
                           .FirstOrDefault();
        }

        public Serie GetSerieIdByName(string title)
        {
            return _context.Series.Where(f => f.SerieTitle == title).FirstOrDefault();
        }


        public async Task<bool> SaveAllAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}
