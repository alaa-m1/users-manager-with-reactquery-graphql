import { ApolloCache, DefaultContext, DocumentNode, MutationTuple, OperationVariables, useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const ADD_EMPLOYEE_TO_DEPARTMENT = gql`
mutation AddEmployeeToDepartment($departmentId:ID!, $firstName: String, $lastName: String, $address: String, $age: Int, $mobile: String) {
  addEmployeeToDepartment(departmentId: $departmentId, firstName: $firstName, lastName: $lastName, address: $address, age: $age, mobile: $mobile) {
    id
  }
}
`;

const useAddEmployeesMutation = (): MutationTuple<any, OperationVariables, DefaultContext, ApolloCache<any>> => {
  const mutationRes = useMutation(ADD_EMPLOYEE_TO_DEPARTMENT)
  return mutationRes
}
export { useAddEmployeesMutation }