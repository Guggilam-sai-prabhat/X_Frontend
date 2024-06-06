import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        otherUsers: null,
        profile : null,
    },
    reducers: {
        getUser: (state, action) => {
            
            state.user = action.payload;
        },
       
        setOtherUser: (state, action) => {
            state.otherUsers = action.payload;
        },
        setMyProfile: (state, action) => {
            state.profile = action.payload;
        },
        followingUpdate: (state, action) => {
            if(state.user.following.includes(action.payload)){
                state.user.following = state.user.following.filter((itemId)=>{
                    return itemId !== action.payload;
                })
            }else{
                // follow
                state.user.following.push(action.payload);
            }
        }
    }

})

export const { getUser,  setOtherUser , setMyProfile , followingUpdate } = userSlice.actions;
export default userSlice.reducer;

