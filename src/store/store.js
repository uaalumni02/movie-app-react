const initialState = {
  login: {
    username: "",
    password: "",
    InvalidLogin: "",
    loggedIn: false,
  },
  register: {
    username: "",
    password: "",
    loggedIn: false,
  },
  allMovies: {
    movies: [],
    rating: "",
    search: "",
  },
  addMovie: {
    name: "",
    rating: [],
    release: "",
    directors: "",
    ratingId: "",
    movieConfirmation: false,
  },
  editMovie: {
    name: "",
    rating: "",
    release: "",
    directors: "",
    ratingData: [],
    movieConfirmation: false,
  },
};

export default initialState;


