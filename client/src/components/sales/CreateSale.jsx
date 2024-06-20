import React from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { newSale } from "../../managers/saleManager";
import { getItemTypes } from "../../managers/itemTypeManager";
import "./CreateSale.css";

export const NewSale = ({ loggedInUser }) => {
  const [saleObj, setSaleObj] = React.useState({
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    address: "",
    featuredItem: "",
    featuredItemDesc: "",
    saleHostId: loggedInUser.id,
    saleTypes: [],
  });
  const [itemTypes, setItemTypes] = React.useState([]);

  React.useEffect(() => {
    getItemTypes().then((types) => {
      setItemTypes(types);
    });
  }, []);

  const navigate = useNavigate();

  const handleCheckChange = (itemTypeId) => {
    const newSelectedItemTypes = [...saleObj.saleTypes];
    const index = newSelectedItemTypes.indexOf(itemTypeId);
    if (index == -1) {
      newSelectedItemTypes.push(itemTypeId);
    } else {
      newSelectedItemTypes.splice(index, 1);
    }

    setSaleObj({ ...saleObj, saleTypes: newSelectedItemTypes });
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setSaleObj({
      ...saleObj,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    newSale(saleObj).then(() => {
      navigate("/sales");
    });
  };

  return (
    <>
      <h1>Create a Sale</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <Label>Start Date</Label>
          <Input
            type="date"
            name="startDate"
            value={saleObj.startDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label>End Date</Label>
          <Input
            type="date"
            name="endDate"
            value={saleObj.endDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label>Address</Label>
          <Input
            type="text"
            name="address"
            value={saleObj.address}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label>Featured Item</Label>
          <Input
            type="text"
            name="featureditem"
            placeholder={saleObj.featuredItem}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label>Featured Item Description</Label>
          <Input
            type="text"
            name="featureditemdesc"
            placeholder={saleObj.featuredItemDesc}
            onChange={handleInputChange}
          />
        </div>
        <div className="d-flex flex-column">
          <label>Types of Items Being Sold:</label>
          {itemTypes.map((it) => (
            <FormGroup key={`it-${it.id}`}>
              <Input
                type="checkbox"
                value={it.id}
                checked={saleObj.saleTypes.includes(it.id)}
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
