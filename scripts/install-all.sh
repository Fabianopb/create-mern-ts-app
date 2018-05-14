#!/usr/bin/env bash

cd backend/
echo "installing backend packages..."
yarn install

cd ../frontend
echo "installing frontend packages..."
yarn install
