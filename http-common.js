import axios from "axios";
import { router } from "./src/main"

let customAxios = axios.create({
    baseURL: "http://localhost:5000",

    headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTY4NTM2NDA2MCwiZXhwIjoxNjg3OTU2MDYwfQ.zbDnYOWxvplEBP3redatqu1N7DtO3vpdhE8nFJF8B_w`

    }
})



customAxios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        router.push('/login')
    }
    return Promise.reject(error);
});

export default customAxios;
