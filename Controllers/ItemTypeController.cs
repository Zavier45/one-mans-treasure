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

public class ItemTypeController : ControllerBase
{
    private OneMansTreasureDbContext _dbContext;

    public ItemTypeController(OneMansTreasureDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]

    public IActionResult Get()
    {
        return Ok(_dbContext.ItemTypes.Select(t => new ItemTypeDTO
        {
            Id = t.Id,
            Name = t.Name
        }));
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        ItemType itemType = _dbContext.ItemTypes.FirstOrDefault(it => it.Id == id);
        if (itemType == null)
        {
            return NotFound();
        }
        ItemTypeDTO itemTypeDTO = new ItemTypeDTO
        {
            Id = itemType.Id,
            Name = itemType.Name
        };
        return Ok(itemTypeDTO);
    }
}