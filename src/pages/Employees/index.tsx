import React, { useState } from "react";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useEmployees } from "./hooks";
import { EmployeeInfo } from "./types";
import { LoadingSpinner } from "shared";

const initialQuery = `
query {
  department(id: "2") {
  id
  name
  description
  employees {
    id
    firstName
    lastName
    address
    mobile
  }
  }


  employee(id: "2") {
    id
    firstName
    lastName
    department{
    id
    name
    }
  }
}
`;
const Employees = () => {
  const theme = useTheme();
  const [value, setValue] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const { data, refetch, isLoading } = useEmployees(query);
  const handleExecuteQuery = () => {
    setQuery(value);
    refetch();
  };
  const EmployeeCard = ({
    employeeInfo,
    lastElement,
  }: {
    employeeInfo: EmployeeInfo;
    lastElement?: boolean;
  }) => (
    <>
      Name:&nbsp;{employeeInfo.name}
      <br />
      Address:&nbsp;{employeeInfo.address || ""}
      <br />
      Age:&nbsp;{employeeInfo.age || ""}
      <br />
      Mobile:&nbsp;{employeeInfo.mobile || ""}
      {!lastElement && <hr />}
    </>
  );
  return (
    <>
      <fieldset>
        <legend>
          To run this page: Execute the following two commands in the terminal
          window
        </legend>
        <Typography component="div" color={theme.palette.warning.main}>
          To start up JSON Server: npm run json-server
        </Typography>
        <Typography component="div" color={theme.palette.warning.main}>
          To start up Express GraphQL Server: npm run gql-server
        </Typography>
      </fieldset>

      {isLoading && <LoadingSpinner floatingOver />}
      <Grid container mt={1}>
        <Grid item xs={12} md={6} mb={2}>
          <Box
            sx={{
              mb: 1,
              textarea: { height: "70vh", width: { xs: "95vw", md: "45vw" } },
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
                <fieldset>
                  <legend>Department</legend>
                  Name:&nbsp;{data?.department.name}
                  <br />
                  Description:&nbsp;{data?.department.description || ""}
                  <br />
                  Employees count:&nbsp;{data?.department.employeesCount || "0"}
                  <br />
                  <fieldset>
                    <legend>Employees</legend>
                    {data?.department.employees?.map((item, index) => (
                      <EmployeeCard
                        employeeInfo={item}
                        lastElement={
                          index + 1 === data?.department.employees?.length
                        }
                        key={item.id}
                      />
                    ))}
                  </fieldset>
                  <br />
                </fieldset>
                <fieldset>
                  <legend>Employee</legend>
                  {<EmployeeCard employeeInfo={data.employee} />}
                  <fieldset>
                    <legend>Department</legend>
                    Name:&nbsp;{data ? data.employee.department?.name : ""}
                    <br />
                    Description:&nbsp;
                    {data ? data.employee.department?.description : ""}
                    <br />
                  </fieldset>
                  <br />
                </fieldset>
              </Box>
            </Box>
          </Grid>
        ) : null}
      </Grid>
    </>
  );
};
export default Employees;
