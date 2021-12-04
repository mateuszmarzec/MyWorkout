FROM node:17.1-buster-slim AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci


FROM deps AS builder

ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=${NEXT_PUBLIC_GOOGLE_CLIENT_ID}

ARG NEXT_PUBLIC_FACEBOOK_APP_ID
ENV NEXT_PUBLIC_FACEBOOK_APP_ID=${NEXT_PUBLIC_FACEBOOK_APP_ID}

COPY . .
RUN npm run build


FROM deps AS local

ARG PORT
COPY . .
CMD npm run dev -p ${PORT}


FROM builder AS production

ENTRYPOINT npm start
