FROM node:17.1-buster-slim AS deps

COPY package.json package-lock.json ./
RUN npm ci


FROM node:17.1-buster-slim AS builder

WORKDIR /app
COPY . .
COPY --from=deps node_modules ./node_modules
RUN npm run build


FROM node:17.1-buster-slim AS local

ARG PORT
WORKDIR /app
COPY . .
COPY --from=deps node_modules ./node_modules
CMD npm run dev -- -p ${PORT}


FROM node:17.1-buster-slim AS production

ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENTRYPOINT npm start
