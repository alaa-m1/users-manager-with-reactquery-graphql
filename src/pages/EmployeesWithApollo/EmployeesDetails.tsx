import React, { useMemo, useState } from "react";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { gql } from "@apollo/client";
import { EmployeeInfo } from "./types";
import { GenericDialog, LoadingSpinner, useConfirmationDialog } from "shared";
import { useGetDepartmentsQuery } from "./hooks";
import EmployeeCard from "./components/EmployeeCard";
import {
  useAddEmployeesToDeptMutation,
  useEditEmployeesMutation,
  useDeleteEmployeesMutation,
  useAddDepartmentMutation,
  useDeleteDepartmentMutation,
} from "./hooks";
import DepartmenForm from "./components/DepartmenForm";
import { toast } from "react-toastify";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircle from "@mui/icons-material/CheckCircle";
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
  const [query, setQuery] = useState(initialQuery);
  const [activeEmpIndex, setActiveEmpIndex] = useState([-1, -1]);
  const [activeDeptIndex, setActiveDeptIndex] = useState(-1);
  const [showdNewEmp, setShowNewEmp] = useState(false);
  const [showdNewDept, setShowNewDept] = useState(false);
  const { confirm, ConfirmationDialog } = useConfirmationDialog(
    "Delete Confirmation",
    "Do you want to delete the selected record?"
  );
  const GET_DEPARTMENTS_INFO = useMemo(
    () => gql`
      ${query}
    `,
    [query]
  );
  const { loading, data, refetch } =
    useGetDepartmentsQuery(GET_DEPARTMENTS_INFO);
  const [
    editEmployeeMutation,
    { data: editData, loading: editLoading, error: editError },
  ] = useEditEmployeesMutation();
  const [addEmployeeMutation, { loading: addEmpLoading }] =
    useAddEmployeesToDeptMutation();
  const [deleteEmployeeMutation, { loading: deleteEmpLoading }] =
    useDeleteEmployeesMutation();
  const [addDepartmentMutation, { loading: addDeptLoading }] =
    useAddDepartmentMutation();
  const [deleteDepartmentMutation, { loading: deleteDeptLoading }] =
    useDeleteDepartmentMutation();

  const handleAction = async (
    type: "delete" | "edit" | "new",
    employeeData: EmployeeInfo,
    deptId: string
  ) => {
    if (type === "edit") {
      editEmployeeMutation({
        variables: {
          id: employeeData.id,
          firstName: (employeeData.name || " ").split(/\s+/)[0],
          lastName: (employeeData.name || " ").split(/\s+/).slice(1).join(" "),
          address: employeeData.address || "",
          age: parseInt(employeeData.age || "0"),
          mobile: employeeData.mobile || "",
        },
        optimisticResponse: {
          __typename: "Mutation",
          editEmployee: {
            id: employeeData.id,
            firstName: (employeeData.name || " ").split(/\s+/)[0],
            lastName: (employeeData.name || " ")
              .split(/\s+/)
              .slice(1)
              .join(" "),
            address: employeeData.address || "",
            mobile: employeeData.mobile || "",
            age: parseInt(employeeData.age || "0"),
            __typename: "EmployeeType",
          },
        },
        // refetchQueries: [{ query: GET_DEPARTMENTS_INFO }],
        //// The UI will be updated by adding a config to the Apollo Client
        //// and by updating the adding query to return the data of the updated employee
      }).then(() => toast.success("Update the selected employee successfully"));
    }
    if (type === "new") {
      addEmployeeMutation({
        variables: {
          departmentId: deptId,
          firstName: (employeeData.name || " ").split(/\s+/)[0],
          lastName: (employeeData.name || " ").split(/\s+/).slice(1).join(" "),
          address: employeeData.address || "",
          age: parseInt(employeeData.age || "0"),
          mobile: employeeData.mobile || "",
        },
        //refetchQueries: [{ query: GET_DEPARTMENTS_INFO }],
        //// The UI will be updated by adding a config to the Apollo Client
        //// and by updating the adding query to return the id of the updated department and the ids of the department's employees
      }).then(() => {
        toast.success("Add a new employee successfully");
        setShowNewEmp(false);
      });
    }
    if (type === "delete") {
      const confirmation = await confirm();
      if (confirmation) {
        deleteEmployeeMutation({
          variables: {
            id: employeeData.id,
          },
          refetchQueries: [{ query: GET_DEPARTMENTS_INFO }],
        }).then(() =>
          toast.success("Delete the selected employee successfully")
        );
      }
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
    }).then(() => {
      toast.success("Add a new department successfully");
      setShowNewDept(false);
    });
  };
  const handleDeleteDepartment = async (id: string) => {
    const confirmation = await confirm();
    if (confirmation) {
      deleteDepartmentMutation({
        variables: { id },
        refetchQueries: [{ query: GET_DEPARTMENTS_INFO }],
      }).then(() =>
        toast.success("Delete the selected department successfully")
      );
    }
  };

  return (
    <>
      <fieldset>
        <legend>
          To run this page: Execute the following command in the terminal window
        </legend>
        <Typography component="div" color={theme.palette.warning.main}>
          First, create .env file and add the following variable:
          MONGO_CLOUD_URL=...
        </Typography>
        <Typography component="div" color={theme.palette.warning.main}>
          To start up Express MongoDB GraphQL Server: npm run mongo-server
        </Typography>
        <Typography component="div" color={theme.palette.primary.main}>
        useQuery , useMutation (Click on any employee card to edit or delete)
        </Typography>
      </fieldset>

      {(loading ||
        editLoading ||
        addEmpLoading ||
        deleteEmpLoading ||
        addDeptLoading ||
        deleteDeptLoading) && <LoadingSpinner floatingOver />}
      <Grid container mt={1} sx={{ input: { width: "250px" } }}>
        <Grid item xs={12} md={6} mb={2}>
          <Typography
            variant="h5"
            color={theme.palette.info.main}
            sx={{ textAlign: "center" }}
          >
            Get Departments Query:
          </Typography>
          <Box
            sx={{
              mb: 1,
              textarea: { height: "80vh", width: { xs: "95vw", md: "45vw" } },
            }}
          >
            <textarea
              name="textarea-query"
              id="textarea-query"
              value={query}
              readOnly
            ></textarea>
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
                    setShowNewDept={setShowNewDept}
                    handleAddDepartment={handleAddDepartment}
                  />
                )}
                <Button onClick={() => setShowNewDept(true)}>
                  Add department
                </Button>
              </Box>
            </Box>
          </Grid>
        ) : null}
      </Grid>
      <ConfirmationDialog />
    </>
  );
};
export default EmployeesDetails;
