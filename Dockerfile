
FROM node:alpine
WORKDIR /app
COPY . /app
RUN npm install
ENTRYPOINT ["npm","run","docker"]