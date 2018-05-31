#!/usr/bin/env bash

# script starts here
cd backend/

echo "testing backend..."
yarn test

cd ../frontend

echo "testing frontend..."
yarn test
