#!/bin/bash

cd client || exit
npm run dev &
CLIENT_PID=$!

cd ../server || exit
npm run dev &
SERVER_PID=$!

wait $CLIENT_PID
wait $SERVER_PID
