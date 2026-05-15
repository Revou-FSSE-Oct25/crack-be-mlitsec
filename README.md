# Barbershop Booking System Backend

Backend sederhana untuk final project CRACK: sistem booking barbershop.

## Tech Stack

- NestJS
- TypeScript
- Prisma
- PostgreSQL
- JWT Authentication
- Swagger

## Fitur MVP

- Register dan login user
- JWT authentication
- Role customer dan admin
- Customer melihat services dan barbers
- Customer membuat booking
- Customer melihat booking miliknya
- Admin CRUD services
- Admin CRUD barbers
- Admin melihat semua booking
- Admin mengubah status booking

## Setup Project

### 1. Install Dependency

```bash
npm install
```

### 2. Setup Database

Buat database PostgreSQL dengan nama:

```txt
crack_barbershop
```

Lalu buat file `.env` dari `.env.example`.

Contoh isi `.env`:

```env
DATABASE_URL="postgresql://postgres:your_postgres_password@localhost:5432/crack_barbershop?schema=public"
JWT_SECRET="change-this-secret"
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

Ganti `your_postgres_password` dengan password PostgreSQL lokal kamu.

### 3. Jalankan Prisma Migration

```bash
npm run prisma:migrate
```

Migration akan membuat tabel:

- `User`
- `Service`
- `Barber`
- `Booking`
- `_prisma_migrations`

### 4. Jalankan Seed Data

```bash
npm run prisma:seed
```

Command ini juga bisa dijalankan dengan alias:

```bash
npm run seed
```

Seed akan membuat:

- Admin user
- Beberapa service
- Beberapa barber

Akun admin:

```txt
email: admin@barbershop.com
password: admin123
```

### 5. Jalankan Server

```bash
npm run start:dev
```

Server berjalan di:

```txt
http://localhost:3001
```

### 6. Buka Swagger

```txt
http://localhost:3001/api/docs
```

## Alur Testing di Swagger

### Customer

1. Register lewat `POST /auth/register`.
2. Login lewat `POST /auth/login`.
3. Copy `accessToken`.
4. Klik tombol `Authorize` di Swagger.
5. Isi dengan format:

```txt
Bearer accessToken_kamu
```

Endpoint customer:

- `GET /services`
- `GET /barbers`
- `POST /bookings`
- `GET /bookings/my-bookings`

### Admin

Login memakai akun seed:

```txt
email: admin@barbershop.com
password: admin123
```

Endpoint admin:

- `POST /services`
- `PATCH /services/:id`
- `DELETE /services/:id`
- `POST /barbers`
- `PATCH /barbers/:id`
- `DELETE /barbers/:id`
- `GET /bookings`
- `PATCH /bookings/:id/status`

## Catatan Untuk Frontend

CORS membaca `FRONTEND_URL`, jadi isi dengan URL frontend lokal atau URL Vercel.

Base URL backend:

```txt
http://localhost:3001
```

Untuk endpoint yang membutuhkan login, kirim header:

```txt
Authorization: Bearer accessToken_kamu
```

## Error Response

Backend mengembalikan error sederhana agar mudah dibaca frontend.

Contoh:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Data yang dikirim belum sesuai",
  "errors": ["Format email tidak valid"]
}
```

## Deploy ke Railway

1. Push project ke GitHub.
2. Buat project baru di Railway dari repository GitHub.
3. Pilih root directory:

```txt
crack-be-mlitsec
```

4. Tambahkan PostgreSQL di Railway atau gunakan database PostgreSQL lain.
5. Isi environment variables:

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="isi-dengan-secret-yang-panjang"
FRONTEND_URL="https://frontend-kamu.vercel.app"
```

6. Set command:

```txt
Build Command: npm install && npm run build
Start Command: npm run start:railway
```

7. Setelah backend aktif, jalankan seed sekali dari Railway shell:

```bash
npm run seed
```

Swagger production tersedia di:

```txt
https://backend-kamu.up.railway.app/api/docs
```
