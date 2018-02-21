FROM node:8

ENV HOME=/home/app

EXPOSE 8080

RUN useradd --user-group --create-home --shell /bin/false app

RUN npm install -g http-server

COPY . $HOME

CMD ["sh", "-c", "http-server ${HOME}"]

