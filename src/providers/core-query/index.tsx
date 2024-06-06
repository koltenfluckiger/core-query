/**
 * The namespace for CoreQuery.
 */
declare namespace CoreQuery {
  /**
   * Options for React Query.
   */
  interface ReactQueryOptions {
    /**
     * The queries object.
     */
    queries: Object;
  }
}

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React, {createContext, useContext, useState} from "react";

// @ts-ignore
const CoreQueryContext: React.Context<QueryClient> = createContext({});

/**
 * Creates a new instance of QueryClient with the specified options.
 *
 * @param {Object} options - The options for creating the QueryClient.
 * @param {Object} options.newOptions - The default options for the QueryClient.
 * @param {Object} options.queryCacheOptions - The options for the query cache.
 * @param {Object} options.mutationCacheOptions - The options for the mutation cache.
 * @returns {QueryClient} - The newly created QueryClient instance.
 */
const queryClientFactory = ({
  newOptions,
  queryCacheOptions,
  mutationCacheOptions,
}: {
  newOptions: Object;
  queryCacheOptions: object;
  mutationCacheOptions: Object;
}): QueryClient => {
  // @ts-ignore
  return new QueryClient({
    defaultOptions: newOptions,
    mutationCache: new MutationCache(mutationCacheOptions),
    queryCache: new QueryCache(queryCacheOptions),
  });
};

/**
 * A wrapper component that provides a QueryClient instance to its children.
 *
 * @param options - The options for the QueryClient instance.
 * @param customOptions - Custom options to override the default options.
 * @param queryCacheOptions - Options for the query cache.
 * @param mutationCacheOptions - Options for the mutation cache.
 * @param props - Additional props to pass to the component.
 * @returns An object containing the children and optional options.
 */
function CoreQuery({
  options = {
    queries: {
      staleTime: 0.5 * 24 * 60 * 60,
      cacheTime: 1 * 24 * 60 * 60,
      suspense: true,
      notifyOnChangeProps: "tracked",
      useErrorBoundary: false,
    },
  },
  customOptions = {},
  queryCacheOptions = {},
  mutationCacheOptions = {},
  ...props
}): {
  options?: CoreQuery.ReactQueryOptions;
  customOptions?: Object;
  queryCacheOptions?: Object;
  mutationCacheOptions?: Object;
} {
  const newOptions: Object = {...options, ...customOptions};
  const [queryClient] = useState(() =>
    queryClientFactory({
      newOptions,
      queryCacheOptions,
      mutationCacheOptions,
    })
  );

  return (
    <QueryClientProvider client={queryClient} context={CoreQueryContext}>
      {props.children}
    </QueryClientProvider>
  ) as {
    options?: CoreQuery.ReactQueryOptions;
    customOptions?: Object;
    queryCacheOptions?: Object;
    mutationCacheOptions?: Object;
  };
}
const useCoreQueryClient = () => {
  // @ts-ignore
  return useContext(CoreQueryContext);
};

const useCoreQueryContext = () => {
  return CoreQueryContext;
};

export {CoreQuery, CoreQueryContext, useCoreQueryClient, useCoreQueryContext};
