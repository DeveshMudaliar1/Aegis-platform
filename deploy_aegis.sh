#!/bin/bash
set -e 

PROJECT_ID=$(gcloud config get-value project)
REGION="us-central1"

echo " Deploying Clean Backend..."
gcloud run deploy aegis-backend \
  --source ./backend \
  --region $REGION \
  --allow-unauthenticated \
  --memory 512Mi \
  --set-env-vars DEMO_MODE=True,GCP_PROJECT=$PROJECT_ID \
  --quiet

echo " Linking Frontend..."
BACKEND_URL=$(gcloud run services describe aegis-backend --region $REGION --format 'value(status.url)')

gcloud run deploy aegis-frontend \
  --source ./frontend \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars VITE_API_URL=$BACKEND_URL,VITE_USE_MOCK=false \
  --quiet

echo " DEPLOYMENT COMPLETE"
echo "URL: $(gcloud run services describe aegis-frontend --region $REGION --format 'value(status.url)')"