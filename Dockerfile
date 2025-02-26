# Use official Node.js 20 image
FROM node:20

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:dev"]
