@echo off
start cmd /k python backend/server.py
cd frontend
npm run start
