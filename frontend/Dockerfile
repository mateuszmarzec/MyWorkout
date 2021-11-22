FROM node:17.1-buster-slim AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci


FROM deps AS builder

COPY . .
RUN npm run build


FROM deps AS local

ARG PORT
COPY . .
CMD npm run dev -p ${PORT}


FROM node:17.1-buster-slim AS production

WORKDIR /app

ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next-i18next.config.js ./next-i18next.config.js
COPY --from=builder /app/next.config.js ./next.config.js

ENTRYPOINT npm start
