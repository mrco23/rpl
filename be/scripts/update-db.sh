#!/usr/bin/env bash
set -e

echo "[1/3] Generate Prisma Client"
npx prisma generate

echo "[2/3] Jalankan migration"
npx prisma migrate dev --name admin_cms_update

echo "[3/3] Optional seed"
# npx prisma db seed

echo "Selesai"
