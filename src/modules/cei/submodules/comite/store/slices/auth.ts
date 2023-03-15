interface Auth {
  userId: number;
  role: string;
  isAuthenticated: boolean;
  loading: boolean;
}

export const initialState = {
  isAuthenticated: false,
  role: '',
  loading: true,
  userId: 0,
} as Auth;

/*
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginFinish: (state) => {
      state.loading = false
    },
		loginSuccess: (state: any, action: PayloadAction<{Id: number, role: string}>) => {
      state.loading = false;
			state.isAuthenticated = true;
			state.userId = action.payload.Id;
			state.role = action.payload.role;
    },
    logOut: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
			state.role = ""
			state.userId = 0
    },
  },
});

export const { loginFinish, loginSuccess, logOut } = authSlice.actions;

export default authSlice.reducer;
*/
