FROM node:14-alpine as base

# Retrieve and relate to the `NPM_TOKEN` environment variable
ARG DG_API_KEY
ARG DG_ORGANIZATION_ID
ARG DG_API_URL
ARG SHOPPER_API_URL
ARG DEFAULT_STORE_ID

ARG CLUSTER
ARG BUILD_DATE
ARG BUILD_NUMBER
ARG BUILD_IMAGE
ARG LOOKUP_COUNTRY_CODE
ARG BRAND_THEME
ARG GOOGLE_TAG_MANAGER_KEY
ARG GOOGLE_MAP_KEY
ARG FACEBOOK_DOMAIN_VERIFICATION
ARG SITE_URL

ARG NEXTAUTH_URL
ARG AUTH_TENANT_NAME
ARG AUTH_TENANT_ID
ARG AUTH_CLIENT_ID
ARG AUTH_CLIENT_SECRET
ARG AUTH_LOGIN_FLOW

ARG AUTH_PROFILE_EDIT_URL
ARG AUTH_PASSWORD_RESET_URL



WORKDIR /usr/src
RUN echo -e "BUILD_IMAGE=$BUILD_IMAGE\nCLUSTER=$CLUSTER\nDG_API_KEY=$DG_API_KEY\nDG_ORGANIZATION_ID=$DG_ORGANIZATION_ID\nDG_API_URL=$DG_API_URL\nSHOPPER_API_URL=$SHOPPER_API_URL\nDEFAULT_STORE_ID=$DEFAULT_STORE_ID\nGOOGLE_TAG_MANAGER_KEY=$GOOGLE_TAG_MANAGER_KEY\nGOOGLE_MAP_KEY=$GOOGLE_MAP_KEY\nFACEBOOK_DOMAIN_VERIFICATION=$FACEBOOK_DOMAIN_VERIFICATION\nLOOKUP_COUNTRY_CODE=$LOOKUP_COUNTRY_CODE\nBRAND_THEME=$BRAND_THEME\nBUILD_DATE=$BUILD_DATE\nBUILD_NUMBER=$BUILD_NUMBER\nSITE_URL=$SITE_URL\nNEXTAUTH_URL=$NEXTAUTH_URL\nAUTH_TENANT_NAME=$AUTH_TENANT_NAME\nAUTH_TENANT_ID=$AUTH_TENANT_ID\nAUTH_CLIENT_ID=$AUTH_CLIENT_ID\nAUTH_CLIENT_SECRET=$AUTH_CLIENT_SECRET\nAUTH_LOGIN_FLOW=$AUTH_LOGIN_FLOW\nAUTH_PROFILE_EDIT_URL=$AUTH_PROFILE_EDIT_URL\nAUTH_PASSWORD_RESET_URL=$AUTH_PASSWORD_RESET_URL\n" >> ./.env
COPY package.json /usr/src/
COPY yarn.lock /usr/src/

RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build:production

FROM node:14-alpine
WORKDIR /usr/src
ENV NODE_ENV="production"
COPY --from=base /usr/src .
EXPOSE 3000
CMD [ "yarn", "start" ]
