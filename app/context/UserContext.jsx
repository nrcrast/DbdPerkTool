import React from 'react';

const UserContext = React.createContext({
  user: null,
  packs: [],
  portraits: [],
  refreshPacks: async () => {},
  refreshPortraits: async () => {},
  setUser: user => {}
});

export default UserContext;
