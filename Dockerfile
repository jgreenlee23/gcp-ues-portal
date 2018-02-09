FROM node:carbon
WORKDIR /home/jgreenlee25/Documents/Masergy/gcp-ues-portal/

# INSTRUCTIONS:
# sudo docker run -d -p 80:80 --name webserver nginx
# sudo docker build -t gcr.io/soteria-portal/gcp-ues-portal:v1 .
# sudo docker run --rm -p 8080:8080 gcr.io/soteria-portal/gcp-ues-portal:v1

# Install app dependencies
COPY package*.json ./
COPY .angular-cli.json ./

RUN npm install

# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]