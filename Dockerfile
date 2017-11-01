# Dockerfile to create a docker image
FROM node

# Add files to the image
RUN mkdir -p /opt/nodejs
ADD . /opt/nodejs
WORKDIR /opt/nodejs

# Expose the container port
EXPOSE 80

ENV NODE_ENV=production

ENTRYPOINT ["node", "app.js"]