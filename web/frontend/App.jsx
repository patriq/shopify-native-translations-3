import { BrowserRouter } from "react-router-dom";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";

import {
  AppBridgeProvider,
  CustomApolloProvider,
  PolarisProvider,
  QueryProvider,
} from "./components";
import { ShopLocalesProvider } from "./context";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <CustomApolloProvider>
              <ShopLocalesProvider>
                <NavigationMenu
                  navigationLinks={[
                    {
                      label: "Collections",
                      destination: "/collections",
                    },
                    {
                      label: "Products",
                      destination: "/products",
                    },
                    {
                      label: "Locale settings",
                      destination: "/locales",
                    },
                  ]}
                />
                <Routes pages={pages}/>
              </ShopLocalesProvider>
            </CustomApolloProvider>
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
