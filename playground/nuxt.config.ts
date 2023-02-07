import {fileURLToPath} from "node:url";
import MyModule from '../src/module'

export default defineNuxtConfig({
  modules: [MyModule],
  alias: { 'my-module': fileURLToPath(new URL('../src/', import.meta.url))},
  typescript: {
    tsConfig: {
      compilerOptions: {
        strict: false,
        strictNullChecks: true
      }
    }
  }
})
