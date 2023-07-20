import React, { createContext, useState, useEffect } from 'react';

export const PostContext = createContext();

const PostProvider = ({ children }) => {
    const contextData = {
        user: user,
    };
    return <PostContext.Provider value={contextData}>{children}</PostContext.Provider>;
}
export default PostProvider;
