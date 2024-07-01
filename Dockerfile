FROM node:18-alpine

USER node

WORKDIR /app

COPY --chown=node:node . .

RUN yarn

# Reset local data from .nx
RUN yarn nx reset

RUN yarn build:backend

CMD [ "yarn", "nx", "run", "backend:production" ]