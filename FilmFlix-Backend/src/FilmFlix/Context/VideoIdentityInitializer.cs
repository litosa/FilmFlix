using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using FilmFlix.Models;

namespace FilmFlix.Context
{
    public class VideoIdentityInitializer
    {
        private RoleManager<IdentityRole> _roleMgr;
        private UserManager<VideoUser> _userMgr;

        public VideoIdentityInitializer(UserManager<VideoUser> userMgr, RoleManager<IdentityRole> roleMgr)
        {
            _userMgr = userMgr;
            _roleMgr = roleMgr;
        }

        public async Task Seed()
        {
            var user = await _userMgr.FindByNameAsync("alex");

            if (user == null)
            {
                if (!(await _roleMgr.RoleExistsAsync("Admin")))
                {
                    var role = new IdentityRole("Admin");
                    role.Claims.Add(new IdentityRoleClaim<string> { ClaimType = "IsAdmin", ClaimValue = "True" });
                    await _roleMgr.CreateAsync(role);
                }

                user = new VideoUser()
                {
                    UserName = "alex",
                    FirstName = "Alexander",
                    LastName = "Litos"
                };

                var userResult = await _userMgr.CreateAsync(user, "P@ssw0rd!");
                var roleResult = await _userMgr.AddToRoleAsync(user, "Admin");
                var claimResult = await _userMgr.AddClaimAsync(user, new System.Security.Claims.Claim("SuperUser", "True"));
                
                if (!userResult.Succeeded || !roleResult.Succeeded || !claimResult.Succeeded)
                {
                    throw new InvalidOperationException("Failed to build user and roles");
                }
            }
        }
    }
}
