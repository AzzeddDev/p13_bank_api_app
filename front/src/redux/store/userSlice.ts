import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getUserProfile } from "../../api/auth"
import { updateUserProfile } from "../../api/update"

interface UserState {
    token: string | null
    profile: { firstName: string; lastName: string } | null
    loading: boolean
    error: string | null
}

const initialState: UserState = {
    token: localStorage.getItem("token"),
    profile: null,
    loading: false,
    error: null,
}

export const fetchUserProfile = createAsyncThunk(
    "user/fetchProfile",
    async (_, { getState, rejectWithValue }) => {
        const state = getState() as { user: UserState }
        const token = state.user.token
        if (!token) return rejectWithValue("No token found")

        try {
            const res = await getUserProfile(token)
            return res.body
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    }
)

export const updateUserName = createAsyncThunk(
    "user/updateProfile",
    async (
        { firstName, lastName }: { firstName: string; lastName: string },
        { getState, rejectWithValue }
    ) => {
        const state = getState() as { user: UserState }
        const token = state.user.token
        if (!token) return rejectWithValue("No token found")

        try {
            await updateUserProfile(token, firstName, lastName)
            return { firstName, lastName } // Only return what you use
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            localStorage.setItem("token", action.payload)
        },
        logout(state) {
            state.token = null
            state.profile = null
            localStorage.removeItem("token")
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.profile = action.payload
                state.loading = false
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(updateUserName.fulfilled, (state, action) => {
                state.profile = action.payload
            })
    },
})

export const { setToken, logout } = userSlice.actions
export default userSlice.reducer