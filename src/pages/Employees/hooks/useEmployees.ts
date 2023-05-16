import { GraphQLClient } from 'graphql-request'
import { GQLResponse, GQLMappedResponse, DepartmentInfo, EmployeeInfo } from 'pages/Employees/types'
import { UseQueryResult, useQuery } from 'react-query'
import { graphQLUrl } from 'utils/constants';
import { queryKeys } from 'utils/reactQuery/queryKeys'

export declare type MapResponseFn<TDATA, RDATA = unknown> = (res: RDATA) => TDATA;
const mapResponse: MapResponseFn<GQLMappedResponse, GQLResponse> = (
  res: GQLResponse
): GQLMappedResponse => {
  const department: DepartmentInfo = {
    id: res.department.id,
    name: res.department.name,
    description: res.department.description || '',
    employeesCount: res.department.employees?.length || 0,
    employees: (res.department.employees || []).map((employee) => ({
      id: employee.id,
      name: employee.firstName + ' ' + employee.lastName,
      address: employee.address,
      mobile: employee.mobile,
      age: employee.age,
      department: employee.department,
    }))
  };
  const employee: EmployeeInfo = {
    id: res.employee.id,
    name: res.employee.firstName + ' ' + res.employee.lastName,
    address: res.employee.address,
    mobile: res.employee.mobile,
    age: res.employee.age,
    department: res.employee.department
  }
  return { department, employee };
};

const useEmployees = (query: string): UseQueryResult<GQLMappedResponse, unknown> => {
  const graphQLClient = new GraphQLClient(graphQLUrl, {
    method: 'POST',
    jsonSerializer: {
      parse: JSON.parse,
      stringify: JSON.stringify,
    },
  })

  const response = useQuery<GQLResponse>({
    queryKey: queryKeys.getEmployees,
    queryFn: async () =>
      graphQLClient.request(
        query
      ),
  })
  const mappedData = response.data ? mapResponse(response.data) : undefined;
  const result: any = { ...response, data: mappedData }
  return result
}
export { useEmployees }