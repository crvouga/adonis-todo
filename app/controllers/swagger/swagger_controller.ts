import type { HttpContext } from '@adonisjs/core/http'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export default class SwaggerController {
  public async getSwaggerUi({ response }: HttpContext) {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>API Documentation</title>
      <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
      <script>
        window.onload = () => {
          window.ui = SwaggerUIBundle({
            url: '/swagger/open_api_schema.yaml',
            dom_id: '#swagger-ui',
          });
        };
      </script>
    </body>
    </html>
  `
    return response.header('content-type', 'text/html').send(html)
  }

  public async getSwaggerFile({ request, response }: HttpContext) {
    const url = request.url()
    const file = url.replace('/swagger/', '')
    try {
      const specPath = join(process.cwd(), 'resources', file)
      const spec = readFileSync(specPath, 'utf-8')
      return response.header('content-type', 'application/yaml').send(spec)
    } catch (error) {
      return response.status(500).send('Error loading OpenAPI specification')
    }
  }
}
