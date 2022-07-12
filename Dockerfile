FROM node:18-alpine

WORKDIR /srv/santex/site

COPY . .

RUN npm install

EXPOSE 3000

CMD ["sh start.sh"]