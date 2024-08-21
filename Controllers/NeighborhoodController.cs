using Microsoft.AspNetCore.Mvc;
using OneMansTreasure.Models;
using OneMansTreasure.Data;
using OneMansTreasure.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace OneMansTreasure.Controllers;

[ApiController]
[Route("api/[controller]")]

public class NeighborhoodController : ControllerBase
{
    private OneMansTreasureDbContext _dbContext;

    public NeighborhoodController(OneMansTreasureDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]

    public IActionResult Get()
    {
        List<Neighborhood> neighborhoods = _dbContext.Neighborhoods.ToList();

        List<NeighborhoodDTO> neighborhoodDTOs = neighborhoods.Select(n => new NeighborhoodDTO
        {
            Id = n.Id,
            Name = n.Name
        }).ToList();

        return Ok(neighborhoodDTOs);
    }
}