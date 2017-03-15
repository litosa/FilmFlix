using AutoMapper;
using FilmFlix.Filters;
using FilmFlix.Interfaces;
using FilmFlix.Models;
using FilmFlix.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FilmFlix.Controllers
{
    // events = filmer och serier
    // session = filmer
    // session? = serier
    //Anger default route
    [ValidateModel]
    [Route("api/[controller]")]
    public class FilmsController : Controller
    {
        private ILogger<FilmsController> _logger;
        private IVideoRepository _repo;
        private IMapper _mapper;

        public FilmsController(IVideoRepository repo, 
                              ILogger<FilmsController> logger, 
                              IMapper mapper)
        {
            _logger = logger;
            _repo = repo;
            _mapper = mapper;
        }

        //Anges inget, sker default route
        [HttpGet("")]
        public IActionResult Get()
        {
            try
            {
                var films = _repo.GetAllFilms();

                return Ok(_mapper.Map<IEnumerable<FilmViewModel>>(films));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
           
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                Film film = null;
                film = _repo.GetFilm(id);

                if (film == null) return NotFound($"Film {id} was not found");

                return Ok(_mapper.Map<FilmViewModel>(film));
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]FilmViewModel model)
        {
            try
            {
                _logger.LogInformation("Creating a new Film");

                Film film = _mapper.Map<Film>(model);

                _repo.Add(film);

                if (await _repo.SaveAllAsync())
                {
                    return Created($"api/films", _mapper.Map<FilmViewModel>(film));
                }
                else
                {
                    _logger.LogWarning("Could not save Film to the databse");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Threw exception while saving Film: {ex.Message}");
            }

            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] FilmViewModel model)
        {
            try
            {
                Film oldFilm = _repo.GetFilm(id);
                if (oldFilm == null) return NotFound($"Could not find a film with an EpisodeId of {id}");

                //Replaces the code below, Illustrate advantage of using mapping
                _mapper.Map(model, oldFilm);

                //oldFilm.EpisodeTitle = model.EpisodeTitle ?? oldFilm.EpisodeTitle;
                //oldFilm.Description = model.Description ?? oldFilm.Description;
                //oldFilm.ImageUrl = model.ImageUrl ?? oldFilm.ImageUrl;
                //oldFilm.Category = oldFilm.Category != model.Category ? model.Category : oldFilm.Category;
                //oldFilm.Voters = model.Voters > 0 ? model.Voters : oldFilm.Voters;
                //oldFilm.ResourceUrl = model.ResourceUrl ?? oldFilm.ResourceUrl;
                //oldFilm.Published = model.Published != DateTime.MinValue ? model.Published : oldFilm.Published;
                //oldFilm.Length = model.Length > 0 ? model.Length : oldFilm.Length;

                if(await _repo.SaveAllAsync())
                {
                    return Ok(_mapper.Map<FilmViewModel>(oldFilm));
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Threw exception while edit Film: {ex.Message}");
            }

            return BadRequest("Couldn´t update Film");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                Film oldFilm = _repo.GetFilm(id);
                if (oldFilm == null) return NotFound($"Could not find Film with EpisodeId of {id}");

                _repo.Delete(oldFilm);
                if (await _repo.SaveAllAsync())
                {
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Threw exception while deleting Film: {ex.Message}");
            }

            return BadRequest("Couldn´t delete Film");
        }
    }
}
