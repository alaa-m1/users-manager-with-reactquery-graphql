import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { mongoDBGraphQLUrl } from "utils/constants";

const ApolloGenericProvider = ({ children }: { children: React.ReactNode }) => {
  const client = new ApolloClient({
    uri: mongoDBGraphQLUrl,
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloGenericProvider;
