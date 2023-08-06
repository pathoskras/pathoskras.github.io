FROM zenika/alpine-chrome:with-puppeteer as base

ENV DISTRO=alpine
USER root
RUN apk update
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

RUN yarn add pg
RUN yarn add puppeteer --ignore-scripts

COPY . websites/kras

USER root
RUN chown -R chrome:chrome /usr/app/Thalia/websites/kras/data/pdfs
RUN chmod 755 /usr/app/Thalia/websites/kras/data/pdfs

COPY small_config.json /usr/app/Thalia/websites/kras/config/config.json

USER chrome

CMD ["/usr/app/Thalia/start.sh", "kras"]
