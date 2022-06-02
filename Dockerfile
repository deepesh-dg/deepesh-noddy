FROM node:16-alpine3.14

WORKDIR /app
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

COPY . ./

# RUN npm install pm2 -g

CMD ["npm", "start"]