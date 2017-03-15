using FilmFlix.Interfaces;
using System;
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

        //public IEnumerable<SerieEpisodes> GetSerieSections()
        //{
        //    return _context.SerieEpisodes.ToList();
        //}

        //public IEnumerable<SerieEpisodes> GetSectionsBySerie(string titles)
        //{
        //    return _context.SerieEpisodes
        //                   .Include(s => s.Serie)
        //                   .Where(s => s.Serie.EpisodeTitle.Equals(titles, StringComparison.CurrentCultureIgnoreCase))
        //                   .OrderBy(s => s.EpisodeTitle)
        //                   .ToList();
        //}


        public async Task<bool> SaveAllAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}
