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
      <option value="allee">Allee Boutique</option>
      <option value="andrassy">Andrássy Boutique</option>
      <option value="arkad">Árkád Budapest Boutique</option>
      <option value="gyor">Árkád Győr Boutique</option>
      <option value="etele" disabled>
        Etele Pláza Boutique
      </option>
      <option value="mammut">Mammut Boutique</option>
      <option value="mom">Mom Boutique</option>
      <option value="westend">Westend Boutique</option>
    </Form.Select>
  );
};

export default BtqSelect;
