#!/bin/bash

echo "⏳ Waiting for MongoDB to be ready..."
until mongosh --eval "db.adminCommand('ping')" >/dev/null 2>&1; do
  sleep 2
done

echo "✅ MongoDB is up. Checking replica set status..."

IS_RS_INIT=$(mongosh --quiet --eval "try { rs.status().ok } catch (e) { 0 }")

if [ "$IS_RS_INIT" != "1" ]; then
  echo "🔄 Initializing MongoDB replica set..."
  mongosh --eval "rs.initiate({
    _id: 'rs0',
    members: [{ _id: 0, host: 'mongodb:27017' }]
  })"
  echo "✅ Replica set initialized successfully!"
else
  echo "✅ Replica set already initialized."
fi
