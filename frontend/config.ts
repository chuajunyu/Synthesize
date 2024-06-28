import * as dotenv from "dotenv";

dotenv.config();

export const MOCK_USER = process.env.NEXT_PUBLIC_MOCK_USER_EMAIL;

export const LOCAL = process.env.NEXT_PUBLIC_NODE_ENV == "local";
export const DEVELOPMENT = process.env.NEXT_PUBLIC_NODE_ENV == "development";
export const PRODUCTION = process.env.NEXT_PUBLIC_NODE_ENV == "production";

let authDomain = "synthesize-dev.firebaseapp.com";
if (LOCAL) {
    console.log("Local Development mode");
} else if (DEVELOPMENT) {
    console.log("Development mode");
    authDomain = "synthesize-git-develop-jun-yus-projects.vercel.app";  
} else if (PRODUCTION) {
    console.log("Production mode");
    authDomain = "synthesize-two.vercel.app";
}

export { authDomain };
