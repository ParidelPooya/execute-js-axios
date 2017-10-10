let axios = require("axios");

module.exports = {
    type: "action",
    name: "axios",
    action: (action, executionData /* , options */) => {
        return axios(action(executionData)).then((response) => response.data);
    }
};
