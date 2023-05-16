import { ApolloCache, DefaultContext, DocumentNode, MutationTuple, OperationVariables, useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const UPDATE_EMPLOYEE = gql`
mutation ($id:ID!, $firstName: String, $lastName: String, $address: String, $age: Int, $mobile: String) {
  editEmployee(id: $id, firstName: $firstName, lastName: $lastName, address: $address, age: $age, mobile: $mobile) {
    id
    firstName
    lastName
    address
    mobile
    age
  }
}
`;

const useEditEmployeesMutation = (): MutationTuple<any, OperationVariables, DefaultContext, ApolloCache<any>> => {
  const mutationRes = useMutation(UPDATE_EMPLOYEE)
  return mutationRes
}
export { useEditEmployeesMutation }