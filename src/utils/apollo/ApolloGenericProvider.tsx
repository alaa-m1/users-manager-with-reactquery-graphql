import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, IdGetter } from "@apollo/client";
import { mongoDBGraphQLUrl } from "utils/constants";
import { KeySpecifier } from "@apollo/client/cache/inmemory/policies";

const ApolloGenericProvider = ({ children }: { children: React.ReactNode }) => {
  const client = new ApolloClient({
    uri: mongoDBGraphQLUrl,
    cache: new InMemoryCache({ dataIdFromObject(responseObject){ 
      const res= responseObject.id as  KeySpecifier | false | ReturnType<IdGetter>
      return res} }),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloGenericProvider;
