
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 646, hash: 'f49723bc5909fd46ea0007638e4dad2e9ee75c869b563f55656a4adec9e279e9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1007, hash: '24b853e62588da148f897a0c9ca74e41a550fbb201d018c85fa3d472e9cfb003', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-F25CBACL.css': {size: 27, hash: 'QAzijnHwH4Y', text: () => import('./assets-chunks/styles-F25CBACL_css.mjs').then(m => m.default)}
  },
};
