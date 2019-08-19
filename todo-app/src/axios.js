import axios from 'axios';

const instance = axios.create({
   /* baseURL: 'https://todo-app-fd575.firebaseio.com/'*/ 
    baseURL: 'http://localhost:8080/',

});

export default instance