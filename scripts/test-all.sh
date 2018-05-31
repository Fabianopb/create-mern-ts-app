#!/usr/bin/env bash

cd backend/
echo "testing backend..."
yarn test

cd ../frontend
echo "testing frontend..."
yarn test
