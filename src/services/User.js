const axios = require("axios");

const transform = res => res.data

class UserService {
    static async getAll() {
        return axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then(transform)
    }

    static async getById(id) {
        return axios
            .get('https://jsonplaceholder.typicode.com/users/' + id)
            .then(transform)
    }
}

module.exports = UserService