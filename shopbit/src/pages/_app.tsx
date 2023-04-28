import "../styles/globals.css";
import { MyAppProps } from "../../components/common/types";
import { Layouts } from "../../components/common/Layouts";
import { StoreProvider } from "../utils/Store";

function MyApp({ Component, pageProps }: MyAppProps) {
 
  const Layout = Layouts[Component.Layout] ?? ((page) => page);
  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}
export default MyApp;
