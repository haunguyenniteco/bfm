#!/usr/bin/env bash

WEBHOOK_TAG=0.0.13
TAG=0.1.$CIRCLE_BUILD_NUM
SERVICE_NAME=$1
CLUSTER=$2
TOKEN=$3
CLUSTER_NAME=$4

APP=$SERVICE_NAME-$CLUSTER

docker run -e TOKEN=$TOKEN -e APP=$APP -e TAG=$TAG -e CLUSTER_NAME=$CLUSTER_NAME registry.foodieservices.com/docker-keel-webhook:$WEBHOOK_TAG