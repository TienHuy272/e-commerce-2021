import React from 'react';
import CollectionOverview from '../../components/collections-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCollectionStartAsync } from '../../redux/shop/shop.actions';
import { createStructuredSelector } from 'reselect';
import {
  selectIsCollectionFetching,
  selectIsCollectionLoaded,
} from '../../redux/shop/shop.selector';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionStartAsync } = this.props;
    fetchCollectionStartAsync();
  }

  render() {
    const { match, isCollectionFetching, isCollectionLoaded } = this.props;

    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionOverviewWithSpinner
              isLoading={isCollectionFetching}
              {...props}
            />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner
              isLoading={!isCollectionLoaded}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync()),
});

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionLoaded: selectIsCollectionLoaded,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
