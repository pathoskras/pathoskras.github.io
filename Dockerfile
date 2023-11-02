FROM frostickle/thalia:1.0.1 as base

ENV DISTRO=alpine
USER root

WORKDIR /usr/app/Thalia/websites

ADD https://api.github.com/repos/pathoskras/pathoskras.github.io/git/refs/heads/main kras_version.json
RUN git clone --depth=1 https://github.com/pathoskras/pathoskras.github.io.git kras

WORKDIR /usr/app/Thalia/websites/kras
RUN pnpm install --ignore-scripts --prod

WORKDIR /usr/app/Thalia

RUN pnpm add pg
RUN pnpm add puppeteer --ignore-scripts

COPY . websites/kras

USER root
RUN chown -R chrome:chrome /usr/app/Thalia/websites/kras/data/pdfs
RUN chmod 755 /usr/app/Thalia/websites/kras/data/pdfs

COPY small_config.json /usr/app/Thalia/websites/kras/config/config.json

USER chrome

CMD ["/usr/app/Thalia/start.sh", "kras"]
