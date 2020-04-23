FROM node:lts as builder
COPY . /app
WORKDIR /app
RUN npm install && npm run build --prod

FROM alpine:3.11
COPY --from=builder /app/dist .
RUN apk add --update nodejs npm
RUN npm install -g http-server
EXPOSE 8080
ENTRYPOINT ["http-server", "/SeStories", "--proxy", "http://localhost:8080?"]
