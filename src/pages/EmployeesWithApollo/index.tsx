import ApolloGenericProvider from "utils/apollo/ApolloGenericProvider";
import EmployeesDetails from "./EmployeesDetails";

const EmployeesWithApollo = () => {
  return (
    <ApolloGenericProvider>
      <EmployeesDetails/>
    </ApolloGenericProvider>
  );
};
export default EmployeesWithApollo;
