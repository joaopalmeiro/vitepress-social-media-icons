# vitepress-social-media-icons

[VitePress](https://vitepress.dev/)-ready SVG strings for social media icons. For the sources and guidelines for these icons, check the [Social Media Icons file](https://www.figma.com/community/file/1098022441810511046/Social-Media-Icons) on the Figma Community, please.

- [Source code](https://github.com/joaopalmeiro/vitepress-social-media-icons)
- [npm package](https://www.npmjs.com/package/vitepress-social-media-icons)

## References

- https://vitepress.dev/reference/default-theme-config#sociallinks
- https://github.com/vuejs/vitepress/blob/v1.0.0-rc.22/src/client/theme-default/components/VPSocialLink.vue
- https://github.com/vuejs/vitepress/blob/v1.0.0-rc.22/src/client/theme-default/support/socialIcons.ts

## Development

```bash
fnm install && fnm use && node --version
```

```bash
npm install
```

```bash
npm run lint
```

```bash
npm run lint:fix
```

```bash
npm run format
```

```bash
npm run build:icons
```

```bash
npm run build
```

```bash
npm pack --dry-run
```

## Deployment

```bash
npm version --no-git-tag-version patch
```

```bash
npm version --no-git-tag-version minor
```

```bash
npm version --no-git-tag-version major
```

- Commit and push changes.
- Create a tag on [GitHub Desktop](https://github.blog/2020-05-12-create-and-push-tags-in-the-latest-github-desktop-2-5-release/).
- Check [GitHub](https://github.com/joaopalmeiro/vitepress-social-media-icons/actions) and [npm](https://www.npmjs.com/package/vitepress-social-media-icons).
