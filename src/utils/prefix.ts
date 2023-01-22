import { APPLICATION_PREFIX } from "@constants/application";

export const createStorePrefix = (storePrefix?: string) => (label: string) =>
  `${APPLICATION_PREFIX}/${storePrefix ? storePrefix + "/" : ""}${label}`;
