# Base image
FROM node

#Working directory
WORKDIR /app

# Copy files
COPY . /app

#Install dependencies
RUN npm install

#Command to run the application
CMD ["node", "app.mjs"]
