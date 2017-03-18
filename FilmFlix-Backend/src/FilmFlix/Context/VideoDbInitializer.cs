using FilmFlix.Enums;
using FilmFlix.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace FilmFlix.Context
{
    public class VideoDbInitializer
    {
        private VideoContext _ctx;

        public VideoDbInitializer(VideoContext ctx)
        {
            _ctx = ctx;
        }

        public async Task Seed()
        {
            if (!_ctx.VideoCollections.Any())
            {
                _ctx.AddRange(videos);
                await _ctx.SaveChangesAsync();
            }
        }

        List<VideoCollection> videos = new List<VideoCollection>
        {
            new VideoCollection()
            {
                Films = new Collection<Film>()
                {
                    new Film()
                    {
                        FilmTitle = "Star Wars Episod III - Mörkrets Hämnd",
                        Description = "Detta är filmen som länkar samman Stjärnornas krig och Star Wars: " +
                                      "Episod II - Klonerna anfaller och svarar på frågor som hur " +
                                      "Luke Skywalker hamnade hos sina fosterföräldrar, varför Yoda flydde och " +
                                      "kanske den största frågan av dem alla - hur Anakin Skywalker blir Darth Vader.",
                        Category = Category.ScienceFiction,
                        ImageUrl = "http://dreamfilmhd.sh/images/imdb/0121766.jpg",
                        Voters = 21,
                        Length = 140,
                        Published = DateTime.Now,
                        ResourceUrl = "http://185.152.64.96/2gru7v567bntzhru5347d5t2fbve5pj3elvt4ma6kqa5mf5jda3z3spkj2kq/v.mp4"
                    },
                    new Film()
                    {
                        FilmTitle = "War Dogs",
                        Description = "Under det första Irak-kriget upptäcker två vänner i tjugoårsåldern, " +
                                      "som bor i Miami, regeringens initiativ som tillåter småskaliga företag " +
                                      "att buda på militära kontrakt. Baserad på en sann historia",
                        Category = Category.Action,
                        ImageUrl = "http://dreamfilmhd.sh/images/imdb/tt2005151.jpg",
                        Voters = 5,
                        Length = 114,
                        Published = DateTime.Now,
                        ResourceUrl = "http://185.152.65.173/2gruuzi77bntzhru532pdjr3ojihkd3n2g46sbfbhznk7s2wxnovfb5ywama/v.mp4"
                    },
                    new Film()
                    {
                        FilmTitle = "Batman v Superman: Dawn of Justice",
                        Description = "interna konflikten mellan två av jordens största superhjältar trappas upp.",
                        Category = Category.ScienceFiction,
                        ImageUrl = "http://dreamvtt.com/imagehost/data/uploads/users/d9df2267-60c6-43fe-91f3-1d8f1b7ef601/1180512488.jpg",
                        Voters = 5,
                        Length = 151,
                        Published = DateTime.Now,
                        ResourceUrl = "http://185.152.65.162/2gru3atm7bntzhru5337dzrcplk5kysy5hyccdcy3mzi6dyhjbxaqyq5udxa/v.mp4"
                    },
                    new Film()
                    {
                        FilmTitle = "Titanic",
                        Description = "De kommer från skilda världar men deras hemliga passion är gränslös. " +
                                      "Nu färdas de mot drömmarnas land i världens modernaste skepp. " +
                                      "Hela livet ligger framför dem... vad skulle någonsin kunna skilja dem åt?",
                        Category = Category.Drama,
                        ImageUrl = "http://dreamfilmhd.sh/images/imdb/tt0120338.jpg",
                        Voters = 11,
                        Length = 194,
                        Published = DateTime.Now,
                        ResourceUrl = "http://185.152.65.162/2grupxwg7bntzhru5377d3j5n5jhu7juonoi7w2dqfp4wvtalqwcewwoayga/v.mp4"
                    },
                    new Film()
                    {
                        FilmTitle = "Moana",
                        Description = "I det forntida Oceanien i Söderhavet ger sig den skickliga seglaren " +
                                      "Vaiana ut för att leta efter en sägenomspunnen ö",
                        Category = Category.Cartoon,
                        ImageUrl = "http://dreamfilmhd.sh/images/imdb/tt3521164.jpg",
                        Voters = 2,
                        Length = 107,
                        Published = DateTime.Now,
                        ResourceUrl = "http://185.142.238.176/2gruwowl7fntzhru53zpdzt5nme425nyghlknle2qyxm2rsonefvepgg2beq/v.mp4"
                    },
                },
                Series = new Collection<Serie>()
                {
                    new Serie()
                    {
                        SerieTitle = "Narcos",
                        Category = Category.Drama,
                        ImageUrl = "http://dreamvtt.com/imagehost/data/uploads/users/d6f6fbc6-d319-4a61-b845-8dff671462d7/24174987.jpg",
                        Voters = 2,
                        Description = "A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar.",

                        SerieEpisodes = new Collection<SerieEpisode>()
                        {
                            new SerieEpisode()
                            {
                                EpisodeTitle = "Avsnitt1",
                                Length = 45,
                                Published = DateTime.Now,
                                ResourceUrl = "http://185.152.64.168/2grurw6f7bntzhru5377d6jzp24hdrierkaafwooatlbnfgmkpsse4bcvera/v.mp4"                                
                            },
                            new SerieEpisode()
                            {
                                EpisodeTitle = "Avsnitt2",
                                Length = 45,
                                Published = DateTime.Now,
                                ResourceUrl = "http://185.152.64.168/2grurwgf7bntzhru5377d6lzphbtcbimfzmg4664uizcc6sj6xz75mr6aa5a/v.mp4"
                            },
                            new SerieEpisode()
                            {
                                EpisodeTitle = "Avsnitt3",
                                Length = 45,
                                Published = DateTime.Now,
                                ResourceUrl = "http://185.152.64.168/2grurxof7bntzhru5377dyrjnn5nnvrmi46pptjnzyw4j4z3b6ncsiyy34jq/v.mp4"
                            }
                        }
                    }
                }
            }
        };
    }
}

