# FEATURES

  ## Auth

    ✅            Change Password ➜ Auth.js + Prisma + Zod + bcrypt/bcryptjs + React Hook Form + Shadcn/UI
    ✅         Email Verification ➜ Auth.js + Prisma + Resend + Neon + UUID + Zod
    ✅                OAuth Login ➜ Google Cloud + Azure + Auth.js + Prisma + Shadcn/UI
    ✅           Recover Password ➜ Auth.js + Prisma + Resend + Neon + UUID + Zod + React Hook Form + Shadcn/UI
    ✅                    Sign In ➜ Auth.js + Prisma + bcrypt/bcryptjs + Zod + React Hook Form + Shadcn/UI
    ✅                   Sign Out ➜ Auth.js + Shadcn/UI
    ✅                    Sign Up ➜ Auth.js + Prisma + bcrypt/bcryptjs + Resend + UUID + Zod + React Hook Form + Shadcn/UI
    🚧      Two-Factor Auth (2FA) ➜ Auth.js + Prisma + UUID + Neon + OTP Library + Shadcn/UI

  ## Branding

    ✅          Reusable App Logo ➜ next/image

  ## Configuration

    ✅             Settings Panel ➜ Components + Buttons
    ✅             Settings Page  ➜ Auth.js + Prisma + Zod + bcrypt/bcryptjs + React Hook Form + Shadcn/UI

  ## Data

    ✅            Data Validation ➜ Zod
    ✅        Database Management ➜ Prisma

  ## E-commerce

    🚧            Online Payments ➜ Not planned yet
    🚧              Shopping Cart ➜ Partner API
    ✅                Partner API ➜ Zod

  ## Feeds

    🚧            Comment Content ➜ Not planned yet
    ✅               Post Content ➜ API RESTful + Postgresql + Cloudinary
    🚧               Rate Content ➜ Not planned yet
    🚧          Recommend Content ➜ Not planned yet
    🚧              Share Content ➜ Not planned yet
    🚧             Update Content ➜ Not planned yet

  ## Languages

    ✅      Interface Translation ➜ next-intl
    ✅            Change Language ➜ next-intl

  ## Messages

    🚧     Activity Notifications ➜ Not planned yet
    🚧        Email Notifications ➜ Not planned yet
    🚧             Real-Time Chat ➜ Not planned yet

  ## Navigation

    ✅             Navigation Bar ➜ next/link
    ✅               Sidebar Menu ➜ next/link
    🚧         Text Search Engine ➜ Not planned yet
    🚧        Voice Search Engine ➜ Not planned yet

  ## Streaming

    🚧             Publish Shorts ➜ Not planned yet
    🚧                Stream LIVE ➜ Not planned yet

  ## Styles

    ✅       Active Route Styling ➜ next/navigation
    ✅           Stories Carousel ➜ Swiper
    ✅        Font Implementation ➜ next/font/google
    🚧           Responsive Pages ➜ Flexbox + Grid + @media
    ✅           Sound Animations ➜ new Audio('')

# DEPENDENCIES

  ## Auth.js

    📦                    Auth.js ➜ npm install next-auth@beta
    📦      AUTH_SECRET Generator ➜ npx auth secret

  ## Bcrypt

    📦           Encrypt Password ➜ npm install bcrypt
    📦               Bcrypt Types ➜ npm install --save-dev @types/bcrypt

  ## Bcryptjs

    📦           Encrypt Password ➜ npm i bcryptjs
    📦             Bcryptjs Types ➜ npm install --save-dev @types/bcryptjs

  ## Prisma

    📦                 Prisma CLI ➜ npm install prisma --save-dev
    📦             Prisma Queries ➜ npm install @prisma/client
    📦           Prisma + Auth.js ➜ npm install @auth/prisma-adapter

  ## React Hook Form

    📦            React-hook-form ➜ npm install react-hook-form

  ## React Icons

    📦                React-icons ➜ npm install react-icons --save

  ## Resend

    📦                     Resend ➜ npm install resend

  ## React Spinners

    📦             React Spinners ➜ npm i react-spinners

  ## Shadcn UI

    📦                  Shadcn/UI ➜ npx shadcn@latest init

  ## Swiper

    📦                     Swiper ➜ npm install swiper

  ## Tailwind CSS

    📦               Tailwind CSS ➜ npm install -D tailwindcss postcss autoprefixer
    📦      Generate Config Files ➜ npx tailwindcss init -p

  ## UUID

    📦                       UUID ➜ npm i uuid
    📦                 UUID Types ➜ npm i --save-dev @types/uuid

  ## Zod

    📦                        Zod ➜ npm install zod

# METHODOLOGIES

  ## Development

    🔄                      Agile ➜ Scrum

  ## Repository

    🔄                     GitHub ➜ Trunk Based Development

# ARCHITECTURES

  ## Frontend

    📁     Screaming Architecture ➜ Domain-driven Design (DDD)

# PRISMA

  ## Commands

    🕹️             Check database ➜ npx prisma studio
    🕹️ Synchronize prism & models ➜ npx prisma generate
    🕹️             Reset database ➜ npx prisma migrate reset
    🕹️                 Push model ➜ npx prisma db push
    🕹️            Apply migration ➜ npx prisma migrate dev

## 🎨 Estilos y Restricciones de Diseño

### 🎯 Tipografía

| Nivel de Énfasis | Color Hex | Clase Tailwind  |
|------------------|-----------|-----------------|
| Alto             | `#1b1a1f` | `font-semibold` |
| Medio            | `#26272c` | `font-medium`   |
| Bajo             | `#3b3b40` | `font-light`    |

### 🔵 Paleta de Componentes (Azul)

| Uso         | Color Hex |
|-------------|-----------|
| Blanco      | `#ffffff` |
| Fondo Claro | `#f0f4f9` |
| Azul Base   | `#1a73e8` |
| Azul Oscuro | `#174ea6` |

### 🟢 Paleta de SVG (Verde)

| Uso          | Color Hex |
|--------------|-----------|
| Verde Valido | `#22c55e` |

### 🔴 Paleta de SVG (Rojo)

| Uso         | Color Hex |
|-------------|-----------|
| Rojo Alerta | `#e45546` |
| Rojo Like   | `#932d30` |

### ⚫ Paleta de Separadores (Gris)

| Uso              | Color Hex   |
|------------------|-------------|
| Base             | `#b8b8bb`   |
| Transparente 10% | `#b8b8bb25` |
| Transparente 30% | `#b8b8bb50` |
