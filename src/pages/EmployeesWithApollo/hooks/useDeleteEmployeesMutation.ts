import { ApolloCache, DefaultContext, DocumentNode, MutationTuple, OperationVariables, useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_EMPLOYEE = gql`
mutation DeleteEmployee($id:ID!) {
  deleteEmployee(id: $id) {
    id
  }
}
`;

const useDeleteEmployeesMutation = (): MutationTuple<any, OperationVariables, DefaultContext, ApolloCache<any>> => {
  const mutationRes = useMutation(DELETE_EMPLOYEE)
  return mutationRes
}
export { useDeleteEmployeesMutation }