FROM node:16-alpine as dependencies
WORKDIR /sip
COPY package.json yarn.lock ./
RUN apk add --no-cache git openssh
RUN yarn install --frozen-lockfile

FROM node:16-alpine as builder
WORKDIR /sip
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

EXPOSE 3000
CMD ["yarn", "start"]