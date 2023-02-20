import React, { useState } from "react";
import { Form } from "react-bootstrap";

const BtqSelect = (props) => {
  const [newBtq, setNewBtq] = useState("");

  return (
    <Form.Select
      aria-label="Default select example"
      className="mb-3"
      id="btq_select"
      value={newBtq}
      onChange={(e) => {
        setNewBtq(e.target.value);
        props.onBtqSelect(e.target.value);
      }}
      required
    >
      <option value="" disabled selected>
        Válaszd ki az üzletet!
      </option>
      <option value="alleBtq">Allee Boutique</option>
      <option value="andrBtq">Andrássy Boutique</option>
      <option value="arkbpBtq">Árkád Budapest Boutique</option>
      <option value="arkgyBtq">Árkád Győr Boutique</option>
      <option value="mammBtq">Mammut Boutique</option>
      <option value="momBtq">Mom Boutique</option>
      <option value="westBtq">Westend Boutique</option>
    </Form.Select>
  );
};

export default BtqSelect;
