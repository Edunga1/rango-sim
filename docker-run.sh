#!/bin/bash
docker container rm --force durango-simulator;
docker build -t durango-simulator . &&
docker run --rm -p 8090:8080 -d --name durango-simulator durango-simulator
