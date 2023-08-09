import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Audioplayer from "./Audioplayer";
import { Badge, Box, Button, CircularProgress, Divider, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Modal, TextField } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useState } from "react";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import EditPost from "./EditPost";
import CollabPost from "./CollabPost";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Snackbar, Alert } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL

function ConfirmationDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent sx={{ color: 'black' }} >
        Are you sure you want to delete the post?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function AudioPost({ posts }) {
  const { authTokens, user } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [captionmodal, setCaptionmodal] = useState(false);
  const [collabModal, setCollabModal] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentCount, setCommentCount] = useState(0);
  if (!posts || posts.length === 0) {
    return <div>No posts available.</div>;
  }
  const post = posts[0];

  const createdAt = new Date(post.created_at).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const postid = post.id
  const fetchComments = () => {
    fetch(`${API_URL}/feed/comments/${postid}/`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
        setCommentCount(data.length);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  };

  


  const [isLiked, setIsLiked] = useState(post.likes.includes(user.user_id));
  const handleLikeClick = async (post_id) => {
    try {
      const response = await fetch(`${API_URL}/feed/posts/like/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access),
        },
        body: JSON.stringify({
          post_id: post_id,
        })
      });

      if (response.ok) {
        setIsLiked((prevState) => {
          if (prevState) {
            // Decrease count by one when isLiked changes from true to false
            post.total_likes -= 1;
          } else {
            // Increase count by one when isLiked changes from false to true
            post.total_likes += 1;
          }
          return !prevState;
        });
        console.log('success');
      } else {
        console.error('Failed');
      }
    } catch (error) {
      console.error('An error occurred while like/unlike:', error);
    }
  };
  const shouldDisplay = post.author === user.name;


  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEditPost = () => {
    setCaptionmodal(true)
    handleCloseMenu();
  };
  const handleUpdateSuccess = () => {
    setCaptionmodal(false);
  };
  const handleCollabSuccess = () => {
    setCaptionmodal(false);
  };

  const handleDeletePost = () => {
    setIsConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/feed/posts/delete/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access),
        },
        body: JSON.stringify({
          post_id: post.id,
        }),
      });

      if (response.ok) {
        console.log('Success');
        setIsConfirmationOpen(false);
        setSuccessAlertOpen(true);
      } else {
        console.error('Failed');
        setErrorAlertOpen(true);
      }
    } catch (error) {
      console.error('An error occurred while deleting the post:', error);
      setErrorAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmationOpen(false);
  };


  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handlePostComment = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/feed/comments/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access),
        },
        body: JSON.stringify({
          post: post.id,
          content: newComment,
        }),
      });

      if (response.ok) {
        console.log('Success'); 
        setCommentModal(false)
        // onEditSuccess();
        fetchComments();
      } else {
        console.error('Failed');
        setCommentModal(false)
      }
    } catch (error) {
      console.error('An error occurred while updating the post:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <Card sx={{
      margin: 5,
      backgroundColor: "black",
      borderRadius: 6,
    }}>
      <CardHeader
        avatar={
          <Avatar
            alt="Remy Sharp"
            src={post.author_profile_pic}
          />
        }
        action={
          shouldDisplay && (
            <div>
              <IconButton aria-label="settings" onClick={handleOpenMenu}>
                <MoreVertIcon sx={{ color: 'white' }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleEditPost} sx={{ color: 'black' }} >Edit Post</MenuItem>
                <MenuItem onClick={handleDeletePost} sx={{ color: 'red' }}>Delete Post</MenuItem>
              </Menu>
            </div>
          )
        }

        titleTypographyProps={{ variant: "h6" }}
        title={post.authors_along_collab.length > 2 ? `${post.author} and ${post.authors_along_collab.length} others`
          : post.authors_along_collab.length > 0 && post.authors_along_collab.length < 2 ? `${post.author} and ${post.authors_along_collab.join(', ')}`
            : post.author}
        subheader={
          <Typography variant="subtitle2" sx={{ color: "white" }}>
            {createdAt}
          </Typography>
        }
      />
      {/* edit caption modal */}
      <Modal
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        open={captionmodal}
        onClose={() => setCaptionmodal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditPost post={post} onEditSuccess={handleUpdateSuccess} />
      </Modal>

      <div>
        {/* Delete post confirmation dialog */}
        <ConfirmationDialog
          open={isConfirmationOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      </div>

      {/* collab post modal */}

      <Modal
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        open={collabModal}
        onClose={() => setCollabModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Typography variant="h5" gutterBottom>
          <CollabPost post={post} onEditSuccess={handleCollabSuccess} />
        </Typography>
      </Modal>

      {/* collab Comment modal */}

      <Modal
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        open={commentModal}
        onClose={() => setCommentModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Typography variant="h5" gutterBottom>
          <Box maxWidth={450} minWidth={350} bgcolor={"#273033"} p={3} borderRadius={5} display="flex"
            flexDirection="column"
            alignItems="center">
            <Typography variant="h6" textAlign="center" >Comments</Typography>
            <List sx={{
              width: '100%', maxWidth: 360, bgcolor: 'primary.main', overflow: 'auto',
              maxHeight: 300,
              '& ul': { padding: 0 }, borderRadius: 4,
            }}>
              {comments.map((comment) => (
                <ListItem alignItems="flex-start">
                  <ListItemAvatar sx={{
                    width: '20'
                  }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={comment.author}
                    secondary={

                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="subtitle2"
                        color="text.primary"
                      >
                        {comment.content}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
              <Divider variant="inset" component="li" />


            </List>
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <TextField sx={{ width: "100%", marginTop: "5px", marginBottom: "5px" }} id="standard-multiline-static" multiline label="comment" rows={2} variant="standard"
                  value={newComment} onChange={handleCommentChange}
                />
                <Button variant="contained" onClick={handlePostComment} >POST comment</Button>
              </>
            )}
          </Box>

        </Typography>
      </Modal>

      <CardContent>
        <Typography variant="body2" color="text.primary">
          {post.caption}
        </Typography>
      </CardContent>
      <Audioplayer audioFile={post.audio_file} />
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          sx={{ color: "white" }}
          onClick={() => handleLikeClick(post.id)}
        >
          <Badge badgeContent={post.total_likes} color="secondary" showZero>
            {isLiked ? (
              <Favorite sx={{ color: "red" }} />
            ) : (
              <FavoriteBorder sx={{ color: "white" }} />
            )}
          </Badge>
        </IconButton>
        <IconButton
          aria-label="create along"
          sx={{ color: "white" }}>
          <Badge badgeContent={commentCount} color="secondary" showZero>
            <CommentIcon sx={{ color: 'white' }} onClick={() => setCommentModal(true)} /></Badge>
        </IconButton>

        <IconButton
          aria-label="create along"
          sx={{ color: "white" }}>
          <AddIcon sx={{ color: 'white' }} onClick={() => setCollabModal(true)} />
        </IconButton>
      </CardActions>

      <Snackbar
        open={successAlertOpen}
        autoHideDuration={4000}
        onClose={() => setSuccessAlertOpen(false)}
      >
        <Alert severity="success" onClose={() => setSuccessAlertOpen(false)}>
          Post deleted successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorAlertOpen}
        autoHideDuration={4000}
        onClose={() => setErrorAlertOpen(false)}
      >
        <Alert severity="error" onClose={() => setErrorAlertOpen(false)}>
          An error occurred while deleting the post.
        </Alert>
      </Snackbar>

    </Card>

  );
}