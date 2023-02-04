import { TextField } from "@shopify/polaris";
import React from "react";

export const TranslatableTextField = ({ translatableContent, onChange, value }) => {
  return (
    <TextField
      label={translatableContent.label}
      value={value === undefined ? translatableContent.value : value}
      disabled={!onChange}
      onChange={onChange}
      multiline={translatableContent.key.includes("html") ? 5 : false}
    />
  );
};
