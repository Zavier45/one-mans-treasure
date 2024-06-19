import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSaleById, updateSale } from "../../managers/saleManager";
import { getItemTypes } from "../../managers/itemTypeManager";
import { Input, Label, Button, FormGroup } from "reactstrap";

export const EditSale = () => {
  const [saleAddress, setSaleAddress] = React.useState("");
  const [saleStartDate, setSaleStartDate] = React.useState();
  const [saleEndDate, setSaleEndDate] = React.useState();
  const [saleItemTypes, setSaleItemTypes] = React.useState([]);
  const [itemTypes, setItemTypes] = React.useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const importExistingSale = async () => {
    const editSale = await getSaleById(id);
    const { startDate, endDate, address, saleTypes } = editSale;
    const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
    const formattedEndDate = new Date(endDate).toISOString().split("T")[0];

    setSaleStartDate(formattedStartDate);
    setSaleEndDate(formattedEndDate);
    setSaleAddress(address);
    setSaleItemTypes(saleTypes.map((it) => it.itemTypeId));
  };

  const updatedSale = () => {
    const saleObj = {
      address: saleAddress,
      startDate: saleStartDate,
      endDate: saleEndDate,
      saleTypes: saleItemTypes,
    };
    updateSale(id, saleObj);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updatedSale();
    navigate(`/sales/${id}`);
  };

  const handleCheckChange = (itemTypeId) => {
    const newSelectedItemTypes = [...saleItemTypes];
    const index = newSelectedItemTypes.indexOf(itemTypeId);
    if (index == -1) {
      newSelectedItemTypes.push(itemTypeId);
    } else {
      newSelectedItemTypes.splice(index, 1);
    }
    setSaleItemTypes(newSelectedItemTypes);
  };
  React.useEffect(() => {
    if (id) {
      importExistingSale();
      getItemTypes().then((itemTypes) => {
        setItemTypes(itemTypes);
      });
    }
  }, [id]);

  return (
    <>
      <h1>Edit Sale</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rescheduled Start Date</label>
          <Input
            type="date"
            name="startDate"
            value={saleStartDate}
            onChange={(evt) => setSaleStartDate(evt.target.value)}
          />
        </div>
        <div>
          <label>Rescheduled End Date</label>
          <Input
            type="date"
            name="endDate"
            value={saleEndDate}
            onChange={(event) => setSaleEndDate(event.target.value)}
          />
        </div>
        <div>
          <label>Address</label>
          <Input
            type="text"
            name="address"
            value={saleAddress}
            onChange={(evt) => setSaleAddress(evt.target.value)}
          />
        </div>
        <div className="d-flex flex-column">
          <label>Types of Items Being Sold:</label>
          {itemTypes.map((it) => (
            <FormGroup key={`it-${it.id}`}>
              <Input
                type="checkbox"
                value={it.id}
                checked={saleItemTypes.includes(it.id)}
                onChange={() => {
                  handleCheckChange(it.id);
                }}
              />
              <Label>{it.name}</Label>
            </FormGroup>
          ))}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};
