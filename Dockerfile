# Build package
FROM node:alpine AS builder

# Set the app source code directory
WORKDIR /app

# Copy the source code to WORKDIR
COPY . .

# Install dependencies
RUN npm install

# Build the package
RUN npm run build

# Run the container
FROM nginx:alpine

# Copy the built version
COPY --from=builder /app/build /usr/share/nginx/html

# Apply the config
COPY nginx.conf /etc/nginx/nginx.conf

# Open port 8080
EXPOSE 8080

# Start the frontend
CMD ["nginx", "-g", "daemon off;"]