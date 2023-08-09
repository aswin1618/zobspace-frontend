import { Box, Stack, Skeleton, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import AudioPost from "./AudioPost";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const API_URL = import.meta.env.VITE_API_URL

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const { authTokens } = useContext(AuthContext);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    ProfilePosts();
  }, []);

  const ProfilePosts = async () => {
    const response = await fetch(`${API_URL}/feed/home_posts/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access),
      },
    });
    let data = await response.json();
    setLoading(false);
    setAllPosts(data);
    console.log(data);
  };
  
  return (
    <Box flex={4} p={{ xs: 0, md: 2 }} >
      {loading ? (
        <Stack spacing={2}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <>
          <Grid container>
            {allPosts.map((post) => (
              <Grid item key={post.id} xs={12}>
                <AudioPost posts={[post]} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Feed;