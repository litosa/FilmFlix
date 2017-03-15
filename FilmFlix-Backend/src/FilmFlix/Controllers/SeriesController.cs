using AutoMapper;
using FilmFlix.Filters;
using FilmFlix.Interfaces;
using FilmFlix.Models;
using FilmFlix.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FilmFlix.Controllers
{
    //[EnableCors("AnyGET")]
    //[Authorize]
    [ValidateModel]
    [Route("api/[controller]")]
    public class SeriesController : Controller
    {
        private ILogger<SeriesController> _logger;
        private IVideoRepository _repo;
        private IMapper _mapper;

        public SeriesController(IVideoRepository repo,
                              ILogger<SeriesController> logger,
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
                var series = _repo.GetAllSeries();

                return Ok(_mapper.Map<IEnumerable<SerieViewModel>>(series));
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
                Serie serie = null;
                serie = _repo.GetSerie(id);

                if (serie == null) return NotFound($"Serie {id} was not found");

                return Ok(_mapper.Map<SerieViewModel>(serie));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]SerieViewModel model)
        {
            try
            {
                _logger.LogInformation("Creating a new Serie");

                Serie serie = _mapper.Map<Serie>(model);

                _repo.Add(serie);

                if (await _repo.SaveAllAsync())
                {
                    return Created($"api/series", _mapper.Map<SerieViewModel>(serie));
                }
                else
                {
                    _logger.LogWarning("Could not save Serie to the databse");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Threw exception while saving Serie: {ex.Message}");
            }

            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] SerieViewModel model)
        {
            try
            {
                Serie oldSerie = _repo.GetSerie(id);
                if (oldSerie == null) return NotFound($"Could not find a serie with an EpisodeId of {id}");

                //Replaces the code below, Illustrate advantage of using mapping
                _mapper.Map(model, oldSerie);

                if (await _repo.SaveAllAsync())
                {
                    return Ok(_mapper.Map<SerieViewModel>(oldSerie));
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Threw exception while edit Serie: {ex.Message}");
            }

            return BadRequest("Couldn´t update Serie");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                Serie oldSerie = _repo.GetSerie(id);
                if (oldSerie == null) return NotFound($"Could not find Serie with EpisodeId of {id}");

                _repo.Delete(oldSerie);
                if (await _repo.SaveAllAsync())
                {
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Threw exception while deleting Serie: {ex.Message}");
            }

            return BadRequest("Couldn´t delete Serie");
        }
    }
}
