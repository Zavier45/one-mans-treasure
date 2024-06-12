using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using OneMansTreasure.Models;
using OneMansTreasure.Data;
using OneMansTreasure.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel;

namespace OneMansTreasure.Controllers;

[ApiController]
[Route("api/[controller]")]

public class SaleController : ControllerBase
{
    private OneMansTreasureDbContext _dbContext;

    public SaleController(OneMansTreasureDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]

    public IActionResult Get()
    {
        return Ok(_dbContext.Sales.Select(s => new SaleDTO
        {
            Id = s.Id,
            StartDate = s.StartDate,
            EndDate = s.EndDate,
            Address = s.Address,
            SaleHostId = s.SaleHostId,
            SaleHost = new UserProfileDTO
            {
                Id = s.SaleHost.Id,
                FirstName = s.SaleHost.FirstName,
                LastName = s.SaleHost.LastName,
                Email = s.SaleHost.Email,
                IdentityUserId = s.SaleHost.IdentityUserId,
                IdentityUser = new IdentityUser
                {
                    Id = s.SaleHost.IdentityUser.Id,
                    UserName = s.SaleHost.IdentityUser.UserName
                }
            }
        }));
    }
}
