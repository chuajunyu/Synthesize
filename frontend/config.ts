import * as dotenv from "dotenv";

dotenv.config();

export const LOCAL_DEVELOPMENT = process.env.NODE_ENV === "test";
export const DEVELOPMENT = process.env.NODE_ENV === "development";
export const PRODUCTION = process.env.NODE_ENV === "production";

let authDomain = "synthesize-dev.firebaseapp.com";
if (DEVELOPMENT) {
    console.log("Development mode");
    authDomain = "synthesize-git-develop-jun-yus-projects.vercel.app";
} else if (PRODUCTION) {
    console.log("Production mode");
    authDomain = "synthesize-two.vercel.app";
} else {
    console.log("Local mode");
    
}

export { authDomain }; // Add the missing assignment statement
