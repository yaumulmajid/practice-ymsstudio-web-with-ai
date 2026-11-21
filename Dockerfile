# Multi-stage build. The image is built in GitHub Actions and pulled by the VPS,
# so the server never runs `next build`.

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Public (non-secret) CMS setting, inlined into the admin UI at build time.
ARG NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=""
ENV NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=$NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG     NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs \
    && mkdir .next && chown nextjs:nodejs .next

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Output tracing copies sharp's .node file but not its libvips libraries: ship the full packages.
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/sharp ./node_modules/sharp
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@img ./node_modules/@img
RUN rm -rf ./.env*

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
