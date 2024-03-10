import {defineConfig} from 'vite'
import {resolve} from 'path';
import dts from 'vite-plugin-dts'

export default defineConfig({
    define: {'process.env': {}},
    server: {
        port: 7788,
        host: "0.0.0.0"
    },
    build: {
        minify: "esbuild",
        lib: {
            entry: resolve(__dirname, './src/index.ts'),
            name: 'aieditor',
            // fileName: (format) => `index.${format}.js`,
            fileName: `index`,
            formats: ['es', 'cjs']
        },
    },
    plugins: [dts({rollupTypes: true}),
        // legacy({
        //     targets: ['defaults', 'not IE 11','chrome 52'],
        // }),
    ],
})
