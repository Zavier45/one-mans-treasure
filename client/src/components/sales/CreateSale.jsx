import React from "react";
import {
  Button,
  Card,
  CardHeader,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
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
      <div className="create-parent">
        <Form onSubmit={handleSubmit}>
          <Card
            className="create-form"
            style={{
              height: "55rem",
              width: "55rem",
            }}
          >
            <CardHeader tag="h1">Create a Sale</CardHeader>
            <FormGroup>
              <Label tag="h4">Start Date</Label>
              <Input
                type="date"
                name="startDate"
                value={saleObj.startDate}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label tag="h4">End Date</Label>
              <Input
                type="date"
                name="endDate"
                value={saleObj.endDate}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label tag="h4">Address</Label>
              <Input
                type="text"
                name="address"
                placeholder={saleObj.address}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label tag="h4">Featured Item</Label>
              <Input
                type="text"
                name="featureditem"
                placeholder={saleObj.featuredItem}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label tag="h4">Featured Item Description</Label>
              <Input
                bsSize="lg"
                type="textarea"
                name="featureditemdesc"
                placeholder={saleObj.featuredItemDesc}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label tag="h4">Types of Items Being Sold:</Label>
              {itemTypes.map((it) => (
                <FormGroup
                  className="create-types"
                  check
                  inline
                  key={`it-${it.id}`}
                >
                  <Input
                    type="checkbox"
                    value={it.id}
                    checked={saleObj.saleTypes.includes(it.id)}
                    onChange={() => {
                      handleCheckChange(it.id);
                    }}
                  />
                  <Label check>{it.name}</Label>
                </FormGroup>
              ))}
            </FormGroup>
            <Button className="btn-submit" type="submit">
              Submit
            </Button>
          </Card>
        </Form>
      </div>
    </>
  );
};
