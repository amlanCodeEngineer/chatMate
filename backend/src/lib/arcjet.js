import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
import { ENV } from "./env.js";

const aj = arcjet({
  key: ENV.ARCJET_KEY,
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),
    
    // Create a bot detection rule
    detectBot({
      // Local development e DRY_RUN thakbe (shudhu log korbe, block korbe na)
      // Production e gele automatically LIVE hoye jabe
      mode: ENV.NODE_ENV === "development" ? "DRY_RUN" : "LIVE", 
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
      ],
    }),
    
    // Create a token bucket rate limit. Other algorithms are supported.
    slidingWindow({
      mode: "LIVE", 
      max: 100,
      interval: 60,
    }),
  ],
});

export default aj;