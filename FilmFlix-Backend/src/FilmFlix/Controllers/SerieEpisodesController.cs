using AutoMapper;
using FilmFlix.Filters;
using FilmFlix.Interfaces;
using FilmFlix.Models;
using FilmFlix.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace FilmFlix.Controllers
{
    [ValidateModel]
    [Route("api/series/{id}/serieEpisodes")]
    public class SerieEpisodesController : Controller
    {
        private ILogger<SerieEpisodesController> _logger;
        private IVideoRepository _repo;
        private IMapper _mapper;

        public SerieEpisodesController(IVideoRepository repo,
                              ILogger<SerieEpisodesController> logger,
                              IMapper mapper)
        {
            _logger = logger;
            _repo = repo;
            _mapper = mapper;
        }

        //Gets all serieEpisode in serie
        [HttpGet("")]
        public IActionResult Get(int id)
        {
            try
            {
                var serieById = _repo.GetSerie(id);
                
                if (serieById == null) return NotFound($"serieById {id} was not found");

                var serieEpisodes = serieById.SerieEpisodes.ToList();

                if (serieEpisodes == null) return NotFound($"serieEpisode {id} was not found");

                return Ok(_mapper.Map<IEnumerable<SerieEpisodesViewModel>>(serieEpisodes));                
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest();
        }

        //Gets one serieEpisode in serie
        [HttpGet("{title}")]
        public IActionResult Get(int id, string title)
        {
            try
            {
                var serieById = _repo.GetSerie(id);

                if (serieById == null) return NotFound($"serieById {id} was not found");

                var serieEpisode = serieById.SerieEpisodes.Where(ss => ss.EpisodeTitle.ToLower() == title.ToLower())
                                                          .OrderBy(s => s.EpisodeTitle)
                                                          .FirstOrDefault();

                if (serieEpisode == null) return NotFound($"{title} was not found");

                return Ok(_mapper.Map<SerieEpisodesViewModel>(serieEpisode));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest();
        }

        [HttpPost]
        public async Task<IActionResult> Post(int id, [FromBody] SerieEpisodesViewModel model)
        {
            try
            {
                var serieById = _repo.GetSerie(id);
                if (serieById == null) return NotFound($"serieById {id} was not found");                      

                var serieEpisode = serieById.SerieEpisodes.Where(ss => ss.EpisodeTitle.ToLower() == model.EpisodeTitle.ToLower())
                                                          .FirstOrDefault();    
                if (serieEpisode != null) return BadRequest($"{serieEpisode.EpisodeTitle} already in database");

                var newSection = _mapper.Map<SerieEpisode>(model);
                newSection.Serie = serieById;
                _repo.Add(newSection);

                if (await _repo.SaveAllAsync())
                {
                    return Created($"api/series", _mapper.Map<IEnumerable<SerieEpisodesViewModel>>(serieEpisode));
                }                
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception thrown while adding section: {ex}");
            }

            return BadRequest("Could not add new section");
        }

        [HttpPut("{title}")]
        public async Task<IActionResult> Put(int id, string title, [FromBody] SerieEpisodesViewModel model)
        {
            try
            {
                var serieById = _repo.GetSerie(id);
                if (serieById == null) return NotFound($"serieById {id} was not found");

                var serieEpisode = serieById.SerieEpisodes.Where(se => se.EpisodeTitle.ToLower() == title.ToLower())
                                                         .FirstOrDefault();
                if (serieEpisode == null) return NotFound($"{serieEpisode.EpisodeTitle} was not found");

                _mapper.Map(model, serieEpisode);

                if (await _repo.SaveAllAsync())
                {
                    return Ok(_mapper.Map<SerieEpisodesViewModel>(serieEpisode));
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception thrown while edit section: {ex}");
                return BadRequest(ex.Message);

            }
            return BadRequest("Could not edit new section");
        }

        [HttpDelete("{title}")]
        public async Task<IActionResult> Delete(int id, string title)
        {
            try
            {
                var serieById = _repo.GetSerie(id);
                if (serieById == null) return NotFound($"serieById {id} was not found");

                var serieEpisode = serieById.SerieEpisodes.Where(ss => ss.EpisodeTitle.ToLower() == title.ToLower())
                                                         .FirstOrDefault();
                if (serieEpisode == null) return NotFound($"{serieEpisode.EpisodeTitle} was not found");

                _repo.Delete(serieEpisode);

                if (await _repo.SaveAllAsync())
                {
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception thrown while delete section: {ex}");
            }
            return BadRequest("Could not delete section");

        }
    }
}
