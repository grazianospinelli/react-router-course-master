/* eslint-disable arrow-body-style */
import React from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import store from 'store';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import styles from './styles.css';
import Users from '../Users';
import UserAdd from '../UserAdd';
import UserEdit from '../UserEdit';
import FourOhFour from '../FourOhFour';
import isLoggedIn from '../../helpers/is_logged_in';
// import UserInfo from '../UserInfo';

// Se non fosse con la doppia chiamata, dato che tutto questo componente è funzionale,
// questa funzione viene chiamata subito e fa uscire automaticamente in Logout.
const handleLogout = history => () => {
  store.remove('loggedIn');
  console.log('you have been logged out. boo!');
  history.push('/login');
};

const Cms = ({ history }) => {
  if (!isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Helmet>
        <title>CMS</title>
      </Helmet>

      <Sidebar as={Menu} inverted visible vertical width="thin" icon="labeled">
        <Link to="/users">
          <Menu.Item name="users">
            <Icon name="users" />
            Users
          </Menu.Item>
        </Link>

        <Link to="/users/new">
          <Menu.Item name="new-user">
            <Icon name="plus" />
            Add User
          </Menu.Item>
        </Link>

        <Menu.Item name="logout" onClick={handleLogout(history)}>
          <Icon name="power" />
          Logout
        </Menu.Item>
      </Sidebar>
      <div className={styles.mainBody}>
        <Switch>
          <Route path="/users/:userId/edit" component={UserEdit} />
          <Route path="/users/new" component={UserAdd} />
          <Route path="/users" component={Users} />
          <Route component={FourOhFour} />
        </Switch>
        {/* <Route path="/users/:userId" component={UserInfo} /> */}
      </div>
    </div>
  );
};

export default Cms;
