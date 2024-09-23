import {jwtDecode} from "jwt-decode";

function tokenExpired(jwt) {

    const decodedToken = jwtDecode(jwt);
    return decodedToken.exp > Date.now() / 1000;
}

export default tokenExpired;