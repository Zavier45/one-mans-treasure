using Microsoft.AspNetCore.Mvc;
using OneMansTreasure.Models;
using OneMansTreasure.Data;
using OneMansTreasure.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

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
            Title = s.Title,
            StartDate = s.StartDate,
            EndDate = s.EndDate,
            NeighborhoodId = s.NeighborhoodId,
            Neighborhood = new NeighborhoodDTO
            {
                Id = s.Neighborhood.Id,
                Name = s.Neighborhood.Name
            },
            StreetAddress = s.StreetAddress,
            City = s.City,
            State = s.State,
            ZipCode = s.ZipCode,
            FeaturedItem = s.FeaturedItem,
            FeaturedItemDesc = s.FeaturedItemDesc,
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
            Title = sale.Title,
            StartDate = sale.StartDate,
            EndDate = sale.EndDate,
            NeighborhoodId = sale.NeighborhoodId,
            Neighborhood = new NeighborhoodDTO
            {
                Id = sale.Neighborhood.Id,
                Name = sale.Neighborhood.Name
            },
            StreetAddress = sale.StreetAddress,
            City = sale.City,
            State = sale.State,
            ZipCode = sale.ZipCode,
            FeaturedItem = sale.FeaturedItem,
            FeaturedItemDesc = sale.FeaturedItemDesc,
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


    [HttpPut("{id}")]

    public IActionResult Put(int id, EditSaleDTO updatedSale)
    {
        Sale existingSale = _dbContext.Sales
        .FirstOrDefault(s => s.Id == id);
        if (existingSale == null)
        {
            return NotFound();
        }
        existingSale.Title = updatedSale.Title ?? existingSale.Title;
        existingSale.StartDate = updatedSale.StartDate;
        existingSale.EndDate = updatedSale.EndDate;
        existingSale.StreetAddress = updatedSale.StreetAddress ?? existingSale.StreetAddress;
        existingSale.City = updatedSale.City ?? existingSale.City;
        existingSale.State = updatedSale.State ?? existingSale.State;
        existingSale.ZipCode = updatedSale.ZipCode ?? existingSale.ZipCode;
        existingSale.FeaturedItem = updatedSale.FeaturedItem ?? existingSale.FeaturedItem;
        existingSale.FeaturedItemDesc = updatedSale.FeaturedItemDesc ?? existingSale.FeaturedItemDesc;

        List<SaleType> saleTypesToDelete = _dbContext.SaleTypes.Where(std => std.SaleId == id).ToList();
        foreach (SaleType saleType in saleTypesToDelete)
        {
            _dbContext.SaleTypes.Remove(saleType);
        }
        _dbContext.SaveChanges();

        foreach (int st in updatedSale.SaleTypes)
        {
            SaleType saleType = new SaleType
            {
                SaleId = id,
                ItemTypeId = st
            };
            _dbContext.SaleTypes.Add(saleType);
        }

        _dbContext.SaveChanges();

        return Ok(existingSale);

    }

    [HttpPost]

    public IActionResult Post(CreateSaleDTO newSale)
    {
        if (string.IsNullOrEmpty(newSale.StreetAddress))
        {
            return BadRequest("Address is required.");
        }

        if (newSale.EndDate < newSale.StartDate)
        {
            return BadRequest("End Date must be after Start Date");
        }
        Sale createdSale = new Sale
        {
            Title = newSale.Title,
            StartDate = newSale.StartDate,
            EndDate = newSale.EndDate,
            NeighborhoodId = newSale.NeighborhoodId,
            StreetAddress = newSale.StreetAddress,
            City = newSale.City,
            State = newSale.State,
            ZipCode = newSale.ZipCode,
            FeaturedItem = newSale.FeaturedItem,
            FeaturedItemDesc = newSale.FeaturedItemDesc,
            SaleHostId = newSale.SaleHostId
        };

        _dbContext.Sales.Add(createdSale);
        _dbContext.SaveChanges();

        foreach (int st in newSale.SaleTypes)
        {
            SaleType saleType = new SaleType
            {
                SaleId = createdSale.Id,
                ItemTypeId = st
            };
            _dbContext.SaleTypes.Add(saleType);
        }

        _dbContext.SaveChanges();

        return Ok();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        Sale existingSale = _dbContext.Sales.FirstOrDefault(es => es.Id == id);
        if (existingSale == null)
        {
            return NotFound();
        }

        _dbContext.Sales.Remove(existingSale);
        _dbContext.SaveChanges();

        return Ok();
    }

}
