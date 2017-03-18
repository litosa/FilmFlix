using System.ComponentModel.DataAnnotations;


namespace FilmFlix.ViewModels
{
    public class CredentialViewModel
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
