using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
namespace Persistence
{
    public class Datacontext : IdentityDbContext<AppUser>
    {
        public Datacontext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // bir kaç değer girmek için builder oluşturuyoruz
            builder.Entity<Value>().HasData(
                new Value { Id = 1, Name = "Value 101" },
                    new Value { Id = 2, Name = "Value 102" },
                        new Value { Id = 3, Name = "Value 103" }

            );


        }
    }
}
