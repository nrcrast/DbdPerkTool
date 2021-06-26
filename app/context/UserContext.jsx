import React from 'react';

const UserContext = React.createContext({
  user: null,
  setUser: user => {}
});

export default UserContext;
