# Use the official Nginx image from the Docker Hub
FROM nginx:alpine

# Copy custom configuration file from the current directory
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the application files
COPY src /usr/share/nginx/html