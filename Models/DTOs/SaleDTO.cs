namespace OneMansTreasure.Models.DTOs;

public class SaleDTO
{
    public int Id { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Address { get; set; }
    public int SaleHostId { get; set; }
    public UserProfileDTO SaleHost { get; set; }
    public List<SaleTypeDTO> SaleTypes { get; set; }
    public string FormattedStartDate => StartDate.ToString("MMMM dd, yyyy");
    public string FormattedEndDate => EndDate.ToString("MMMM dd, yyyy");

}