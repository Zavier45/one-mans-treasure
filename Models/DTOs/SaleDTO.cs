namespace OneMansTreasure.Models.DTOs;

public class SaleDTO
{
    public int Id { get; set; }
    public string Title { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int NeighborhoodId { get; set; }
    public NeighborhoodDTO Neighborhood { get; set; }
    public string StreetAddress { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string ZipCode { get; set; }
    public string FeaturedItem { get; set; }
    public string FeaturedItemDesc { get; set; }
    public int SaleHostId { get; set; }
    public UserProfileDTO SaleHost { get; set; }
    public List<SaleTypeDTO> SaleTypes { get; set; }
    public string FormattedStartDate => StartDate.ToString("MMMM dd, yyyy");
    public string FormattedEndDate => EndDate.ToString("MMMM dd, yyyy");

}