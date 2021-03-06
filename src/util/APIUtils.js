import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from '../constants';

/*const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

/!*    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }*!/

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options).then(response => response.json())
        .then(json => {return json;});



    //console.log("res"+response);

/!*    console.log(fetch(options.url, options)
        .then(response => response.json()));*!/

 /!*   return fetch(options.url, options)
        .then(response =>
            response.json()).then(json => {

/!*                if(!response.ok) {

                    return Promise.reject(json);
                }*!/
                console.log("ok"+json);
                return json;
            }
        );*!/
};*/
const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    console.log("rejected");
                    return Promise.reject(json);
                }
                return json;
            })
        );
};
export function getAllIndexes(indexType) {
    return request({
        url: API_BASE_URL + "/"+indexType,
        method: 'GET'
    });
}

/*export function getAllIndexes(indexType) {
       return request({
        url: API_BASE_URL + "/"+indexType,
        method: 'GET'
    });
}*/
export function createIndex(indexType,indexData) {
    return request({
        url: API_BASE_URL + "/"+indexType,
        method: 'POST',
        body: JSON.stringify(indexData)
    });
}
export function deleteIndex(indexType,indexId) {

    return request({
        url: API_BASE_URL + "/" + indexType + "/" + indexId,
        method: 'DELETE',
    });

}

/////////////////////Employees///////////////////////////

export function getAllEmployees() {
    return request({
        url: API_BASE_URL + "/employees",
        method: 'GET'
    });
}

export function deleteEmployee(employeeId) {
    return request({
        url: API_BASE_URL + "/employees/" + employeeId,
        method: 'DELETE',
    });

}
export function createEmployee(employeeData){
    return request({
        url: API_BASE_URL + "/employees",
        method: 'POST',
        body: JSON.stringify(employeeData)
    });
}

/////////////////////MatReq///////////////////////////

export function getAllMatReqs() {
    return request({
        url: API_BASE_URL + "/matDelReqs",
        method: 'GET'
    });
}

export function deleteMatReq(reqId) {
    return request({
        url: API_BASE_URL + "/matDelReqs/" + reqId,
        method: 'DELETE',
    });

}
export function createMatReq(reqData){
    console.log(reqData);
    return request({
        url: API_BASE_URL + "/matDelReqs",
        method: 'POST',
        body: JSON.stringify(reqData)
    });
}



export function getAllPolls(page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/polls?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function createPoll(pollData) {
    return request({
        url: API_BASE_URL + "/polls",
        method: 'POST',
        body: JSON.stringify(pollData)
    });
}

export function castVote(voteData) {
    return request({
        url: API_BASE_URL + "/polls/" + voteData.pollId + "/votes",
        method: 'POST',
        body: JSON.stringify(voteData)
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}

export function getUserCreatedPolls(username, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/polls?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function getUserVotedPolls(username, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/votes?page=" + page + "&size=" + size,
        method: 'GET'
    });
}