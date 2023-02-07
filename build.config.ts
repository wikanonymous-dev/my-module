import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/index'],
  declaration: true,
  externals: ['#imports', '#app'],
  rollup: {
    emitCJS: true,
    cjsBridge: false,
    esbuild: { tsconfig: 'tsconfig.build.config' }
  }
})
