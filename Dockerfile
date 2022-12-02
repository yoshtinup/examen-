FROM node:16-alpine as dependencies
WORKDIR /sip
COPY package.json yarn.lock ./
RUN apk add --no-cache git openssh
RUN yarn install --frozen-lockfile

FROM node:16-alpine as builder
WORKDIR /sip
ARG LOGIN_API
ARG LOGIN_MICROSOFT
ARG LOGIN_CLIENT_ID
ARG LOGIN_SCOPE
ARG LOGIN_REDIRECT_URI
ARG LOGIN_GRANT_TYPE
ARG LOGIN_CLIENT_SECRET
ARG JWT_SECRET
ARG HASURA_URL
ARG HASURA_SECRET
ARG API_URL
RUN printf 'LOGIN_API='$LOGIN_API'\n\
  LOGIN_MICROSOFT='$LOGIN_MICROSOFT'\n\
  LOGIN_CLIENT_ID='${LOGIN_CLIENT_ID}'\n\
  LOGIN_SCOPE='${LOGIN_SCOPE}'\n\
  LOGIN_REDIRECT_URI='${LOGIN_REDIRECT_URI}'\n\
  LOGIN_GRANT_TYPE='${LOGIN_GRANT_TYPE}'\n\
  LOGIN_CLIENT_SECRET='${LOGIN_CLIENT_SECRET}'\n\
  JWT_SECRET='${JWT_SECRET}'\n\
  HASURA_URL='${HASURA_URL}'\n\
  HASURA_SECRET='${HASURA_SECRET}'\n\
  API_URL='${API_URL} > .env
COPY . .
COPY --from=dependencies /sip/node_modules ./node_modules
RUN yarn build

FROM node:16-alpine as runner
WORKDIR /sip
#ENV NODE_ENV production
COPY --from=builder /sip/next.config.js ./
COPY --from=builder /sip/public ./public
COPY --from=builder /sip/.next ./.next
COPY --from=builder /sip/node_modules ./node_modules
COPY --from=builder /sip/package.json ./package.json
COPY --from=builder /sip/.env ./.env

EXPOSE 3000
CMD ["yarn", "start"]
