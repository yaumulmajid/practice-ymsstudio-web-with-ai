# Multi-stage build. The image is built in GitHub Actions and pulled by the VPS,
# so the server never runs `next build`. No database is needed at build time.

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat

FROM base AS deps
WORKDIR /app
# .npmrc sets legacy-peer-deps, which the lock file was generated with.
COPY package.json package-lock.json .npmrc ./
RUN npm ci --no-audit --no-fund

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Placeholders so the Payload config loads during the build; real values come from .env at runtime.
RUN DATABASE_URL=postgres://build:build@localhost:5432/build PAYLOAD_SECRET=build-only \
    npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    MEDIA_DIR=/data/media

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs \
    && mkdir -p /data/media .next && chown -R nextjs:nodejs /data/media .next

# public/ also holds the images the first-run content migration imports into the CMS.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Output tracing copies sharp's .node file but not its libvips libraries: ship the full packages.
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/sharp ./node_modules/sharp
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@img ./node_modules/@img
# Never ship local env files or dev uploads that tracing may have picked up.
RUN rm -rf ./.env* ./media

USER nextjs
EXPOSE 3000
# Pending database migrations (schema + first-run content) are applied automatically on start.
CMD ["node", "server.js"]
