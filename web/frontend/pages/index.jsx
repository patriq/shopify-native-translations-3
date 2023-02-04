import { Link, List, Page, } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <Page>
      <List>
        <List.Item>
          <Link onClick={() => navigate("/collections")}>Collections</Link>
        </List.Item>
        <List.Item>
          <Link onClick={() => navigate("/products")}>Products</Link>
        </List.Item>
        <List.Item>
          <Link onClick={() => navigate("/locales")}>Shop locale settings</Link>
        </List.Item>
      </List>
    </Page>
  );
}
