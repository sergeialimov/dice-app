ARG NODE_VERSION=20.9.0
# Stage 1: Build the application
From node:${NODE_VERSION} as build

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --immutable

COPY . .


# RUN yarn build
RUN yarn build && ls -al /usr/src/app/dist



# Stage 2: Setup the runtime env
From node:${NODE_VERSION}

WORKDIR /usr/src/app

# Only copy over the Node pieces we need from the above image
# This keeps the image size down as we don't need the full
# source and build artifacts in our final image.

# COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/dist/apps/dice ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "dist/main"]
