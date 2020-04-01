using System.Linq;
using System.Collections.Generic;
using System;
using Domain;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(Datacontext datacontext, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var Users = new List<AppUser>
               {
                  new AppUser{
                     DisplayName = "Cihan",
                     UserName = "cihan",
                     Email = "cihan@activities.com"
                  },

                  new AppUser{
                     DisplayName = "Atakan",
                     UserName = "atakan",
                     Email = "atakan@activities.com"
                  },

                  new AppUser{
                     DisplayName = "Yiğit",
                     UserName = "yigit",
                     Email = "yigit@activities.com"
                  },
               };
                foreach (var user in Users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (!datacontext.Activities.Any())
            {
                var activities = new List<Activity>
                 {
                     new Activity
                     {
                         Title = "Past Activity",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = " Activity 2 months Ago",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Pub",
                     },
                      new Activity
                     {
                         Title = "Past Activity 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = " Activity 1 months Ago",
                        Category = "Fun",
                        City = "Berlin",
                        Venue = "Theathr",
                     },
                        new Activity
                     {
                         Title = "Past Activity 3",
                        Date = DateTime.Now.AddMonths(-3),
                        Description = " Activity 3 months Ago",
                        Category = "Cultur",
                        City = "Istanbul",
                        Venue = "Cinema",
                     },
                        new Activity
                     {
                         Title = "Past Activity 1",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = " Activity 1 months Ago",
                        Category = "Fun",
                        City = "New York",
                        Venue = "Theathr",
                     },
                        new Activity
                     {
                         Title = "Past Activity 2",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = " Activity 2 months Ago",
                        Category = "Education",
                        City = "Manchester",
                        Venue = "College",
                     },
                        new Activity
                     {
                         Title = "Past Activity 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = " Activity 1 months Ago",
                        Category = "Fun",
                        City = "Berlin",
                        Venue = "Theathr",
                     },

                        new Activity
                     {
                         Title = "future Activity 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = " Activity 2 months future",
                        Category = "Fun",
                        City = "London",
                        Venue = "Thames",
                     },
                        new Activity
                     {
                         Title = "future Activity 8",
                        Date = DateTime.Now.AddMonths(8),
                        Description = " Activity 8 months future",
                        Category = "Fun",
                        City = "Berlin",
                        Venue = "Cinema",
                     },
                 };
                datacontext.Activities.AddRange(activities);
                datacontext.SaveChanges();
            }
        }

    }
}