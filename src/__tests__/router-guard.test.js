/**
 * 路由守卫测试
 *
 * 四种守卫逻辑：登录/引导/出纳锁定/激活
 */

import { describe, it, expect, beforeEach } from 'vitest'

// ─── 路由守卫逻辑（与 router/index.js 一致，解耦 isActivated） ───
function guard(to, _, isActivatedFn) {
  const isLoggedIn = localStorage.getItem('jd_logged_in')
  const onboardingDone = localStorage.getItem('jd_onboarding_complete')
  const CASHIER_LOCKED = true

  if (to.name !== 'Login' && !isLoggedIn) {
    return { redirect: 'Login' }
  }
  if (isLoggedIn && !onboardingDone && to.name !== 'Onboarding') {
    return { redirect: 'Onboarding' }
  }
  if (to.name === 'Onboarding' && onboardingDone) {
    return { redirect: '/dashboard' }
  }
  if (CASHIER_LOCKED && to.path.includes('/accounting/cashier')) {
    return { redirect: '/dashboard' }
  }
  if (to.name !== 'Login' && to.name !== 'Onboarding' && !isActivatedFn()) {
    if (to.path !== '/dashboard' && to.path !== '/login') {
      return { redirect: '/dashboard' }
    }
  }
  return { next: true }
}

describe('路由守卫 - 登录检查', () => {
  beforeEach(() => localStorage.clear())

  it('未登录访问 dashboard → 重定向登录', () => {
    expect(guard({ name: 'Dashboard', path: '/dashboard' }, null, () => true).redirect).toBe('Login')
  })
  it('未登录访问科目表 → 重定向登录', () => {
    expect(guard({ name: 'SubjectList', path: '/accounting/subjects' }, null, () => true).redirect).toBe('Login')
  })
  it('未登录访问登录页 → 放行', () => {
    expect(guard({ name: 'Login', path: '/login' }, null, () => true).next).toBe(true)
  })
  it('已登录访问 dashboard → 放行', () => {
    localStorage.setItem('jd_logged_in', 'true')
    localStorage.setItem('jd_onboarding_complete', 'true')
    expect(guard({ name: 'Dashboard', path: '/dashboard' }, null, () => true).next).toBe(true)
  })
})

describe('路由守卫 - 新手引导', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem('jd_logged_in', 'true')
  })

  it('引导未完成访问 dashboard → 重定向引导', () => {
    expect(guard({ name: 'Dashboard', path: '/dashboard' }, null, () => true).redirect).toBe('Onboarding')
  })
  it('引导未完成访问引导页 → 放行', () => {
    expect(guard({ name: 'Onboarding', path: '/onboarding' }, null, () => true).next).toBe(true)
  })
  it('引导已完成访问引导页 → 重定向 dashboard', () => {
    localStorage.setItem('jd_onboarding_complete', 'true')
    expect(guard({ name: 'Onboarding', path: '/onboarding' }, null, () => true).redirect).toBe('/dashboard')
  })
  it('引导已完成访问 dashboard → 放行', () => {
    localStorage.setItem('jd_onboarding_complete', 'true')
    expect(guard({ name: 'Dashboard', path: '/dashboard' }, null, () => true).next).toBe(true)
  })
})

describe('路由守卫 - 出纳锁定', () => {
  beforeEach(() => {
    localStorage.setItem('jd_logged_in', 'true')
    localStorage.setItem('jd_onboarding_complete', 'true')
  })

  it('出纳路由 → 重定向 dashboard', () => {
    expect(guard({ name: 'CashierMgmt', path: '/accounting/cashier/daily' }, null, () => true).redirect).toBe('/dashboard')
  })
  it('会计路由 → 放行', () => {
    expect(guard({ name: 'SubjectList', path: '/accounting/subjects' }, null, () => true).next).toBe(true)
  })
  it('dashboard → 放行', () => {
    expect(guard({ name: 'Dashboard', path: '/dashboard' }, null, () => true).next).toBe(true)
  })
})

describe('路由守卫 - 激活检查', () => {
  beforeEach(() => {
    localStorage.setItem('jd_logged_in', 'true')
    localStorage.setItem('jd_onboarding_complete', 'true')
  })

  it('未激活访问科目表 → 重定向 dashboard', () => {
    expect(guard({ name: 'SubjectList', path: '/accounting/subjects' }, null, () => false).redirect).toBe('/dashboard')
  })
  it('未激活访问 dashboard → 放行', () => {
    expect(guard({ name: 'Dashboard', path: '/dashboard' }, null, () => false).next).toBe(true)
  })
  it('未激活但引导已完成访问引导页 → 重定向 dashboard', () => {
    // 引导已完成时访问引导页，无论激活状态都应重定向
    expect(guard({ name: 'Onboarding', path: '/onboarding' }, null, () => false).redirect).toBe('/dashboard')
  })
  it('已激活访问科目表 → 放行', () => {
    expect(guard({ name: 'SubjectList', path: '/accounting/subjects' }, null, () => true).next).toBe(true)
  })
  it('未激活访问登录页 → 放行', () => {
    expect(guard({ name: 'Login', path: '/login' }, null, () => false).next).toBe(true)
  })
})
