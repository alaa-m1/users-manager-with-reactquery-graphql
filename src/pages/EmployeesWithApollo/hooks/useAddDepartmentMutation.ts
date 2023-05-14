import { ApolloCache, DefaultContext, DocumentNode, MutationTuple, OperationVariables, useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const ADD_DEPARTMENT = gql`
mutation AddDepartment($name: String, $description: String) {
  addDepartment(name: $name, description: $description) {
    id
  }
}
`;

const useAddDepartmentMutation = (): MutationTuple<any, OperationVariables, DefaultContext, ApolloCache<any>> => {
  const mutationRes = useMutation(ADD_DEPARTMENT)
  return mutationRes
}
export { useAddDepartmentMutation }