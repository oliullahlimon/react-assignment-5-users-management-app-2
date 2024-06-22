import React, { useEffect, useState } from 'react';

import Search from './components/Search';
import Users from './components/Users';
import useFetch from './hook/useFetch';

const App = () => {
  const { data, isLoading, error } = useFetch('https://jsonplaceholder.typicode.com/users');
  const [users, setUsers] = useState([]);
  //Initial State of users: The initial state of users is set to data, which might be undefined at the start. This could lead to issues. It's better to initialize it as an empty array.
  const [filteredUsers, setFilteredUsers] = useState([]);

  //The useEffect hook listens for changes in data. Once data is fetched, useEffect sets the users.
  useEffect(() => {
    setUsers(data);
    setFilteredUsers(data);
  }, [data]);

  const handleDeleteUser = (id) => {
    //Uses filteredUsers.filter() because the deletion should affect only the currently displayed list of users.
    const filter = filteredUsers.filter((user) => user.id !== id);
    setFilteredUsers(filter);
  };

  const handleSearch = (searchText) => {
    const value = searchText.toLowerCase();
    //Uses users.filter() because the search should consider all available users.
    const newUsers = users.filter((user) => {
      const userName = user.name.toLowerCase();
      return userName.startsWith(value);
    });
    setFilteredUsers(newUsers);
  };

  return (
    <div className="container">
      <h1 className="title">Users Management App</h1>
      {isLoading && <p>Loading users...</p>}
      {error && <p>{error}</p>}
      <Search onHandleSearch={handleSearch} />
      {filteredUsers && <Users users={filteredUsers} onHandleDeleteUser={handleDeleteUser} />}
    </div>
  );
};

export default App;
