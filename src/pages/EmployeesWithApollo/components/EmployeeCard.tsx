import { Box, Button } from "@mui/material";
import { EmployeeInfo } from "../types";
import { useState } from "react";
import _ from "lodash";

type EmployeeCardProps = {
  employeeInfo: EmployeeInfo;
  lastElement?: boolean;
  active: boolean;
  handleAction: (
    type: "delete" | "edit" | "new",
    EmployeeData: EmployeeInfo,
    deptId: string
  ) => void;
  handleOnClick: () => void;
  showNewEmp?: boolean;
  setShowNewEmp?: React.Dispatch<React.SetStateAction<boolean>>;
  deptId: string;
};
const EmployeeCard = ({
  employeeInfo,
  lastElement,
  active,
  handleAction,
  handleOnClick,
  showNewEmp = false,
  setShowNewEmp,
  deptId,
}: EmployeeCardProps) => {
  const [newEmpInfo, setNewEmpInfo] = useState<EmployeeInfo>(employeeInfo);
  const [editMode, setEditMode] = useState(false);
  return (
    <>
      <Box
        sx={{
          border: active ? "1px solid #ccc" : "none",
          boxShadow: active ? "2px 2px 5px #ccc" : "none",
          padding: "5px",
          boxSizing: "border-box",
          marginTop: showNewEmp ? "10px" : "0px",
        }}
        onClick={handleOnClick}
      >
        {editMode || showNewEmp ? (
          <label htmlFor="name-id">
            Name:&nbsp;
            <input
              id="name-id"
              value={newEmpInfo.name}
              placeholder="enter first name and  last name"
              onChange={(e) =>
                setNewEmpInfo((p) => ({ ...p, name: e.target.value }))
              }
            />
          </label>
        ) : (
          <span>Name:&nbsp;{employeeInfo.name}</span>
        )}

        <br />
        {editMode || showNewEmp ? (
          <label htmlFor="address-id">
            Address:&nbsp;
            <input
              id="address-id"
              value={newEmpInfo.address}
              onChange={(e) =>
                setNewEmpInfo((p) => ({ ...p, address: e.target.value }))
              }
            />
          </label>
        ) : (
          <span>Address:&nbsp;{employeeInfo.address}</span>
        )}
        <br />
        {editMode || showNewEmp ? (
          <label htmlFor="age-id">
            Age:&nbsp;
            <input
              id="age-id"
              value={newEmpInfo.age}
              onChange={(e) =>
                setNewEmpInfo((p) => ({ ...p, age: e.target.value }))
              }
            />
          </label>
        ) : (
          <span>Age:&nbsp;{employeeInfo.age}</span>
        )}
        <br />
        {editMode || showNewEmp ? (
          <label htmlFor="mobile-id">
            Mobile:&nbsp;
            <input
              id="age-id"
              value={newEmpInfo.mobile}
              onChange={(e) =>
                setNewEmpInfo((p) => ({ ...p, mobile: e.target.value }))
              }
            />
          </label>
        ) : (
          <span>Mobile:&nbsp;{employeeInfo.mobile}</span>
        )}
        {editMode && (
          <Box sx={{ padding: "5px" }}>
            <Button
              disabled={
                _.isEmpty(newEmpInfo.name) ||
                (newEmpInfo.name || "")?.trim().split(/\s+/).length < 2 ||
                _.isEqual(newEmpInfo, employeeInfo)
              }
              onClick={() => {
                handleAction("edit", newEmpInfo, deptId);
                setEditMode(false);
              }}
            >
              Apply Edit
            </Button>
            <Button
              sx={{ mr: 1 }}
              onClick={() => {
                setEditMode(false);
                setNewEmpInfo(employeeInfo);
              }}
            >
              Cancel
            </Button>
          </Box>
        )}
        {showNewEmp && (
          <Box sx={{ padding: "5px" }}>
            <Button
              disabled={
                _.isEmpty(newEmpInfo.name) ||
                (newEmpInfo.name || "")?.trim().split(/\s+/).length < 2
              }
              onClick={() => 
                handleAction("new", newEmpInfo, deptId)
              }
            >
              Add
            </Button>
            <Button
              sx={{ mr: 1 }}
              onClick={() => {
                setShowNewEmp && setShowNewEmp(false);
              }}
            >
              Cancel
            </Button>
          </Box>
        )}
        {active && !showNewEmp && (
          <Box sx={{ padding: "5px", border: "1px solid #ccc" }}>
            <Button sx={{ mr: 1 }} onClick={() => setEditMode(true)}>
              Edit
            </Button>
            <Button
              onClick={() => handleAction("delete", employeeInfo, deptId)}
            >
              Delete
            </Button>
          </Box>
        )}
      </Box>
      {!lastElement && <hr />}
    </>
  );
};
export default EmployeeCard;
