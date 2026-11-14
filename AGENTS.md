<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project architecture
- Each content section of NXT Frame's site is its own route (services, portfolio, pricing, about, contact) sharing the header, footer and cursor trail from __root, with the page list in src/lib/site.ts feeding nav, footer and sitemap, because the user asked for crawlable sub pages.
- Build absolute URLs (sitemap.xml route, canonical, og:url, og:image) from the request origin, never a hardcoded domain, because the site is served from both Lovable and Vercel.
- Ship images, the share image and fonts as real files in src/assets or public (never .asset.json pointers or remote font CSS), because Lovable asset URLs 404 on Vercel and remote fonts block first paint.
- Import src/styles.css as a side effect with tanstackStart server.build.inlineCss on, and scan only the files the page uses with @source, because PageSpeed flagged the separate stylesheet as render-blocking.
- Keep the first JS download lean: no React Query (the site fetches no data), plain styled anchors instead of the shadcn Button on the home page (drops tailwind-merge), and Vercel Analytics/Speed Insights lazy-loaded after idle, because PageSpeed flagged unused JavaScript.
