#!/bin/bash

# Replace these variables with your actual database credentials
DATABASE_NAME='dice'
DATABASE_USER='dice'

# Run the fixtures.sql script
psql -d "$DATABASE_NAME" -U "$DATABASE_USER" -f scripts/fixtures.sql
