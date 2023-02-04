import { Page, Thumbnail } from "@shopify/polaris";
import { ImageMajor } from "@shopify/polaris-icons";
import React from "react";
import { TranslatableCards } from "./TranslatableCards.jsx";
import { COLLECTION_FIELDS } from "../constants/translatableContents";

export const CollectionPage = ({ collection, onBack }) => {
  return (
    <Page
      title={collection.title}
      thumbnail={
        <Thumbnail
          source={collection.image ? collection.image.url : ImageMajor}
          alt={collection.title}
        />
      }
      breadcrumbs={[{
        content: "Home",
        onAction: onBack
      }]}
    >
      <TranslatableCards
        resources={{
          [collection.id]: COLLECTION_FIELDS,
        }}
      />
    </Page>
  );
};
