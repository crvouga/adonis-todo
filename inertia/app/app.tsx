/// <reference path="../../../adonisrc.ts" />
/// <reference path="../../../config/inertia.ts" />

import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { createInertiaApp } from '@inertiajs/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import '../css/app.css'
import { AppCtx, AppCtxProvider } from './app_ctx'
import { queryClient } from './query_client'

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
      <QueryClientProvider client={queryClient}>
        <AppCtxProvider appCtx={appCtx}>
          <App {...props} />
        </AppCtxProvider>
      </QueryClientProvider>
    )
  },
})
