FROM node:12.16.2-alpine3.11
RUN npm install --no-progress -g http-server
COPY ./dist/ .
ENTRYPOINT ["http-server", "./SeStories", "--port", "8080", "--proxy", "http://localhost:8080?"]
