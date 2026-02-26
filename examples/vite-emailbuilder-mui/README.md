# Email builder with MUI integrated into a Vite application

Use this as a sample to self-host EmailBuilder.js inside of Vite.

## Local development

From the monorepo root:

```bash
cd examples/vite-emailbuilder-mui
npm install
npm run dev
```

Or from the project root: `npm run dev -w @usewaypoint/vite-emailbuilder`

## Configuration

Copy `.env.example` to `.env` and adjust as needed:

| Variable         | Description                                 | Default                |
| ---------------- | ------------------------------------------- | ---------------------- |
| `VITE_BASE_PATH` | Base URL path (must start and end with `/`) | `/apps/email-builder/` |
| `VITE_DEV_PORT`  | Dev server and preview port                 | `5173`                 |

**Production URL:** `https://infra.aap.cornell.com/apps/email-builder` → set `VITE_BASE_PATH=/apps/email-builder/`

## Production deployment

1. Set environment variables (or use `.env.production`):
   - `VITE_BASE_PATH=/apps/email-builder/` for `https://infra.aap.cornell.com/apps/email-builder`
2. Build: `npm run build`
3. Serve the `dist/` folder:
   - **Node:** `npm run start` (runs `server/serve.cjs` on port 3000)
   - **Windows Service:** Run as Administrator: `npm run service:install`
   - **IIS reverse proxy:** Point the proxy to the Node process (port 3000). Ensure IIS maps `/apps/email-builder` to the backend.

## Windows Service

To run as a Windows service (e.g. behind IIS reverse proxy):

1. Build: `npm run build`
2. Run as Administrator: `npm run service:install`
3. Uninstall: `npm run service:uninstall` (as Administrator)
