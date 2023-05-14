import { ApolloCache, DefaultContext, DocumentNode, MutationTuple, OperationVariables, useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_EMPLOYEE = gql`
mutation DeleteDepartment($id:ID!) {
  deleteDepartment(id: $id) {
    id
  }
}
`;

const useDeleteDepartmentMutation = (): MutationTuple<any, OperationVariables, DefaultContext, ApolloCache<any>> => {
  const mutationRes = useMutation(DELETE_EMPLOYEE)
  return mutationRes
}
export { useDeleteDepartmentMutation }