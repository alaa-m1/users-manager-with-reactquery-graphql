import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { DepartmentInfo } from "./types";
type DepartmentFormProps = {
  setShowNewDept: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddDepartment: (handleAddDepartment: {
    name: string;
    description: string;
  }) => void;
};
const DepartmenForm = ({
  setShowNewDept,
  handleAddDepartment,
}: DepartmentFormProps) => {
  const [departmentInfo, setDepartmentInfo] = useState<DepartmentInfo>({
    id: "0",
    name: "",
    description: "",
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const departmentInfo = Object.fromEntries(formData.entries());
    handleAddDepartment({
      name: departmentInfo["name"].toString(),
      description: departmentInfo["description"].toString(),
    });
  };
  return (
    <Box sx={{ border: "1px solid #ccc", padding: "5px", margin: "5px 0px" }}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name-id">
          Name:
          <input
            id="name-id"
            name="name"
            value={departmentInfo.name}
            onChange={(e) =>
              setDepartmentInfo((p) => ({ ...p, name: e.target.value }))
            }
          />
        </label>
        <br />
        <label htmlFor="description-id">
          Description:
          <input
            id="description-id"
            name="description"
            value={departmentInfo.description}
            onChange={(e) =>
              setDepartmentInfo((p) => ({ ...p, description: e.target.value }))
            }
          />
        </label>
        <br />
        <Button type="submit">Save new Department</Button>
        <Button onClick={() => setShowNewDept(false)}>Cancel</Button>
      </form>
    </Box>
  );
};
export default DepartmenForm;
