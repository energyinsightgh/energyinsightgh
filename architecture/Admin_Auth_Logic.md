# SOP: Admin Authentication Logic
> **Governs**: All admin authentication, session management, and route protection.
> **Rule**: Update this SOP BEFORE changing any auth-related code.
> Last updated: 2026-03-24

---

## 1. Overview

The admin panel (`/admin/*`) is protected exclusively via **Supabase Auth** using server-side
session cookies. There is no public-facing registration or login link. The only way to access
the admin is via the direct URL `/admin/login`.

---

## 2. Auth Flow

```
Visitor navigates to /admin/anything
        │
        ▼
middleware.ts checks for valid Supabase session cookie
        │
   ┌────┴────┐
   │  Valid  │ → Allow request, render admin page
   └────┬────┘
        │
   ┌────┴────┐
   │ Invalid │ → Redirect to /admin/login
   └─────────┘

Admin submits email + password on /admin/login
        │
        ▼
supabase.auth.signInWithPassword({ email, password })
        │
   ┌────┴────┐
   │ Success │ → Session cookie set → redirect to /admin
   └────┬────┘
        │
   ┌────┴────┐
   │ Failure │ → Show error message, stay on /admin/login
   └─────────┘
```

---

## 3. Middleware Configuration

File: `src/middleware.ts`

```typescript
// Protects all /admin/* routes except /admin/login
// Uses @supabase/ssr createServerClient with cookie read/write
matcher: ['/admin/:path*']
```

Logic:
1. Create a Supabase server client from request cookies
2. Call `supabase.auth.getUser()` — this validates the JWT server-side
3. If no user → `NextResponse.redirect('/admin/login')`
4. If user exists → `NextResponse.next()` with refreshed cookie headers

**Critical**: Always use `getUser()` (not `getSession()`) in middleware — `getUser()` re-validates
the JWT with Supabase servers, preventing stale session attacks.

---

## 4. Server-Side Session in Route Handlers / Server Components

File: `src/lib/supabase/server.ts`

- Uses `createServerClient` from `@supabase/ssr`
- Reads and writes cookies via Next.js `cookies()` API
- Used in: Server Components, Route Handlers, Server Actions

---

## 5. Client-Side Session (Admin Browser Components)

File: `src/lib/supabase/client.ts`

- Uses `createBrowserClient` from `@supabase/ssr`
- Used in: Client Components within the admin panel only
- Never used in public-facing components

---

## 6. Admin Login Page

Route: `/admin/login`
File: `src/app/admin/login/page.tsx`

- Simple email + password form
- Calls `supabase.auth.signInWithPassword` via Server Action
- On success: redirects to `/admin`
- **Not linked from public navigation — ever**

---

## 7. Sign Out

- Admin layout includes a "Sign Out" button
- Calls `supabase.auth.signOut()` via Server Action
- Redirects to `/admin/login` after sign out

---

## 8. Admin User Setup (One-Time)

Admin users are created directly in the Supabase Dashboard:
1. Supabase Dashboard → Authentication → Users → Add User
2. Set email + strong password
3. No public registration route exists or will ever exist

---

## 9. Security Rules

- Row Level Security (RLS) enabled on `blog_posts` and `services` tables
- Admin operations use the `service_role` key (server-side only, never exposed to browser)
- Public reads use the `anon` key with RLS policies allowing SELECT on `is_active = true` / `status = 'published'`

---

## Change Log
| Date | Change | Reason |
|---|---|---|
| 2026-03-24 | Initial SOP created | Protocol 0 initialization |
