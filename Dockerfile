ARG LOGIN_API
ARG LOGIN_MICROSOFT
ARG LOGIN_CLIENT_ID
ARG LOGIN_REDIRECT_URI
ARG LOGIN_SCOPE
ARG JWT_SECRET
ARG HASURA_URL
ARG HASURA_SECRET
ARG API_URL

FROM node:16-alpine as dependencies
WORKDIR /sip
COPY package.json yarn.lock ./
RUN apk add --no-cache git openssh
RUN yarn install --frozen-lockfile

FROM node:16-alpine as builder
WORKDIR /sip
RUN echo 'LOGIN_API=$LOGIN_API.' > .env
RUN echo 'LOGIN_MICROSOFT=$LOGIN_MICROSOFT.' > .env
RUN echo 'LOGIN_CLIENT_ID=$LOGIN_CLIENT_ID.' > .env
RUN echo 'LOGIN_REDIRECT_URI=$LOGIN_REDIRECT_URI.' > .env
RUN echo 'LOGIN_SCOPE=$LOGIN_SCOPE.' > .env
RUN echo 'JWT_SECRET=$JWT_SECRET.' > .env
RUN echo 'HASURA_URL=$HASURA_URL.' > .env
RUN echo 'HASURA_SECRET=$HASURA_SECRET.' > .env
RUN echo 'API_URL=$API_URL.' > .env
COPY . .
COPY --from=dependencies /sip/node_modules ./node_modules
RUN yarn build

FROM node:16-alpine as runner
WORKDIR /sip
ENV NODE_ENV production
COPY --from=builder /sip/next.config.js ./
COPY --from=builder /sip/public ./public
COPY --from=builder /sip/.next ./.next
COPY --from=builder /sip/node_modules ./node_modules
COPY --from=builder /sip/package.json ./package.json
COPY --from=builder /sip/.env ./.env

EXPOSE 3000
CMD ["yarn", "start"]