// vite.config.ts
import react from "file:///Users/maximemalecot/Documents/ecole/5e/projets/s2/web-analytics/RatFlow-SDK/packages/ratflow-sdk-react/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "node:path";
import { defineConfig } from "file:///Users/maximemalecot/Documents/ecole/5e/projets/s2/web-analytics/RatFlow-SDK/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/maximemalecot/Documents/ecole/5e/projets/s2/web-analytics/RatFlow-SDK/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/maximemalecot/Documents/ecole/5e/projets/s2/web-analytics/RatFlow-SDK/packages/ratflow-sdk-react";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true
    })
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "src/lib/index.ts"),
      name: "ratflow-sdk-react",
      formats: ["es", "umd"],
      fileName: (format) => `ratflow-sdk-react.${format}.js`
    },
    rollupOptions: {
      external: ["react", "react-dom", "styled-components"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "styled-components": "styled"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWF4aW1lbWFsZWNvdC9Eb2N1bWVudHMvZWNvbGUvNWUvcHJvamV0cy9zMi93ZWItYW5hbHl0aWNzL1JhdEZsb3ctU0RLL3BhY2thZ2VzL3JhdGZsb3ctc2RrLXJlYWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWF4aW1lbWFsZWNvdC9Eb2N1bWVudHMvZWNvbGUvNWUvcHJvamV0cy9zMi93ZWItYW5hbHl0aWNzL1JhdEZsb3ctU0RLL3BhY2thZ2VzL3JhdGZsb3ctc2RrLXJlYWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tYXhpbWVtYWxlY290L0RvY3VtZW50cy9lY29sZS81ZS9wcm9qZXRzL3MyL3dlYi1hbmFseXRpY3MvUmF0Rmxvdy1TREsvcGFja2FnZXMvcmF0Zmxvdy1zZGstcmVhY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHBsdWdpbnM6IFtcbiAgICAgICAgcmVhY3QoKSxcbiAgICAgICAgZHRzKHtcbiAgICAgICAgICAgIGluc2VydFR5cGVzRW50cnk6IHRydWUsXG4gICAgICAgIH0pLFxuICAgIF0sXG4gICAgYnVpbGQ6IHtcbiAgICAgICAgc291cmNlbWFwOiB0cnVlLFxuICAgICAgICBsaWI6IHtcbiAgICAgICAgICAgIGVudHJ5OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2xpYi9pbmRleC50cycpLFxuICAgICAgICAgICAgbmFtZTogJ3JhdGZsb3ctc2RrLXJlYWN0JyxcbiAgICAgICAgICAgIGZvcm1hdHM6IFsnZXMnLCAndW1kJ10sXG4gICAgICAgICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gYHJhdGZsb3ctc2RrLXJlYWN0LiR7Zm9ybWF0fS5qc2AsXG4gICAgICAgIH0sXG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgICAgIGV4dGVybmFsOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdzdHlsZWQtY29tcG9uZW50cyddLFxuICAgICAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgICAgICAgICAgICByZWFjdDogJ1JlYWN0JyxcbiAgICAgICAgICAgICAgICAgICAgJ3JlYWN0LWRvbSc6ICdSZWFjdERPTScsXG4gICAgICAgICAgICAgICAgICAgICdzdHlsZWQtY29tcG9uZW50cyc6ICdzdHlsZWQnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdWUsT0FBTyxXQUFXO0FBQ3pmLE9BQU8sVUFBVTtBQUNqQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFIaEIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sSUFBSTtBQUFBLE1BQ0Esa0JBQWtCO0FBQUEsSUFDdEIsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNILFdBQVc7QUFBQSxJQUNYLEtBQUs7QUFBQSxNQUNELE9BQU8sS0FBSyxRQUFRLGtDQUFXLGtCQUFrQjtBQUFBLE1BQ2pELE1BQU07QUFBQSxNQUNOLFNBQVMsQ0FBQyxNQUFNLEtBQUs7QUFBQSxNQUNyQixVQUFVLENBQUMsV0FBVyxxQkFBcUI7QUFBQSxJQUMvQztBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ1gsVUFBVSxDQUFDLFNBQVMsYUFBYSxtQkFBbUI7QUFBQSxNQUNwRCxRQUFRO0FBQUEsUUFDSixTQUFTO0FBQUEsVUFDTCxPQUFPO0FBQUEsVUFDUCxhQUFhO0FBQUEsVUFDYixxQkFBcUI7QUFBQSxRQUN6QjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
