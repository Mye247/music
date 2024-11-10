import { PropsWithChildren } from "react";
import TanstackQueryProvider from "./_providers/TanStackQueryProvider";

function ProvidersLayout({ children }: PropsWithChildren) {
  return <TanstackQueryProvider>{children}</TanstackQueryProvider>;
}

export default ProvidersLayout;
