import env from '#start/env'
import { authApiClient } from '@adonisjs/auth/plugins/api_client'
import { authBrowserClient } from '@adonisjs/auth/plugins/browser_client'
import app from '@adonisjs/core/services/app'
import testUtils from '@adonisjs/core/services/test_utils'
import { inertiaApiClient } from '@adonisjs/inertia/plugins/api_client'
import { sessionApiClient } from '@adonisjs/session/plugins/api_client'
import { sessionBrowserClient } from '@adonisjs/session/plugins/browser_client'
import { shieldApiClient } from '@adonisjs/shield/plugins/api_client'
import { apiClient } from '@japa/api-client'
import { assert } from '@japa/assert'
import { browserClient } from '@japa/browser-client'
import { expect } from '@japa/expect'
import { pluginAdonisJS } from '@japa/plugin-adonisjs'
import type { Config } from '@japa/runner/types'

/**
 * This file is imported by the "bin/test.ts" entrypoint file
 */

/**
 * Configure Japa plugins in the plugins array.
 * Learn more - https://japa.dev/docs/runner-config#plugins-optional
 */
export const plugins: Config['plugins'] = [
  sessionApiClient(app),
  shieldApiClient(),
  apiClient({
    baseURL: `http://${env.get('HOST')}:${env.get('PORT')}`,
  }),
  browserClient({
    // runInSuites: ['browser'],
  }),
  expect(),
  pluginAdonisJS(app),
  inertiaApiClient(app),
  authApiClient(app),
  sessionBrowserClient(app),
  authBrowserClient(app),
  assert({
    openApi: {
      schemas: [app.makePath('resources/open_api_schema.yaml')],
    },
  }),
]

/**
 * Configure lifecycle function to run before and after all the
 * tests.
 *
 * The setup functions are executed before all the tests
 * The teardown functions are executed after all the tests
 */
export const runnerHooks: Required<Pick<Config, 'setup' | 'teardown'>> = {
  setup: [() => testUtils.db().truncate()],
  teardown: [],
}

/**
 * Configure suites by tapping into the test suite instance.
 * Learn more - https://japa.dev/docs/test-suites#lifecycle-hooks
 */
export const configureSuite: Config['configureSuite'] = (suite) => {
  if (['browser', 'functional', 'e2e'].includes(suite.name)) {
    return suite.setup(() => testUtils.httpServer().start())
  }
}
