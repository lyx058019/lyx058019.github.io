# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal static site built with Vue 3 + Vite + Element Plus (TypeScript, SCSS), deployed to GitHub Pages at `https://lyx058019.github.io/`.

## Commands

```bash
npm run dev          # Start development server
npm run build       # Build for production (includes posts:index, seo:gen, vue-tsc)
npm run preview     # Preview production build
npm run test        # Run vitest tests
npm run posts:index # Generate posts index
npm run seo:gen     # Generate SEO files (sitemap, RSS)
```

## Architecture

```
src/
├── data/           # Typed static content (skills/projects/tools/posts)
├── views/          # Page-level Vue SFCs
├── components/    # Shared UI components
├── layout/         # MainLayout shell
├── router/         # Vue Router config
├── seo/            # Runtime SEO helpers
└── styles/         # Global SCSS

scripts/            # Pre-build generators (posts index, sitemap, RSS)
public/             # Static assets (RSS, sitemap, robots)
tests/               # Vitest tests
.github/workflows/  # CI/CD pipelines
```

## Key Files

- Entry: [src/main.ts](src/main.ts) + [index.html](index.html)
- Routes: [src/router/index.ts](src/router/index.ts) - MainLayout + child routes; SEO meta set here
- Layout: [src/layout/MainLayout.vue](src/layout/MainLayout.vue) - Header/nav/footer + dark-mode toggle
- SEO: [src/seo/head.ts](src/seo/head.ts) - Updates document.head after route change

## Conventions

- Vue 3 `<script setup>` + TypeScript; path alias `@/*` points to `src/*`
- Static content in `src/data` - no large hardcoded text in components
- SCSS only; use `<style scoped lang="scss">`
- Use Element Plus CSS variables (e.g., `var(--el-bg-color-overlay)`) instead of hardcoded colors
- Dark mode via `@vueuse/core` `useDark`

## Anti-Patterns

- Hardcoded large content blocks inside Vue components (use `src/data`)
- Hardcoded color values (use Element Plus CSS variables)

## Unique Features

- Markdown posts compiled via `unplugin-vue-markdown` with PrismJS highlighting
- Runtime SEO handled by `applySeoFromRouteMeta` on route changes
- GitHub Actions auto-deploy on push to `main` branch
