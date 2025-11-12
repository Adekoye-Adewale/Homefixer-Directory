import { redis } from "@/lib/redis"

export default async function redisRateLimit(ip: string, limit = 10, windowSec = 60) {
        const key = `rate_limit:${ip}`;
        const current = await redis.incr(key);

        if (current === 1) {
                // set TTL for the first request
                await redis.expire(key, windowSec);
        }

        const remaining = Math.max(0, limit - current);
        const ok = current <= limit;
        return { ok, remaining };
}