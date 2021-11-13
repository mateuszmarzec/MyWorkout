FROM node:17.1-buster-slim AS deps

COPY package.json package-lock.json ./
RUN npm ci


FROM node:17.1-buster-slim AS builder

WORKDIR /app
COPY . .
COPY --from=deps node_modules ./node_modules
RUN npm run build


FROM node:17.1-buster-slim AS local

WORKDIR /app
COPY . .
COPY --from=deps node_modules ./node_modules
CMD npm run build


FROM node:17.1-buster-slim AS production

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

CMD npm start
