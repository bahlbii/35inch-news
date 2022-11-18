import axios from "axios";

/* used axios baseURL to provide all the 
 * necessary api urls to be hit
 */
export default axios.create({
    baseURL: "http://localhost:5000/api"
});