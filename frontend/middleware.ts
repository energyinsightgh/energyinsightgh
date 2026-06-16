import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // CRITICAL: Use getUser() not getSession() — re-validates JWT server-side
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin-login'
  const isLoginPage = request.nextUrl.pathname === '/admin-login'

  // Not logged in → trying to access /admin/* → redirect to login
  if (!user && isAdminRoute) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/admin-login'
    const redirectResponse = NextResponse.redirect(loginUrl)
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, {
        path: cookie.path,
        domain: cookie.domain,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        maxAge: cookie.maxAge,
        expires: cookie.expires,
        sameSite: cookie.sameSite,
      })
    })
    return redirectResponse
  }

  // Already logged in → trying to access login page → redirect to admin dashboard
  if (user && isLoginPage) {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = '/admin'
    const redirectResponse = NextResponse.redirect(dashboardUrl)
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, {
        path: cookie.path,
        domain: cookie.domain,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        maxAge: cookie.maxAge,
        expires: cookie.expires,
        sameSite: cookie.sameSite,
      })
    })
    return redirectResponse
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/admin-login',
  ],
}
