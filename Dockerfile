FROM node:22-alpine

RUN apk --no-cache add ca-certificates postgresql

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["yarn", "start:dev"]

