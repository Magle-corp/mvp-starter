FROM node:18-alpine

# Set working directory.
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH.
ENV PATH /app/node_modules/.bin:$PATH

# Add docker-compose-wait tool
ARG WAIT_VERSION
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/${WAIT_VERSION}/wait /wait
RUN chmod +x /wait

# Build app.
CMD /wait && yarn install && yarn install --dev && yarn build && yarn dev