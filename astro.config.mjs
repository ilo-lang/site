// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [
    starlight({
      title: 'ilo',
      description: 'Token-optimised programming language for AI agents',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/ilo-lang/ilo' },
        { icon: 'reddit', label: 'Reddit', href: 'https://www.reddit.com/r/ilolang/' },
      ],
      customCss: ['./src/styles/global.css'],
      components: {
        ThemeSelect: './src/components/ThemeSelect.astro',
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', slug: 'docs/introduction' },
            { label: 'Installation', slug: 'docs/installation' },
            { label: 'Your First Program', slug: 'docs/first-program' },
          ],
        },
        {
          label: 'Language Guide',
          items: [
            { label: 'Types & Functions', slug: 'docs/guide/types-and-functions' },
            { label: 'Prefix Notation', slug: 'docs/guide/prefix-notation' },
            { label: 'Guards & Control Flow', slug: 'docs/guide/guards' },
            { label: 'Pipes', slug: 'docs/guide/pipes' },
            { label: 'Error Handling', slug: 'docs/guide/error-handling' },
            { label: 'Collections', slug: 'docs/guide/collections' },
            { label: 'Data & I/O', slug: 'docs/guide/data-io' },
            { label: 'Imports', slug: 'docs/guide/imports' },
            { label: 'Real-World Examples', slug: 'docs/guide/examples' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Specification', slug: 'docs/reference/spec' },
            { label: 'CLI Reference', slug: 'docs/reference/cli' },
            { label: 'Built-in Functions', slug: 'docs/reference/builtins' },
            { label: 'Error Codes', slug: 'docs/reference/error-codes' },
          ],
        },
        {
          label: 'Integrations',
          items: [
            { label: 'MCP Servers', slug: 'docs/integrations/mcp' },
            { label: 'HTTP Tools', slug: 'docs/integrations/http-tools' },
          ],
        },
      ],
      head: [
        {
          tag: 'meta',
          attrs: { name: 'theme-color', content: '#f59e0b' },
        },
      ],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
