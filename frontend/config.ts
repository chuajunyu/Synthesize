import * as dotenv from "dotenv";

dotenv.config();
console.log(process.env.REACT_APP_NODE_ENV)
export const LOCAL = process.env.NEXT_PUBLIC_NODE_ENV == "local";
export const DEVELOPMENT = process.env.NEXT_PUBLIC_NODE_ENV == "development";
export const PRODUCTION = process.env.NEXT_PUBLIC_NODE_ENV == "production";

let authDomain = "synthesize-dev.firebaseapp.com";
console.log('test')
if (LOCAL) {
    console.log(LOCAL, DEVELOPMENT, PRODUCTION)
    console.log("Local Development mode");
} else if (DEVELOPMENT) {
    console.log("Development mode");
    authDomain = "synthesize-git-develop-jun-yus-projects.vercel.app";  
} else if (PRODUCTION) {
    console.log("Production mode");
    authDomain = "synthesize-two.vercel.app";
}

export { authDomain }; // Add the missing assignment statement
