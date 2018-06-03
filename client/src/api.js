import axios from 'axios';

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3030/api',
});

const errHandler = err => {
  console.error(err);
  throw err;
};

export default {
  service: service,

  getOneProgression() {
    return service
      .get('/one-progression')
      .then(res => res.data)
      .catch(errHandler);
  },

  saveExercises(participantId, exercises) {
    return service
      .put('/save-exercices', {participantId, exercises})
  },

  postMessage(participantId, message) {
    return service
      .post(`/participants/${participantId}/messages`, message)
  },
  
  getParticipants() {
    return service
    .get('participants')
    .then(res => res.data)
    .catch(errHandler)
  },

  getParticipant(participantId) {
    return service
      .get(`participants/${participantId}`)
      .then(res => res.data)
      .catch(errHandler)
  },
  
  getCountries() {
    return service
      .get('/countries')
      .then(res => res.data)
      .catch(errHandler);
  },

  postCountries(data) {
    return service
      .post('/countries', data)
      .then(res => res.data)
      .catch(errHandler);
  },
  
  getSecret() {
    return service
      .get('/secret')
      .then(res => res.data)
      .catch(errHandler);
  },
  
  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => res.data)
      .catch(errHandler);
  },

  login(email, password) {
    return service
      .post('/login', {
        email,
        password,
      })
      .then(res => {
        console.log("DEBUG res", res)
        const { data } = res;
        localStorage.setItem('user', JSON.stringify(data));
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
        return data;
      })
      .catch(errHandler);
  },

  logout() {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('user');
  },

  loadUser() {
    const userData = localStorage.getItem('user');
    if (!userData) return false;
    const user = JSON.parse(userData);
    if (user.token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
      return user;
    }
    return false;
  },

  isLoggedIn() {
    return localStorage.getItem('user') != null
  },

  isAdmin() {
    return localStorage.getItem('user') != null && this.loadUser().isAdmin
  }
};
