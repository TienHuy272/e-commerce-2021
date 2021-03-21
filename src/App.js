import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.util';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.action';

class App extends React.Component {
  unsubcribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUserProps } = this.props;
    this.unsubcribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        //user has been login
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUserProps({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        //user log out
        setCurrentUserProps(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubcribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUserProps: (user) => dispatch(setCurrentUser(user)),
});

//1st is stateToProps, 2nd dispatchToProps
export default connect(null, mapDispatchToProps)(App);
