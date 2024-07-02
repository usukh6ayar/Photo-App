import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import "./userDetail.css";
import axios from "axios";



/**
 * Define UserDetail, a React componment of CS142 project #5
 */
function UserDetail(props) {
  const [user, setUser] = useState(null); // serverees hereglegchiin medeelliig huleen awah

  // Axios ashiglan hereglegchiin medeelliig tatj shinechlene
  const axios_fetchUserFrom = url => {
    axios
      .get(url)
      .then(response => {
        props.onUserNameChange(response.data.first_name + " " + response.data.last_name); // TopBar ner shinechleh
        props.onLoginUserChange({
          first_name: response.data.logged_user_first_name,
          last_name: response.data.logged_user_last_name,
          id: response.data.logged_user_id,
        });
        setUser(response.data);  // hereglegchiig haruulah
      })
      .catch(error => {
        console.log("** Error in UserDetail **\n", error.message);
      });
  };


  useEffect(() => {
    // props.match.params.userId uurchluh burd axios_fetchUserFrom function duudaj hereglegchiin medeellig tataj awna
    axios_fetchUserFrom(`/user2/${props.match.params.userId}`);
  }, [props.match.params.userId]);



  if (props.loginUser || !user) {
    return (
      user && (
        <Grid container>

          {/* User basic info */}
          <Grid item xs={12}>
            <Typography color="textSecondary">Name:</Typography>
            <Typography variant="h6" gutterBottom>{`${user.first_name} ${user.last_name}`}</Typography>
            <Typography color="textSecondary">Description:</Typography>
            <Typography variant="h6" gutterBottom>{`${user.description}`}</Typography>
            <Typography color="textSecondary">Location:</Typography>
            <Typography variant="h6" gutterBottom>{`${user.location}`}</Typography>
            <Typography color="textSecondary">Occupation:</Typography>
            <Typography variant="h6" gutterBottom>{`${user.occupation}`}</Typography>
          </Grid>

          {/* Only show if user has any photos posted, most commented photo and most recently uploaded photo */}
          {user.mostRecentPhotoName && (
            <Grid item xs={12} style={{ display: "flex", margin: "20px auto", justifyContent: 'center' }}>
              <Card style={{ maxWidth: 250, margin: "0 20px" }}>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">Most Recently Uploaded Photo</Typography>
                </CardContent>
                <CardActionArea to={user && `/photos/${user._id}`} component={Link}>
                  <CardMedia
                    component="img"
                    image={`./images/${user.mostRecentPhotoName}`}
                    alt="photo"
                  />
                </CardActionArea>
                <CardContent>
                  <Typography variant="body2">
                    {`${user.mostRecentPhotoDate}`}
                  </Typography>
                </CardContent>
              </Card>
              <Card style={{ maxWidth: 250, margin: "0 20px" }}>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">Most Commented Photo</Typography>
                </CardContent>
                <CardActionArea to={user && `/photos/${user._id}`} component={Link}>
                  <CardMedia
                    component="img"
                    image={`./images/${user.mostCommentedPhotoName}`}
                    alt="photo"
                  />
                </CardActionArea>
                <CardContent>
                  <Typography variant="body2">
                    {`${user.commentsCount} comment${user.commentsCount >= 2 ? "s" : ""}`}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Button for Seeing all user photo */}
          <Grid item style={{ margin: "20px auto" }}>
            <Button
              size="large"
              to={user && `/photos/${user._id}`}
              component={Link}
              variant="contained"
              style={{ backgroundColor: "#4D869C", color: "EEF7FF" }}
            >
              See All Photos
            </Button>
          </Grid>

        </Grid>
      )
    );
  } else {
    return <Redirect to={`/login-register`} />;
  }
}

export default UserDetail;