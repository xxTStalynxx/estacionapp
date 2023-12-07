FROM node:18-bullseye
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 4000
CMD [ "npm", "start"]