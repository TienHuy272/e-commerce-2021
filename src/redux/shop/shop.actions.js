import ShopActionTypes from './shop.types';
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.util';

export const fetchCollectionsStart = (collectionMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionSuccess = (collectionMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionMap,
});

export const fetchCollectionFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCT_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionStartAsync = () => {
  return (dispatch) => {
    const collectionRef = firestore.collection('collections');
    dispatch(fetchCollectionsStart());
    collectionRef
      .get()
      .then((snapshot) => {
        const collectionMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionSuccess(collectionMap));
      })
      .catch((error) => dispatch(fetchCollectionFailure(error.message)));
  };
};
