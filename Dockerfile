FROM hmctspublic.azurecr.io/base/node:20-alpine as base
USER root
RUN corepack enable
USER hmcts
COPY --chown=hmcts:hmcts package.json yarn.lock ./
COPY /definitions/private-law/xlsx /
ADD ./config "/config"
RUN yarn install && yarn cache clean
COPY index.js ./
ENV NODE_CONFIG_DIR="/config"
CMD ["yarn", "start"]
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=15s --start-period=60s --retries=3 \
    CMD wget -q --spider localhost:3000/health || exit 1
