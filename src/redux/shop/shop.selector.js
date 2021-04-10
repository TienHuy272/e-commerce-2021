import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = (state) => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  (shop) => shop.collections,
);

export const selectCollectionForPreview = createSelector(
  [selectShopCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : [],
);

export const selectCollection = memoize((collectionUrlParam) =>
  createSelector([selectShopCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null,
  ),
);

//check is collection is fetching ... may be processing
export const selectIsCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching,
);

//check collection is fetched and data received/loaded
export const selectIsCollectionLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.collections,
);
