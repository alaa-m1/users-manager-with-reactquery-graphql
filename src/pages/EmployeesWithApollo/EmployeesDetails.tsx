import React, { useMemo, useState } from "react";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { gql } from "@apollo/client";
import { EmployeeInfo } from "./types";
import { LoadingSpinner } from "shared";
import { useGetDepartmentsQuery } from "./hooks/useGetDepartmentsQuery";
import EmployeeCard from "./EmployeeCard";
import { useEditEmployeesMutation } from "./hooks/useEditEmployeesMutation";
import { useAddEmployeesMutation } from "./hooks/useAddEmployeesMutation";
import { useDeleteEmployeesMutation } from "./hooks/useDeleteEmployeesMutation";
import DepartmenForm from "./DepartmenForm";
import { useAddDepartmentMutation } from "./hooks/useAddDepartmentMutation";
import { useDeleteDepartmentMutation } from "./hooks/useDeleteDepartmentMutation";

const initialQuery = `
query{
  departments{ 
      id
      name
      description
      employees{
          id
          firstName
          lastName
          address
          mobile
          age
      }
  }
}
`;

const EmployeesDetails = () => {
  const theme = useTheme();
  const [value, setValue] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const [activeEmpIndex, setActiveEmpIndex] = useState([-1, -1]);
  const [activeDeptIndex, setActiveDeptIndex] = useState(-1);
  const [showdNewEmp, setShowNewEmp] = useState(false);
  const [showdNewDept, setShowdNewDept] = useState(false);
  const GET_DEPARTMENTS_INFO = useMemo(
    () => gql`
      ${query}
    `,
    [query]
  );
  const { loading, data, refetch } =
    useGetDepartmentsQuery(GET_DEPARTMENTS_INFO);
  const handleExecuteQuery = () => {
    setQuery(value);
    refetch();
  };
  const [
    editEmployeeMutation,
    { data: editData, loading: editLoading, error: editError },
  ] = useEditEmployeesMutation();
  const [addEmployeeMutation] = useAddEmployeesMutation();
  const [deleteEmployeeMutation] = useDeleteEmployeesMutation();
  const [addDepartmentMutation] = useAddDepartmentMutation();
  const [deleteDepartmentMutation] = useDeleteDepartmentMutation();

  const handleAction = (
    type: "delete" | "edit" | "new",
    employeeData: EmployeeInfo,
    deptId: string
  ) => {
    if (type === "edit") {
      editEmployeeMutation({
        variables: {
          id: employeeData.id,
          firstName: (employeeData.name || " ").split(/\s+/)[0],
          lastName: (employeeData.name || " ").split(/\s+/)[1],
          address: employeeData.address || "",
          age: parseInt(employeeData.age || "0"),
          mobile: employeeData.mobile || "",
        },
        refetchQueries: [{ query: GET_DEPARTMENTS_INFO }],
      });
    }
    if (type === "new") {
      addEmployeeMutation({
        variables: {
          departmentId: deptId,
          firstName: (employeeData.name || " ").split(/\s+/)[0],
          lastName: (employeeData.name || " ").split(/\s+/)[1],
          address: employeeData.address || "",
          age: parseInt(employeeData.age || "0"),
          mobile: employeeData.mobile || "",
        },
        refetchQueries: [{ query: GET_DEPARTMENTS_INFO }],
      });
    }
    if (type === "delete") {
      deleteEmployeeMutation({
        variables: {
          id: employeeData.id,
        },
        refetchQueries: [{ query: GET_DEPARTMENTS_INFO }],
      });
    }
  };

  const handleAddDepartment = (deptInfo: {
    name: string;
    description: string;
  }) => {
    addDepartmentMutation({
      variables: {
        name: deptInfo.name,
        description: deptInfo.description,
      },
      refetchQueries: [{ query: GET_DEPARTMENTS_INFO }],
    });
  };
  const handleDeleteDepartment = (id: string) => {
    deleteDepartmentMutation({
      variables: { id },
      refetchQueries: [{ query: GET_DEPARTMENTS_INFO }],
    });
  };
  return (
    <>
      <fieldset>
        <legend>
          To run this page: Execute the following command in the terminal window
        </legend>
        <Typography component="div" color={theme.palette.warning.main}>
        First, create .env file and add the following variable: MONGO_CLOUD_URL=...
        </Typography>
        <Typography component="div" color={theme.palette.warning.main}>
          To start up Express MongoDB GraphQL Server: npm run mongo-server
        </Typography>
      </fieldset>

      {loading && <LoadingSpinner floatingOver />}
      <Grid container mt={1} sx={{ input: { width: "250px" } }}>
        <Grid item xs={12} md={6} mb={2}>
          <Box
            sx={{
              mb: 1,
              textarea: { height: "50vh", width: { xs: "95vw", md: "45vw" } },
            }}
          >
            <textarea
              name="textarea-query"
              id="textarea-query"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            ></textarea>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button onClick={handleExecuteQuery} sx={{ marginRight: "10px" }}>
              Execute Query
            </Button>
            <Button onClick={(e) => setValue(initialQuery)}>
              Initial Query
            </Button>
          </Box>
        </Grid>
        {data ? (
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                textarea: {
                  height: "40vh",
                  width: { xs: "95vw", md: "45vw" },
                  display: "flex",
                  flexDirection: "column",
                },
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  color={theme.palette.info.main}
                  sx={{ textAlign: "center" }}
                >
                  Results:
                </Typography>
                <textarea
                  style={{ marginBottom: "15px" }}
                  name="textarea-result"
                  id="textarea-result"
                  value={JSON.stringify(data, null, 2)}
                  readOnly
                ></textarea>
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  color={theme.palette.info.main}
                  sx={{ textAlign: "center" }}
                >
                  Mapped results:
                </Typography>
                <Typography
                  variant="h6"
                  color={theme.palette.info.main}
                  sx={{ textAlign: "center" }}
                >
                  Click on any employee to edit
                </Typography>
                {data.departments.map((department, deptIndex) => {
                  const isActive = activeDeptIndex === deptIndex;
                  return (
                    <fieldset
                      onClick={() => setActiveDeptIndex(deptIndex)}
                      style={{
                        border: isActive ? "1px solid #ccc" : "1px solid #000",
                        boxShadow: isActive ? "2px 2px 5px #ccc" : "none",
                        margin: "5px 0px",
                      }}
                      key={department.id}
                    >
                      <legend>Department</legend>
                      Name:&nbsp;{department.name}
                      <br />
                      Description:&nbsp;{department.description || ""}
                      <br />
                      Employees count:&nbsp;{department.employeesCount || "0"}
                      <br />
                      <fieldset>
                        <legend>Employees</legend>
                        {department.employees?.map((employee, empIndex) => (
                          <EmployeeCard
                            employeeInfo={employee}
                            lastElement={
                              empIndex + 1 === department.employees?.length
                            }
                            key={employee.id}
                            handleAction={handleAction}
                            active={
                              deptIndex === activeEmpIndex[0] &&
                              empIndex === activeEmpIndex[1]
                            }
                            handleOnClick={() => {
                              setActiveEmpIndex([deptIndex, empIndex]);
                              setShowNewEmp(false);
                            }}
                            deptId={department.id}
                          />
                        ))}
                        {showdNewEmp && activeDeptIndex === deptIndex && (
                          <EmployeeCard
                            employeeInfo={{ id: "0" }}
                            lastElement={true}
                            handleAction={handleAction}
                            active={true}
                            handleOnClick={() => {}}
                            showNewEmp={showdNewEmp}
                            setShowNewEmp={setShowNewEmp}
                            deptId={department.id}
                          />
                        )}
                      </fieldset>
                      <br />
                      <>
                        <Button onClick={() => setShowNewEmp(true)}>
                          Add employee
                        </Button>
                        <Button
                          onClick={() => handleDeleteDepartment(department.id)}
                        >
                          delete department
                        </Button>
                      </>
                    </fieldset>
                  );
                })}
                {showdNewDept && (
                  <DepartmenForm
                    setShowdNewDept={setShowdNewDept}
                    handleAddDepartment={handleAddDepartment}
                  />
                )}
                <Button onClick={() => setShowdNewDept(true)}>
                  Add department
                </Button>
              </Box>
            </Box>
          </Grid>
        ) : null}
      </Grid>
    </>
  );
};
export default EmployeesDetails;
