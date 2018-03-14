# FROM node:carbon
# WORKDIR 
# 
# # INSTRUCTIONS:
# # sudo docker run -d -p 80:80 --name webserver nginx
# # sudo docker build -t gcr.io/soteria-portal/gcp-ues-portal:v1 .
# # sudo docker run --rm -p 8080:8080 gcr.io/soteria-portal/gcp-ues-portal:v1
# 
# # Install app dependencies
# COPY package*.json ./
# COPY .angular-cli.json ./
# 
# RUN npm install
# 
# # If you are building your code for production
# # RUN npm install --only=production
# 
# # Bundle app source
# COPY . .
# 
# EXPOSE 8080
# CMD [ "npm", "start" ]

# Stage 0
FROM node:8.9 as node

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY ./ /app/

ARG env=prod

RUN npm run build -- --prod --environment $env


# Stage 1

FROM nginx:1.13

COPY --from=node /app/dist/ /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf