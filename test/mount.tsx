import React, { ReactNode } from "react";
import { mount as mountBase, MountRendererProps, ReactWrapper } from "enzyme";

import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

/**
 * Custom renderer example with enzyme
 * You can customize it to your needs.
 *
 * To learn more about customizing renderer,
 * please visit https://enzymejs.github.io/enzyme/
 */

const AllTheProviders = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>{children}</RecoilRoot>
      </QueryClientProvider>
    </>
  );
};

const mount: (node: ReactNode, options?: MountRendererProps) => ReactWrapper = (
  node,
  options
) => {
  return mountBase(<AllTheProviders>{node}</AllTheProviders>, options);
};

// override render method
export default mount;
