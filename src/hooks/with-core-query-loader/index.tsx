import {LoadingComponent} from "../../components";
import React from "react";
import {flatten} from "../../utils";

const withCoreQueryLoader =
  (Component: React.ComponentType<any>) => (props: any) => {
    const {query, queryOptions} = props;
    const {data, isLoading} = query(queryOptions);

    if (isLoading) {
      return <LoadingComponent></LoadingComponent>;
    }
    const flatData = flatten(data).data;

    return <Component {...props}>{props.render(flatData)}</Component>;
  };
export default withCoreQueryLoader;
