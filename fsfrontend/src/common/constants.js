let port = "3000";
// if (window.location.port !== 80 || window.location.port !== 443){
//     port = window.location.port;
// } else {
//     port = 3000;
// }
// const SERVER_URL = window.location.protocol+"//"+window.location.hostname+":"+port+"/api";
const SERVER_URL_FILESTORAGE = window.location.protocol+"//"+window.location.hostname+":"+port+"/filestorage";
const SERVER_URL = window.location.protocol+"//"+window.location.hostname+":"+port+"/api";
export default {SERVER_URL,SERVER_URL_FILESTORAGE}

// import CONST from '../common/constants'; 