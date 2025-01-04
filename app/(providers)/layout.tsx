import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
// 자동 toast 스타일 적용 css
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./_providers/AuthProvider";
import ModalProvider from "./_providers/ModalProvider";
import TanstackQueryProvider from "./_providers/TanStackQueryProvider";

function ProvidersLayout({ children }: PropsWithChildren) {
  return (
    <TanstackQueryProvider>
      <ModalProvider>
        <AuthProvider>
          {children}
          <ToastContainer limit={4} />
        </AuthProvider>
      </ModalProvider>
    </TanstackQueryProvider>
  );
}

export default ProvidersLayout;
