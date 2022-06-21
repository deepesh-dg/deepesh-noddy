# Noddy Framework

A nodejs framework on the top of express for building apis and web base software too. slowly evolving technology. Noddy is meant for those developers who wants to get rid of scratch code and want handled every side thing by software and just want to develop backend.

## Installation

Run Following Command

```bash
$ npx @deepeshgupta/noddy-proj app_name
```

## Configuration

Create _./.env_ at the root of your project and copy and paste following :-

```
# Mongo DB
MONGODB_AUTH_URL="mongodb://mongo:27017/db_name"

# Node Env
NODE_ENV='development'
PORT=5500
TZ="Europe/London"

# here you can setup your own environment variables

# Server Env
DEBUG='app:*,core:*,www:*,test:*'

# Mail Config
MAIL_SERVICE="Gmail"
MAIL_NAME="Noddy"
MAIL_EMAILID="mail@example.com"
MAIL_USERNAME="mail@example.com"
MAIL_PASSWORD="password"
MAIL_SECURE="on"
```

run below command for docker

```node
$ docker-compose up -d --build
```

run below command for local

```node
$ npm run dev
```

### Boom, You are good to go...

---

## ![Deepesh Gupta](https://rewards.brave.com/vhq0pr1kd2jpv78gi1b802q8g330)

Developed By - _Deepesh Gupta_

---

## License

[MIT](https://choosealicense.com/licenses/mit/)
