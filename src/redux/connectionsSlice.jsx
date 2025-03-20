import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
    name: "connections",
    initialState: {
        connections: null,
        ignoredConnections: null
    },
    reducers:{
        addConnections: (state, action) => {
            state.connections= action.payload;
        },
        removeConnection: (state, action) => {
            state.connections = state.connections.filter((connection) => connection.connectionId !== action.payload);
        },
        addIgnoredConnections: (state, action) => {
            state.ignoredConnections = action.payload;
        },
        removeIgnoredConnectionAction: (state, action) => {
            state.ignoredConnections = state.ignoredConnections.filter((connection) => connection.connectionId !== action.payload);
        }
    }
});

export const {addConnections, removeConnection, addIgnoredConnections, removeIgnoredConnectionAction} = connectionsSlice.actions;
export default connectionsSlice.reducer;