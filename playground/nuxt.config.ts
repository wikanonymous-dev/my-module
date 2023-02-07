import {fileURLToPath} from "node:url";
import MyModule from '../src/module'

export default defineNuxtConfig({
  modules: [MyModule],
  alias: { '@wiko/my-module': fileURLToPath(new URL('../src/', import.meta.url))},
  typescript: {
    tsConfig: {
      compilerOptions: {
        strict: false,
        strictNullChecks: true
      }
    }
  }
})
