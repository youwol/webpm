export const examples = [
    {
        title: 'Hello world',
        description: {
            innerHTML:
                'Basics of importing resources with a <a href="https://getbootstrap.com/docs/4.0/components/dropdowns/">drop-down example</a> from bootstrap. ' +
                'Installation goes over indirect dependencies installation first and then link bootstrap appropriately.',
        },
        src: `return async (cdnClient, message$) => {

    // the library 'cdnClient' serves as entry point to install run-time dependencies
    await cdnClient.install({
    // It is possible to import a list of modules based on name & semantic versioning
    // Here, bootstrap will come with its dependencies installed first (e.g. popper.js)
        modules:['bootstrap#^4.4.0'],
    // CSS can also be imported, again using semantic versioning
    // Here the bootstrap  style sheets is imported
        css: ['bootstrap#^4.4.0~bootstrap.min.css']
    // Not shown here, but it is also possible to import standalone javascript files (which are not modules)
    })
    
    // Next lines are 'standard' bootstrap HTMLElements for a dropdown
    // Refer to dedicated explanation for help (https://getbootstrap.com/docs/4.0/components/dropdowns/)
    const div = document.createElement('div')
    div.innerHTML =  \`
<div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Dropdown button
    </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item">Action</a>
    <a class="dropdown-item">Another action</a>
    <a class="dropdown-item">Something else here</a>
  </div>
</div>\`
    
    // All the snippets presented here can return an HTMLElement to be displayed when ran.
    return div
}`,
    },
    {
        title: 'Real world',
        description: {
            innerHTML:
                'Somewhow more complex example using <a href="https://threejs.org">Three.js</a> for 3D visualization ' +
                ' and the C++ <a href="https://www.pmp-library.org/">PMP</a> library for remeshing ' +
                '(compiled to <a href="https://webassembly.org/">WebAssembly</a>).',
        },
        src: `return async (cdnClient, message$) => {
    const {PMP, FV, THREE} = await cdnClient.install({
        modules:[
            '@youwol/vsf-pmp#^0.1.0',
            '@youwol/flux-view#^1.1.0', 
            'three#^0.128.0'
        ],
        aliases:{ 
            PMP:'@youwol/vsf-pmp', 
            FV: '@youwol/flux-view'
        },
        onEvent: (ev) => message$.next(ev.targetName)
    })
    message$.next('done')
    const geom = new THREE.TorusKnotGeometry()
    const remeshed = await PMP.UniformRemeshing.remesh(geom, {edgeFactor:0.3})
    
    const mesh = new THREE.Mesh(
        remeshed,
        new THREE.MeshPhongMaterial({ color: "#8AC", wireframe:true})
    )
    
    const light = new THREE.HemisphereLight(0xffffff, 1.0);
    const scene = new THREE.Scene().add(mesh).add(light);
    const renderer = new THREE.WebGLRenderer();
        
    return FV.render({
        style:{ 'height': '800px', width:'100%'},
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
    },
    {
        title: 'Run-time',
        description: {
            innerHTML:
                'Libraries installed comes as individual entities. ' +
                'This snippet presents the state of the CDN client: the modules installed so far.',
        },
        src: `return async (cdnClient) => {

    await cdnClient.install({
        modules:[
            '@youwol/flux-view#x',
            'rxjs#7.x'
        ],
        aliases:{
            FV: '@youwol/flux-view',
            RX: 'rxjs'
        }
    })
    //------------------------------------------------------------
    // The current run time can be accessed using 'cdnClient.State'
    //------------------------------------------------------------
    return FV.render({
        tag:'pre',
        class:'h-100 w-100 fv-text-primary',
        children: [cdnClient.monitoring().view]
    })
}`,
    },
    {
        title: 'Hello Python',
        description: {
            innerHTML:
                'A custom installer allows to install python modules and run them using  <a href="https://pyodide.org/en/stable/">Pyodide</a>. ' +
                "The package 'numpy' use C++ code, hence Javascript, Python & C++ are running hand to hand.",
        },
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
    // Pure python wheels from pypi or ported C packages from pyodide can be used
                    modules: [ "numpy" ],
                    exportedPyodideInstanceName: "PY",
                    onEvent: (ev) => message$.next(ev.text),
                }
            }
        ]
    })
    message$.next('done')
    // Expose a javascript module in python run-time
    PY.registerJsModule('jsModule', { count: 10000 })
    
    // Approximation of PI using a probabilistic approach
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
    },
    {
        title: 'Hello workers',
        description: {
            innerHTML:
                'Same as the previous example, but running a hundred times in a worker pool with a view including ' +
                'real time updates (workers count & average PI approximation).',
        },
        src: `function inWorker({args, workerScope}){
    const {PY} = workerScope
    PY.registerJsModule('jsModule', {count: args.count})
    return PY.runPython(\`
    import numpy as np
    from jsModule import count 
    data = np.random.uniform(-0.5, 0.5, size=(count, 2))
    len(np.argwhere(np.linalg.norm(data, axis=1)<0.5)) / count * 4\`)
}        
return async (cdnClient, message$) => {
    message$.next('prepare worker pool with 1 initial instances')
    // workers pool module is an opt-in feature of cdnClient
    const WPool = await cdnClient.installWorkersPoolModule()
    
    // run-time of main thread
    const {FV, RX} = await cdnClient.install({
        modules: ['@youwol/flux-view'],
        aliases: { FV: "@youwol/flux-view", RX: "rxjs"},
    })
    const {scan, buffer, takeWhile, last}   = RX.operators
    
    // run-time of worker's thread
    const pool = new WPool.WorkersPool({
        install:{ 
            // rxjs not used in worker: just for illustration
            modules:['rxjs#^7.0.0'],
            customInstallers:[{
                module: "@youwol/cdn-pyodide-loader#^0.1.2",
                installInputs: { modules: [ "numpy" ], exportedPyodideInstanceName: "PY" }
            }]
        },
        pool: { startAt: 1, stretchTo: 10 }
    })      
    const view = pool.view()
    // optional: wait for pool.startAt worker(s) ready
    await pool.ready() 
    message$.next('done')
    
    const results$ = new RX.Subject()    
    const perSecond$ = results$.pipe(buffer(RX.interval(1000)))
    const acc$ = results$.pipe(scan(({s, c},e)=>({s:s + e, c: c+1}), {s:0, c:0}))
    
    const compute = () => {
        for( let i=0; i<1000; i++){
            pool.schedule({title: 'PI', entryPoint: inWorker, args: {count:100000}})
            .pipe(
                takeWhile( ({type}) => type != 'Exit', true),
                last()
            )
            .subscribe(message => results$.next(message.data.result))
        }
    }
    return { 
        children:[
            { class:'btn btn-primary', innerText: 'start 1000 runs', onclick: compute },
            { innerText: FV.attr$(pool.workers$, (workers) => 'Workers count: '+Object.keys(workers).length)}, 
            { innerText: FV.attr$(acc$, ({s, c}) => 'Average: '+ s / c )},
            { innerText: FV.attr$(acc$, ({c}) => 'Simulation count: '+ c)},
            { innerText: FV.attr$(perSecond$, (results) => 'Results /s: '+ results.length)},
            view
        ]
    }
}`,
    },
]
