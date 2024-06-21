import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSaleById, updateSale } from "../../managers/saleManager";
import { getItemTypes } from "../../managers/itemTypeManager";
import {
  Input,
  Label,
  Button,
  FormGroup,
  Form,
  Card,
  ButtonGroup,
  CardHeader,
} from "reactstrap";
import "./EditSale.css";

export const EditSale = () => {
  const [saleAddress, setSaleAddress] = React.useState("");
  const [saleStartDate, setSaleStartDate] = React.useState();
  const [saleEndDate, setSaleEndDate] = React.useState();
  const [saleItemTypes, setSaleItemTypes] = React.useState([]);
  const [saleFeaturedItem, setSaleFeaturedItem] = React.useState("");
  const [saleFeaturedItemDesc, setSaleFeaturedItemDesc] = React.useState("");
  const [itemTypes, setItemTypes] = React.useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const importExistingSale = async () => {
    const editSale = await getSaleById(id);
    const {
      startDate,
      endDate,
      address,
      featuredItem,
      featuredItemDesc,
      saleTypes,
    } = editSale;
    const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
    const formattedEndDate = new Date(endDate).toISOString().split("T")[0];

    setSaleStartDate(formattedStartDate);
    setSaleEndDate(formattedEndDate);
    setSaleAddress(address);
    setSaleFeaturedItem(featuredItem);
    setSaleFeaturedItemDesc(featuredItemDesc);
    setSaleItemTypes(saleTypes.map((it) => it.itemTypeId));
  };

  const updatedSale = () => {
    const saleObj = {
      address: saleAddress,
      startDate: saleStartDate,
      endDate: saleEndDate,
      featuredItem: saleFeaturedItem,
      featuredItemDesc: saleFeaturedItemDesc,
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
      <div className="edit-parent">
        <Form onSubmit={handleSubmit}>
          <Card
            className="edit-form"
            style={{
              height: "55rem",
              width: "55rem",
            }}
          >
            <CardHeader tag="h1">Edit Sale</CardHeader>
            <FormGroup>
              <Label tag="h4">Rescheduled Start Date</Label>
              <Input
                type="date"
                name="startDate"
                value={saleStartDate}
                onChange={(evt) => setSaleStartDate(evt.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label tag="h4">Rescheduled End Date</Label>
              <Input
                type="date"
                name="endDate"
                value={saleEndDate}
                onChange={(event) => setSaleEndDate(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label tag="h4">Address</Label>
              <Input
                type="text"
                name="address"
                value={saleAddress}
                onChange={(evt) => setSaleAddress(evt.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label tag="h4">Featured Item</Label>
              <Input
                type="text"
                name="featureditem"
                value={saleFeaturedItem}
                onChange={(evt) => setSaleFeaturedItem(evt.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label tag="h4">Featured Item Description</Label>
              <Input
                bsSize="lg"
                type="textarea"
                name="featureditemdesc"
                value={saleFeaturedItemDesc}
                onChange={(evt) => setSaleFeaturedItemDesc(evt.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label tag="h4">Types of Items Being Sold:</Label>
              {itemTypes.map((it) => (
                <FormGroup
                  className="edit-types"
                  check
                  inline
                  key={`it-${it.id}`}
                >
                  <Input
                    type="checkbox"
                    value={it.id}
                    checked={saleItemTypes.includes(it.id)}
                    onChange={() => {
                      handleCheckChange(it.id);
                    }}
                  />
                  <Label check>{it.name}</Label>
                </FormGroup>
              ))}
            </FormGroup>
            <Button className="btn-edit" type="submit">
              Submit
            </Button>
          </Card>
        </Form>
      </div>
    </>
  );
};
