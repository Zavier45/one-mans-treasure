using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using OneMansTreasure.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace OneMansTreasure.Data;

public class OneMansTreasureDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<ItemType> Types { get; set; }
    public DbSet<Sale> Sales { get; set; }
    public DbSet<SaleType> SaleTypes { get; set; }

    public OneMansTreasureDbContext(DbContextOptions<OneMansTreasureDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {

            Id = "da2973b3-6a0e-4808-9c23-177d9ca4cddb",
            UserName = "BossGoblin",
            Email = "zavthegoblin@code.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])


        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "8fcdebee-7905-49a9-a3fa-66266de7f19e",
            UserId = "26407cc2-fc74-4453-918d-4ebf00e87565"
        });

        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {

            Id = 1,
            IdentityUserId = "da2973b3-6a0e-4808-9c23-177d9ca4cddb",
            FirstName = "Zavier",
            LastName = "Hopson"

        });

        modelBuilder.Entity<ItemType>().HasData(new ItemType[]
        {
            new ItemType {Id = 1, Name = "Electronics"},
            new ItemType {Id = 2, Name = "Clothing"},
            new ItemType {Id = 3, Name = "Tools"},
            new ItemType {Id = 4, Name = "Furniture"},
            new ItemType {Id = 5, Name = "Books"},
            new ItemType {Id = 6, Name = "Miscellaneous"}
        });

        modelBuilder.Entity<Sale>().HasData(new Sale[]
        {
            new Sale {Id = 1, StartDate = new DateTime(2024, 9, 28, 8, 0, 0), EndDate = new DateTime(2024, 9, 29, 17, 3, 0), Address = "365 Wishing Star Way", UserId = 1}
        });

        modelBuilder.Entity<SaleType>().HasData(new SaleType[]
        {
            new SaleType {SaleId = 1, ItemTypeId = 2},
            new SaleType {SaleId = 1, ItemTypeId = 5},
            new SaleType {SaleId = 1, ItemTypeId = 6}
        });
    }

}