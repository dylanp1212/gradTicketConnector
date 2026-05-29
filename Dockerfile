FROM node:25-alpine
RUN apk add --no-cache nginx
EXPOSE 3001

WORKDIR /home/app

COPY package.json /home/app/
COPY App/package.json /home/app/App/
COPY AuthService/package.json /home/app/AuthService/
COPY ListingMS/package.json /home/app/ListingMS/
COPY MessageMS/package.json /home/app/MessageMS/

RUN npm run cis

COPY .env /home/app/
COPY App/.next/ /home/app/App/.next/
COPY App/next.config.ts /home/app/App/
COPY App/public/ /home/app/App/public/
COPY AuthService/dist/ /home/app/AuthService/dist/
COPY ListingMS/build/ /home/app/ListingMS/build/
COPY MessageMS/build/ /home/app/MessageMS/build/

COPY nginx.conf /etc/nginx/nginx.conf

CMD ["npm", "run", "start-container"]
