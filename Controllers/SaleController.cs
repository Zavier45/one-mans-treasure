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

        }))
    }
}
