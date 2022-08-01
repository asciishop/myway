const axios = require('axios')
const COVIDAPI = 'https://covid2019-api.herokuapp.com'

class Api {

    recovered() {
        return axios.get(`${COVIDAPI}/timeseries/recovered`).then(r => r.data)
    }

}
module.exports = {
    Api
}
