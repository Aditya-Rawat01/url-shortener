import { Redis } from "@upstash/redis";


// Use global variable to persist the client across hot reloads
declare global {
  var redisClient: Redis | undefined;
}

export function getRedisClient() {
  if (global.redisClient) {
    return global.redisClient;
  }
  
  console.log("should reach here only one time.");
  global.redisClient = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN
  });
  
  return global.redisClient;
}

// Initialize only once
export const redis = getRedisClient();