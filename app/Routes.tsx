import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import PerkPage from './containers/PerkPage';
import SettingsPage from './containers/SettingsPage';
import CreatePage from './containers/CreatePage';
import PortraitPage from './containers/PortraitPage';
import DefaultPage from './containers/DefaultPage';
import MyPacksPage from './containers/MyPacksPage';
import MyProfilePage from './containers/MyProfilePage';
import AdminPage from './containers/AdminPage';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route exact path={routes.PERKS} component={PerkPage} />
        <Route exact path={routes.PORTRAITS} component={PortraitPage} />
        <Route exact path={routes.HOME} component={HomePage} />
        <Route exact path={routes.SETTINGS} component={SettingsPage} />
        <Route exact path={routes.CREATE} component={CreatePage} />
        <Route exact path={routes.DEFAULT} component={DefaultPage} />
        <Route exact path={routes.MY_PACKS} component={MyPacksPage}/>
        <Route exact path={routes.MY_PROFILE} component={MyProfilePage}/>
        <Route exact path={routes.ADMIN} component={AdminPage}/>
      </Switch>
    </App>
  );
}
