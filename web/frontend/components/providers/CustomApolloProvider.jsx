import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
import { useAuthenticatedFetch } from "../../hooks";

export function CustomApolloProvider({children}) {
  const client = new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        // Collection, Product and Metafields automatically cached since they
        // have an id field.
        TranslatableResource: {
          keyFields: ["resourceId"],
        },
        Query: {
          fields: {
            // Used in collections.js
            collections: relayStylePagination(),
            // Used in products.js
            products: relayStylePagination(),
          },
        },
      },
    }),
    link: createHttpLink({
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      uri: "/api/graphql/proxy",
      fetch: useAuthenticatedFetch()
    })
  });

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}