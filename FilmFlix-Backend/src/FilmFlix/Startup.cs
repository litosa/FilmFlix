using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using FilmFlix.Context;
using FilmFlix.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using FilmFlix.Interfaces;
using FilmFlix.Repositories;
using Newtonsoft.Json;
using AutoMapper;
using FilmFlix.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace FilmFlix
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            _config = builder.Build();
        }

        private IConfigurationRoot _config;

        // This method gets called by the runtime. Use this method to add services to the container
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton(_config);
            services.AddDbContext<VideoContext>(ServiceLifetime.Scoped);
                //.AddIdentity<VideoUser, IdentityRole>();
            services.AddTransient<VideoDbInitializer>();
            services.AddScoped<IVideoRepository, VideoRepository>();

            services.AddIdentity<VideoUser, IdentityRole>()
                    .AddEntityFrameworkStores<VideoContext>();


            //Setup for postman so developer can see valid errormessage and not only 404
            //to every request. If valid request but not authorize, this config will give
            //better responsemessages
            services.Configure<IdentityOptions>(config =>
            {
                config.Cookies.ApplicationCookie.Events =
                    new CookieAuthenticationEvents()
                    {
                        OnRedirectToLogin = (ctx) =>
                        {
                            if (ctx.Request.Path.StartsWithSegments("/api") && ctx.Response.StatusCode == 200)
                            {
                                ctx.Response.StatusCode = 401;
                            }
                            return Task.CompletedTask;
                        },
                        OnRedirectToAccessDenied = (ctx) =>
                        {
                            if (ctx.Request.Path.StartsWithSegments("/api") && ctx.Response.StatusCode == 200)
                            {
                                ctx.Response.StatusCode = 403;
                            }
                            return Task.CompletedTask;
                        }
                    };
            });

            //Looking for * MappingProfile
            services.AddAutoMapper();
            services.AddCors();
            //services.AddCors(config =>
            //{
            //    config.AddPolicy("alex", bldr =>
            //    {
            //        bldr.AllowAnyHeader()
            //            .AllowAnyMethod()
            //            .WithOrigins("http://localhost:8080");
            //    });
            //    config.AddPolicy("AnyGET", bldr =>
            //    {
            //        bldr.AllowAnyHeader()
            //            .WithMethods("GET")
            //            .AllowAnyOrigin();
            //    });
            //});

            services.AddMvc()
                .AddJsonOptions(opt =>
                {
                    opt.SerializerSettings.ReferenceLoopHandling =
                    ReferenceLoopHandling.Ignore;
                });

            //services.AddMvc(opt =>
            //{
            //    opt.Filters.Add(new RequireHttpsAttribute());
            //})
            //    .AddJsonOptions(opt =>
            //    {
            //        opt.SerializerSettings.ReferenceLoopHandling =
            //        ReferenceLoopHandling.Ignore;
            //    });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
        public void Configure(IApplicationBuilder app, 
                              IHostingEnvironment env, 
                              ILoggerFactory loggerFactory, 
                              VideoDbInitializer seeder)
        {
            loggerFactory.AddConsole(_config.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseCors(config =>
            {
                config.AllowAnyHeader()
                      .AllowAnyMethod()
                      .AllowAnyOrigin();
            });

            app.UseIdentity();

            app.UseMvc(config =>
            {
                // Anger attribut ovanför metoderna istället
                //config.MapRoute("MainAPIRoute", "api/{controller}/{action}");
            });

            seeder.Seed().Wait();
        }
    }
}
