export const examples = [
    {
        title: 'C++ and Javascript hand to hand',
        src: `return async (cdnClient) => {

    const {PMP, FV, THREE} = await cdnClient.install({
        modules:[
            '@youwol/vsf-pmp#^0.1.0',
            '@youwol/flux-view#^1.1.0', 
            'three#^0.128.0'
        ],
        aliases:{ 
            PMP:'@youwol/vsf-pmp', 
            FV: '@youwol/flux-view'
        }
    })
    const circle = new THREE.TorusKnotGeometry()
    const remeshed = await PMP.UniformRemeshing.remesh(circle, {edgeFactor:0.3})
    
    const mesh = new THREE.Mesh(
        remeshed,
        new THREE.MeshPhongMaterial({ color: "#8AC", wireframe:true})
    )
    
    const light = new THREE.HemisphereLight(0xffffff, 1.0);
    const scene = new THREE.Scene().add(mesh).add(light);
    const renderer = new THREE.WebGLRenderer();
        
    return FV.render({
        class:'h-100 w-100',
        connectedCallback:(elem) => {
            const camera = new THREE.PerspectiveCamera(75, elem.clientWidth / elem.clientHeight, 0.1, 1000);
            camera.position.z = 4;      
            function animate() {
                requestAnimationFrame(animate);
                mesh.rotation.x += 0.01;
                mesh.rotation.y += 0.01;
                renderer.render(scene, camera);   
            }  
            animate();
            renderer.setSize(elem.clientWidth, elem.clientHeight);
            elem.appendChild(renderer.domElement);
        }
    })
}`,
        description: {
            innerHTML:
                'This example shows the seaming less coupling between C++ and javascript. It uses the C++ ' +
                ' <a href="https://www.pmp-library.org/">PMP</a> library to execute the remeshing step.',
        },
    },
    {
        title: 'Display current run-time',
        src: `return async (cdnClient) => {

    const {PMP, FV, THREE} = await cdnClient.install({
        modules:[
            '@youwol/flux-view#x'
        ],
        aliases:{
            FV: '@youwol/flux-view'
        }
    })
    return FV.render({
        tag:'pre',
        class:'h-100 w-100 fv-text-primary',
        children: [...cdnClient.State.importedBundles.entries()].map(([k,v])=>{
            return { innerText: k + ': ' + v }
        })
    })
}`,
        description: {
            innerHTML:
                'Libraries are installed as distinct entities and not included in applications. ' +
                'This snippet presents the state of the CDN client: the modules installed.',
        },
    },
    {
        title: 'Python + Js + C++',
        src: `return async (cdnClient, message$) => {
    // First execution can take a bit of time for python & numpy to be downloaded.
    // Latter executions use the browser's cache.
    message$.next('start installing python env.')
    const {PY, FV} = await cdnClient.install({
        modules: ['@youwol/flux-view'],
        aliases: { FV: "@youwol/flux-view" },
        customInstallers: [
            {
                module: "@youwol/cdn-pyodide-loader#^0.1.2",
                installInputs: {
                    modules: [ "numpy" ],
                    exportedPyodideInstanceName: "PY",
                    onEvent: (ev) => message$.next(ev.text),
                }
            }
        ]
    })
    message$.next('done')
    PY.registerJsModule('jsModule', { count: 10000 })
    const pi = PY.runPython(\`
    import numpy as np
    from jsModule import count 

    def calc_pi(n):
        data = np.random.uniform(-0.5, 0.5, size=(n, 2))
        norms = np.linalg.norm(data, axis=1)
        return len(np.argwhere(norms<0.5)) / n * 4
        
    calc_pi(count)\`)
    
    return FV.render({ innerText: 'PI approximation: '+pi})
}`,
        description: {
            innerHTML:
                'A custom installer allows to install python modules and run them using Pyodide. ' +
                'Note that numpy use C++ code. ' +
                "For more info see for instance <a href='https://l.youwol.com/doc/@youwol/python-playground'>Py-play</a>. ",
        },
    },
]
