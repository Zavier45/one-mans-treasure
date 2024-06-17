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
        List<Sale> sales = _dbContext.Sales
        .Include(s => s.SaleHost)
        .ThenInclude(up => up.IdentityUser)
        .Include(s => s.SaleTypes)
        .ThenInclude(st => st.ItemType)
        .ToList();

        List<SaleDTO> saleDTOs = sales.Select(s => new SaleDTO
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
                UserName = s.SaleHost.IdentityUser.UserName,
                Email = s.SaleHost.Email,
                IdentityUserId = s.SaleHost.IdentityUserId,
                IdentityUser = new IdentityUser
                {
                    Id = s.SaleHost.IdentityUser.Id,
                    UserName = s.SaleHost.IdentityUser.UserName
                }
            },
            SaleTypes = s.SaleTypes.Select(st => new SaleTypeDTO
            {
                Id = st.Id,
                ItemTypeId = st.ItemTypeId,
                ItemType = new ItemTypeDTO
                {
                    Id = st.ItemType.Id,
                    Name = st.ItemType.Name
                },
                SaleId = st.SaleId
            }).ToList()

        }).ToList();

        return Ok(saleDTOs);


    }

    [HttpGet("{id}")]

    public IActionResult GetById(int id)
    {
        var sale = _dbContext.Sales
        .Include(s => s.SaleHost)
         .ThenInclude(up => up.IdentityUser)
         .Include(s => s.SaleTypes)
         .ThenInclude(st => st.ItemType)
         .FirstOrDefault(s => s.Id == id);

        if (sale == null)
        {
            return NotFound();
        }
        SaleDTO saleDTO = new SaleDTO
        {
            Id = sale.Id,
            StartDate = sale.StartDate,
            EndDate = sale.EndDate,
            Address = sale.Address,
            SaleHostId = sale.SaleHostId,
            SaleHost = new UserProfileDTO
            {
                Id = sale.SaleHost.Id,
                FirstName = sale.SaleHost.FirstName,
                LastName = sale.SaleHost.LastName,
                UserName = sale.SaleHost.IdentityUser.UserName,
                Email = sale.SaleHost.Email,
                IdentityUserId = sale.SaleHost.IdentityUserId,
                IdentityUser = new IdentityUser
                {
                    Id = sale.SaleHost.IdentityUser.Id,
                    UserName = sale.SaleHost.IdentityUser.UserName
                }
            },
            SaleTypes = sale.SaleTypes.Select(st => new SaleTypeDTO
            {
                Id = st.Id,
                ItemTypeId = st.ItemTypeId,
                ItemType = new ItemTypeDTO
                {
                    Id = st.ItemType.Id,
                    Name = st.ItemType.Name
                },
                SaleId = st.SaleId
            }).ToList()
        };

        return Ok(saleDTO);
    }


}
