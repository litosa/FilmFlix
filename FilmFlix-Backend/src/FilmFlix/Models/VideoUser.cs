using Microsoft.AspNetCore.Identity.EntityFrameworkCore;


namespace FilmFlix.Models
{
    public class VideoUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
