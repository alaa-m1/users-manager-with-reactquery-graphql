type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  address?: string;
  mobile?: string;
  age?: string;
  department?: Department;
}
type Department = {
  id: string;
  name: string;
  description?: string;
  employees?: Array<Employee>
}
export type GQLResponse = {
  departments: Array<Department>,
}


export type EmployeeInfo = {
  id: string;
  name?: string;
  address?: string;
  mobile?: string;
  age?: string;
  department?: DepartmentInfo;
}

export type DepartmentInfo = {
  id: string;
  name: string;
  description?: string;
  employeesCount?: number;
  employees?: Array<EmployeeInfo>
}

export type GQLMappedResponse = undefined | {
  departments: Array<DepartmentInfo>
}