import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const [showUserList, setShowUserList] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [resultSearch, setResultSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data);
        setFilteredUser(data)
      });
  }, []);

  const findUser = () => {
    let foundedUser = allUsers.filter((user) => user.name.toLowerCase().includes(searchValue));
    setFilteredUser(foundedUser);
  };

  const addToInput = (el) => {
    setResultSearch(el.target.innerHTML);
    setShowUserList(false)
  };


  return (
    <>
      <div className="wrapper">
        <div
          className="select-btn"
          onClick={() => setShowUserList((prev) => !prev)}
        >
          <span>{resultSearch.length ? resultSearch : "Select User"}</span>
          <i className="uil uil-angle-down"></i>
        </div>
        <div className={`content ${showUserList === true ? "active" : ""}`}>
          <div className="search">
            <input
              spellCheck="false"
              type="text"
              placeholder="Search"
              id="searchBar"
              onKeyUp={findUser}
              value={searchValue}
              onChange={(e) => 
                setSearchValue(e.target.value)}
            />
          </div>
          <ul className="options">
            {filteredUser.length ? filteredUser.map((user) => (
              <li key={user.id} onClick={(event) => addToInput(event)}>
                {user.name}
              </li>
            )) : <p className="not-found">user not found</p>}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
