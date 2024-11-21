# Use Node.js image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app
RUN npm run build

# Expose port 3000 to access the React application
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
