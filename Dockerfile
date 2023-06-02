FROM zenika/alpine-chrome:with-node as base

ENV DISTRO=alpine
USER root

RUN apk upgrade

RUN npm install -g typescript

WORKDIR /usr/app
RUN git clone https://github.com/david-ma/Thalia.git
WORKDIR /usr/app/Thalia
RUN yarn install --ignore-scripts

WORKDIR /usr/app/Thalia/websites

RUN git clone https://github.com/pathoskras/pathoskras.github.io.git kras
WORKDIR /usr/app/Thalia/websites/kras
RUN yarn install --ignore-scripts


WORKDIR /usr/app/Thalia
COPY . websites/kras

# RUN yarn add sqlite3
RUN yarn add pg

ENV NODE_ENV=postgres
COPY small_config.json /usr/app/Thalia/websites/kras/config/config.json
EXPOSE 1337

USER chrome

CMD ["/usr/app/Thalia/start.sh", "kras"]
