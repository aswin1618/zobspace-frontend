import React, { useContext, useEffect } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ListItemButton } from '@mui/material';
const API_URL = import.meta.env.VITE_API_URL


function NotificationPage() {
    const [notif, setNotif] = useState([])
    const [isread, setIsread] = useState(false)
    const { authTokens } = useContext(AuthContext);

    useEffect(() => {
        Notifications()
    }, [])

    const Notifications = async () => {
        const response = await fetch(`${API_URL}/feed/notifications/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access),
            },
        });
        let data = await response.json();
        setNotif(data);
    };
    console.log(notif)
    const markNotificationAsRead = async (notificationId) => {
        try {
            const response = await fetch(`${API_URL}/feed/mark_notif/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: JSON.stringify({
                    notification_id: notificationId,
                }),
            });

            if (response.ok) {
                setIsread(true)
                const data = await response.json();
                console.log(data.message);
            } else {
                console.error('Failed to mark notification as read:', response.status);
            }
        } catch (error) {
            console.error('Error during API call:', error);
        }
    };

    return (
        <>
            <Typography variant="h6">Notifications</Typography>

            {notif.map((notification) => (

                <List sx={{ width: '100%', maxWidth: 780, bgcolor: 'black', borderRadius: 6, marginTop: "10px" }}
                >
                    <ListItemButton
                        sx={{
                            width: '100%',
                            maxWidth: 780,
                            bgcolor: isread ? 'rgba(0, 0, 0, 0.2)' : 'black',
                            borderRadius: 6,
                            marginTop: '10px',
                        }}
                        onClick={() => markNotificationAsRead(notification.id)}
                    >
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText

                                primary={
                                    <React.Fragment>

                                        {notification.notification_type === 'like' ? (
                                            <Typography sx={{ display: 'inline', color: notification.is_read ? '#525252' : 'red' }} component="span" variant="h6">
                                                {notification.username} liked your post {notification.post}
                                            </Typography>
                                        ) : notification.notification_type === 'follow' ? (
                                            <Typography sx={{ display: 'inline', color: notification.is_read ? '#525252' :  'blue' }} component="span" variant="h6">
                                                {notification.username} started following you.
                                            </Typography>
                                        ) : notification.notification_type === 'comment' ? (
                                            <Typography sx={{ display: 'inline', color: notification.is_read ? '#525252' :  'green' }} component="span" variant="h6">
                                                {notification.username} commented on your post.
                                            </Typography>
                                        ) : null}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </ListItemButton>
                </List>
            ))}
        </>

    )
}

export default NotificationPage