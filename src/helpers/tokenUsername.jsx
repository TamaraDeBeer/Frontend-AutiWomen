import {jwtDecode} from "jwt-decode";

function tokenUsername(jwt) {
    const decodedToken = jwtDecode(jwt);
    return decodedToken.sub;
}

export default tokenUsername;