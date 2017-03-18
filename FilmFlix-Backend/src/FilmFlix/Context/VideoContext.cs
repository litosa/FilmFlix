using FilmFlix.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace FilmFlix.Context
{
    public class VideoContext : IdentityDbContext
    {
        private IConfigurationRoot _config;

        public VideoContext(DbContextOptions options, IConfigurationRoot config)
        {
            _config = config;
        }

        public DbSet<VideoCollection> VideoCollections { get; set; }
        public DbSet<Film> Films { get; set; }
        public DbSet<Serie> Series { get; set; }
        public DbSet<SerieEpisode> SerieEpisodes { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            optionsBuilder.UseSqlServer(_config["ConnectionString:DefaultConnection"]);
        }
    }


}
