FROM node:alpine
WORKDIR /app
COPY . /app
RUN npm install
# The "docker" build script is located in package.json
ENTRYPOINT ["npm","run","docker"]