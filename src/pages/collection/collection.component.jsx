import React from 'react';
import { selectCollection } from '../../redux/shop/shop.selector';
import { connect } from 'react-redux';
import './collection.styles.scss';

const CollectionPage = ({ match }) => (
  <div className='category'>
    <h2>COLLECITON PAGE</h2>
  </div>
);

//ownProps is props from ShopPage Route
const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});
export default connect(mapStateToProps)(CollectionPage);
