import router from '../src/router/index'
import { describe, it, expect } from 'vitest'

describe('router', () => {
  it('should expose tool routes', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const routes: any[] = router.getRoutes()
    const paths = routes.map((r) => r.path).filter((p) => typeof p === 'string')
    // Expect absolute paths as produced by Vue Router in the current setup
    expect(paths).toContain('/tools')
    expect(paths).toContain('/tools/base64')
    expect(paths).toContain('/blog')
  })
})
