import { tweetsData } from "./data.js";

console.log(tweetsData);

tweetsData.forEach(tweet => {
    console.log(tweet.handle);
});