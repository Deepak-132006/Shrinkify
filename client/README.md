# Shrinkify — frontend

Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion, built against
your `UrlController` (`/shorten`, `/{shortCode}`, `/stats/{shortCode}`).

## Design

- **Palette** — locked to exactly five colors, no others used anywhere:
  `#252323` ink · `#A99985` tan · `#F5F1ED` cream · `#DAD2BC` sand · `#70798C` slate.
- **Signature interaction** — "the press": submitting a URL slams an ink-colored
  bar down over the input (`components/PressForm.tsx`), then reveals the result
  as a perforated **claim ticket** (`components/TicketStub.tsx`), numbered in
  the order they were issued — because that's a real sequence, not decoration.
- **Type** — Space Grotesk for display headings, Inter for body copy,
  JetBrains Mono for anything that's a URL, code, or number.

## 1. Install

```bash
npm install
```

## 2. Point it at your backend

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=https://shrinkify-app.onrender.com
```

Use `http://localhost:8080` while running Spring Boot locally.

## 3. Run

```bash
npm run dev
```

Open http://localhost:3000.

## 4. Match the DTO field names

`lib/types.ts` guesses your DTO shape:

```ts
UrlRequest       { originalUrl, customCode? }
UrlResponse      { shortUrl }
UrlStatsResponse { shortCode, originalUrl, clickCount, createdAt }
```

Open your actual `UrlRequest.java` / `UrlResponse.java` / `UrlStatsResponse.java`
and rename fields in `lib/types.ts` to match exactly — that's the only file
that should need edits; every component reads through these types, not raw
`fetch` calls.

## 5. Enable CORS on the backend

Spring Boot will reject requests from `localhost:3000` (or your deployed
frontend domain) until you allow it. Add to `UrlController`, or better, a
global `WebMvcConfigurer`:

```java
@Bean
public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                    .allowedOrigins("http://localhost:3000", "https://your-frontend-domain.com")
                    .allowedMethods("GET", "POST");
        }
    };
}
```

## 6. Deploy

Any Node host works (Vercel is the path of least resistance for Next.js).
Set `NEXT_PUBLIC_API_BASE_URL` as an environment variable there too — it's
read at build/runtime, not baked into `.env.local`.

## Project structure

```
app/
  layout.tsx            fonts + metadata
  globals.css            tokens, perforation pattern, reduced-motion guard
  page.tsx                hero + press form + ticket queue
  stats/[code]/page.tsx    per-ticket stats view
components/
  PressForm.tsx          the shrink interaction (signature piece)
  TicketStub.tsx          one claim ticket, copy + link to stats
  TicketList.tsx           queue wrapper, empty state
lib/
  api.ts                  fetch wrappers for the three endpoints
  types.ts                 DTO shapes — edit this to match your backend
```

Session state only — the ticket queue lives in React state and clears on
refresh. If you want it to persist, the natural next step is a `GET /urls`
list endpoint on the backend and swapping `useState` in `app/page.tsx` for a
fetch on mount.
