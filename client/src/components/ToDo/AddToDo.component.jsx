import React from "react";
import CustomForm from "../CustomForm/CustomForm.components";

const AddToDo = ({ loading, addToDo, form }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CustomForm form={form} loading={loading} onSubmit={addToDo} />
    </div>
  );
};

export default AddToDo;
