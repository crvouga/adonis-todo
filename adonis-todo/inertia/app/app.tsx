/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { AppCtx } from './app_ctx'
import { AppCtxProvider } from './app_ctx'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

const appCtx = AppCtx()

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    return resolvePageComponent(`../pages/${name}.tsx`, import.meta.glob('../pages/**/*.tsx'))
  },

  setup({ el, App, props }) {
    createRoot(el).render(
      <AppCtxProvider appCtx={appCtx}>
        <App {...props} />
      </AppCtxProvider>
    )
  },
})
