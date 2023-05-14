import { DocumentNode, OperationVariables, QueryResult, useQuery } from '@apollo/client';
import { GQLResponse, GQLMappedResponse, DepartmentInfo } from 'pages/EmployeesWithApollo/types'

export declare type MapResponseFn<TDATA, RDATA = unknown> = (res: RDATA) => TDATA;
const mapResponse: MapResponseFn<GQLMappedResponse, GQLResponse> = (
  res: GQLResponse
): GQLMappedResponse => {
  const departments: Array<DepartmentInfo> = res.departments.map((department)=>({
    id: department.id,
    name: department.name,
    description: department.description || '',
    employeesCount: department.employees?.length || 0,
    employees: (department.employees || []).map((employee) => ({
      id: employee.id,
      name: employee.firstName + ' ' + employee.lastName,
      address: employee.address,
      mobile: employee.mobile,
      age: employee.age,
      department: employee.department,
    }))
  }));
  
  return { departments };
};

const useGetDepartmentsQuery = (query: DocumentNode): QueryResult<GQLMappedResponse, OperationVariables> => {
  const response = useQuery<GQLResponse>(query)
  const mappedData = response.data ? mapResponse(response.data) : undefined;
  const result: any = { ...response, data: mappedData }
  return result
}
export { useGetDepartmentsQuery }