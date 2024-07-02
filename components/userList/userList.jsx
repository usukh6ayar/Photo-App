import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, ListItemIcon, Typography, Divider } from "@material-ui/core";
import "./userList.css";
import axios from "axios";
import {
  PersonOutlineOutlined,
  Person,
} from "@material-ui/icons";


/**
 * Define UserList, a React componment of CS142 project #5
 * Generate a list of items from users' names,
 * and link to user's detail when clicked
 */
function UserList(props) {

  const [users, setUser] = useState(null);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

  // Axios ashiglan hereglegchiin list tataj awna
  const axios_fetchUser = () => {
    axios
      .get("http://localhost:3000/user/list")
      .then(response => {
        console.log("** UserList: fetched User List **");
        setUser(response.data);
      })
      .catch(error => {   // Handle error
        console.log(`** UserList Error: ${error.message} **`);
      });
  };

  // List tataj awna
  useEffect(() => {
    axios_fetchUser();
  }, [props.loginUser]);

  // button darsan index iig hadgalah
  const handleClick = index => setSelectedButtonIndex(index);

  let userList;

  if (users && props.loginUser) {
    userList = users.map((user, index) => (
      <React.Fragment key={index}>
        <ListItem
          to={`/users/${user._id}`}
          component={Link} onClick={() => handleClick(index)}
          button
          style={{
            backgroundColor: selectedButtonIndex === index ? "#45788C" : "",
            color: selectedButtonIndex === index ? "#F1F0EA" : ""
          }}
        >
          {/* Selected style for button icons */}
          {
            selectedButtonIndex === index ?
              <ListItemIcon><Person fontSize="large" style={{ color: "#F1F0EA" }} /></ListItemIcon> :
              <ListItemIcon><PersonOutlineOutlined fontSize="large" /></ListItemIcon>
          }
          <ListItemText primary={
            <Typography variant="h6">{user.first_name + " " + user.last_name + (props.loginUser.id === user._id ? " (Me)" : "")}</Typography>
          } />
        </ListItem>
        <Divider />
      </React.Fragment>
    ));
  }


  return <List component="nav">{userList}</List>;
}

export default UserList;