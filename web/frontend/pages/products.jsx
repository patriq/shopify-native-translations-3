import { gql } from "@apollo/client";
import { Card, Page, Pagination, ResourceItem, ResourceList, Stack, TextStyle, Thumbnail } from "@shopify/polaris";
import { ImageMajor } from "@shopify/polaris-icons";
import React from "react";
import { ProductPage, TranslationProgressBadge } from "../components";
import { PRODUCT_METAFIELDS_LIMIT, PRODUCT_VARIANTS_LIMIT } from "../constants/settings";
import { PRODUCT_FIELDS } from "../constants/translatableContents";
import { useShopLocales } from "../context";
import { translationsCount, translationsSubQueries, usePaginatedQuery } from "../util/utils";
import { useNavigate } from "@shopify/app-bridge-react";

const productsWithTranslations = (locales) => gql`
  query ($limit: Int!, $cursor: String) {
    products(first: $limit, after: $cursor, sortKey: TITLE) {
      edges {
        node {
          id
          handle
          title
          featuredImage {
            url
          }
          ${translationsSubQueries(locales)}
          metafields(first: ${PRODUCT_METAFIELDS_LIMIT}) {
            edges {
              node {
                id
                key
              }
            }
          }
          variants(first: ${PRODUCT_VARIANTS_LIMIT}) {
            edges {
              node {
                id
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            position
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

const Products = () => {
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const navigate = useNavigate();
  const {secondaryLocales, loadingLocales} = useShopLocales();
  const {
    products, loading,
    nextPage, previousPage, hasPreviousPage, hasNextPage,
  } = usePaginatedQuery(
    productsWithTranslations(secondaryLocales), 10, "products", {
      skip: loadingLocales
    });

  if (selectedProduct) {
    return (
      <ProductPage
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }
  return (
    <Page
      title="Products"
      breadcrumbs={[{
        content: "Home",
        onAction: () => navigate("/")
      }]}
    >
      <Card>
        <ResourceList
          items={products}
          loading={loading || loadingLocales}
          renderItem={({node}) =>
            <ResourceItem
              id={node.id}
              media={
                <Thumbnail
                  size="small"
                  source={node.featuredImage ? node.featuredImage.url : ImageMajor}
                  alt={node.title}
                />
              }
              verticalAlignment="center"
              onClick={() => setSelectedProduct(node)}
            >
              <Stack>
                <Stack.Item fill>
                  <TextStyle>{node.title}</TextStyle>
                </Stack.Item>
                {secondaryLocales.map((locale) =>
                  <TranslationProgressBadge
                    key={locale.code}
                    locale={locale}
                    translationsCount={translationsCount(node, locale.code)}
                    expectedTranslationsCount={Object.keys(PRODUCT_FIELDS).length}
                  />)}
              </Stack>
            </ResourceItem>
          }
        />
        <Card.Section>
          <Pagination
            hasPrevious={hasPreviousPage}
            hasNext={hasNextPage}
            onNext={nextPage}
            onPrevious={previousPage}
          />
        </Card.Section>
      </Card>
    </Page>
  );
};

export default Products;
