#!/usr/bin/env bash

cd backend/
echo "building backend..."
yarn build

cd ../frontend
echo "building frontend..."
yarn build
