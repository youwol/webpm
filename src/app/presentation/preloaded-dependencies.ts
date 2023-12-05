export const preload_deps = {
    modules: [
        '@youwol/cdn-client#^2.1.4',
        '@youwol/vsf-core#^0.2.4',
        '@youwol/rx-vdom',
        '@youwol/vsf-canvas#^0.2.2',
    ],
    customInstallers: [
        {
            module: '@youwol/cdn-pyodide-loader#^0.1.2',
            installInputs: {
                modules: ['numpy'],
                exportedPyodideInstanceName: 'PY',
            },
        },
    ],
}
