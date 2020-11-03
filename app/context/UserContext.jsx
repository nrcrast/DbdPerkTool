import React from 'react';

const UserContext = React.createContext({
  user: null,
  packs: [],
  refreshPacks: async () => {},
  setUser: user => {}
});

export default UserContext;
