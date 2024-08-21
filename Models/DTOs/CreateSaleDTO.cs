namespace OneMansTreasure.Models.DTOs;

public class CreateSaleDTO
{
    public string Title { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int NeighborhoodId { get; set; }
    public string StreetAddress { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string ZipCode { get; set; }
    public string FeaturedItem { get; set; }
    public string FeaturedItemDesc { get; set; }
    public int SaleHostId { get; set; }
    public int[] SaleTypes { get; set; }

}