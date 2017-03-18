using FilmFlix.Context;
using FilmFlix.Filters;
using FilmFlix.Models;
using FilmFlix.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace FilmFlix.Controllers
{
    public class AuthController : Controller
    {
        private VideoContext _context;
        private ILogger<AuthController> _logger;
        private SignInManager<VideoUser> _signInMgr;

        public AuthController(VideoContext context, 
                              SignInManager<VideoUser> signInMgr,
                              ILogger<AuthController> logger)
        {
            _context = context;
            _signInMgr = signInMgr;
            _logger = logger;
        }

        [HttpPost("api/auth/login")]
        [ValidateModel]
        public async Task<IActionResult> Login([FromBody] CredentialViewModel model)
        {
            try
            {
                //Third parameter tells if user cookie should persist after browser is closed
                var result = await _signInMgr.PasswordSignInAsync(model.UserName, model.Password, false, false);
                if (result.Succeeded)
                {
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception thrown while logging in: {ex}");
            }
            return BadRequest("Failed to login");
        }
    }
}
