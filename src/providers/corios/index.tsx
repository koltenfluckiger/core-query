import React, {createContext, useContext, useState} from "react";

import Corios from "../../corios";

const CoriosContext = createContext(null);

function createCoriosClient(options: Object) {
  Corios.create(options);
  return Corios._getInstance();
}

function CoriosProvider({
  children,
  defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
  },
  options = {},
}: {
  children: JSX.Element;
  defaultOptions?: Object;
  options?: Object;
}): React.Context<typeof CoriosContext> | React.ReactElement<any, any> {
  const opts = {...defaultOptions, ...options};
  const CoriosClient = createCoriosClient(opts);
  const [corios] = useState(() => CoriosClient);

  return (
    <CoriosContext.Provider value={corios}>{children}</CoriosContext.Provider>
  );
}

const useCorios = () => {
  return useContext(CoriosContext);
};

export {CoriosProvider, useCorios};
