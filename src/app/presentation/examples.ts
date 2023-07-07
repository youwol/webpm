const webpmUrl = 'https://webpm.org/^2.0.4/cdn-client.js'
const head = `<head><script src="${webpmUrl}"></script></head>`
export const examples = [
    {
        title: 'Hello world',
        description: {
            innerHTML:
                'Basics of importing resources with a <a href="https://getbootstrap.com/docs/5.3/components/dropdowns/">drop-down example</a> from bootstrap. ' +
                'Installation goes over indirect dependencies installation first and then link bootstrap appropriately.',
        },
        src: `<!DOCTYPE html>
<html lang="en">
    <head><script src="https://webpm.org/^2.0.4/cdn-client.js"></script></head>
    <body>
       	<div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown button
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
    </body>    
    <script type="module">
        const client = window['@youwol/cdn-client']
        await client.install({
            modules:['bootstrap#^5.3.0'],
            css: ['bootstrap#^5.3.0~bootstrap.min.css'],
            displayLoadingScreen: true
        })
    </script>
</html>`,
    },
    {
        title: 'Real world',
        description: {
            innerHTML:
                '<a href="l.youwol.com/doc/@youwol/vs-flow">VS-Flow</a>, a powerful low-code ecosystem, owes its existence to WebPM: ' +
                'run time is updated on the fly while users connect "modules". ' +
                'In this example, a "remeshing" application is contructed that leverages the C++ library <a href="https://www.pmp-library.org/">PMP</a>.',
        },
        src: `<!DOCTYPE html>
<html lang="en">
    ${head}
    <body class="vw-100 vh-100"></body>
    <script type="module">
        const cdnClient = window['@youwol/cdn-client']
        await cdnClient.install({
            modules:['@youwol/vsf-core#^0.1.2', '@youwol/flux-view', '@youwol/vsf-canvas#^0.1.1'],
            css: [
                'bootstrap#^4.4.0~bootstrap.min.css', 
                'fontawesome#5.12.1~css/all.min.css', 
                '@youwol/fv-widgets#latest~dist/assets/styles/style.youwol.css'],
            aliases:{
                VSF:'@youwol/vsf-core', Canvas:'@youwol/vsf-canvas', FV: '@youwol/flux-view'
            },
            displayLoadingScreen: true
        })
        let project = new VSF.Projects.ProjectState()
        project = await project.import("@youwol/vsf-three", '@youwol/vsf-pmp', '@youwol/vsf-rxjs')
        project = await project.parseDag([
            "(of#of)>>(torusKnot#geom)>>(fromThree#three->pmp)>>(uniformRemeshing#remesh)>>(toThree#pmp->three)>>0(combineLatest#combine)>>(mesh#threeMesh)>>(viewer#viewer)",
            "(#of)>>(standardMaterial#material)>>1(#combine)"
        ], {
            material: { wireframe: true },
            remesh: { edgeFactor: 0.7 }
        })
        document.body.append(FV.render({
            class:'h-100',
            children:[
                {
                    class:'h-50',
                    children: [project.instancePool.inspector().getModule('viewer').html()]
                },
                {   class:'h-50',
                    children: [new Canvas.Renderer3DView({project$: rxjs.of(project), workflowId:'main'})]
                }
            ]
        }))
    </script>
</html>
`,
    },
    {
        title: 'Run-time',
        description: {
            innerHTML:
                'Libraries installed comes as individual entities. ' +
                'This snippet presents the state of the CDN client: the modules installed so far.',
        },
        src: `<!DOCTYPE html>
<html lang="en">
    ${head}
    <body></body>
    <script type="module">
        const cdnClient = window['@youwol/cdn-client']
        await cdnClient.install({
            modules:[
                '@youwol/flux-view#x',
                'rxjs#7.x'
            ],
            css: ['bootstrap#^4.4.0~bootstrap.min.css'],
            aliases:{
                FV: '@youwol/flux-view',
                RX: 'rxjs'
            },
            displayLoadingScreen: true,
        })
        //------------------------------------------------------------
        // The current run time can be accessed using 'cdnClient.State'
        //------------------------------------------------------------
        const div = FV.render({
            tag:'pre',
            class:'h-100 w-100 fv-text-primary',
            children: [cdnClient.monitoring().view]
        })
        document.body.appendChild(div)
    </script>
</html>`,
    },
    {
        title: 'Hello Python',
        description: {
            innerHTML:
                'A custom installer allows to install python modules and run them using  <a href="https://pyodide.org/en/stable/">Pyodide</a>. ' +
                "The package 'numpy' use C++ code, such that Javascript, Python & C++ are running hand to hand here.",
        },
        src: `<!DOCTYPE html>
<html lang="en">
    ${head}
    <body style="height: 100%;width: 100%;background-color: white;"></body>
    <script type="module">
        const cdnClient = window['@youwol/cdn-client']
        console.log(cdnClient)
        const {PY, FV} = await cdnClient.install({
            modules: ['@youwol/flux-view'],
            aliases: { FV: "@youwol/flux-view" },
            customInstallers: [
                {
                    module: "@youwol/cdn-pyodide-loader#^0.1.2",
                    installInputs: {
                        modules: [ "numpy" ],
                        exportedPyodideInstanceName: "PY",
                        // onEvent: (ev) => message$.next(ev.text),
                    }
                }
            ],
            displayLoadingScreen: true,
        })
        PY.registerJsModule('jsModule', { count: 10000 })
        const pi = PY.runPython(\`
            import numpy as np
            from jsModule import count
        
            def calc_pi(n):
                data = np.random.uniform(-0.5, 0.5, size=(n, 2))
                norms = np.linalg.norm(data, axis=1)
                return len(np.argwhere(norms<0.5)) / n * 4
        
            calc_pi(count)\`)
        const div = FV.render({ innerText: 'PI approximation: '+pi})
        document.body.append(div)
    </script>
</html>`,
    },
    {
        title: 'Hello workers',
        description: {
            innerHTML:
                'Same as the previous example, but running a hundred times in a worker pool with a view including ' +
                'real time updates (workers count & average PI approximation).',
        },
        src: `<!DOCTYPE html>
<html lang="en">
    ${head}
    <body></body>
    <script type="module">
        function inWorker({args, workerScope}){
            const {PY} = workerScope
            PY.registerJsModule('jsModule', {count: args.count})
            return PY.runPython(\`
                import numpy as np
                from jsModule import count
                data = np.random.uniform(-0.5, 0.5, size=(count, 2))
                len(np.argwhere(np.linalg.norm(data, axis=1)<0.5)) / count * 4\`)
        }
    
        const cdnClient = window['@youwol/cdn-client']
        console.log(cdnClient)
        const WPool = await cdnClient.installWorkersPoolModule()
    
        // run-time of main thread
        const {FV, RX} = await cdnClient.install({
            modules: ['@youwol/flux-view'],
            css: ['bootstrap#^4.4.0~bootstrap.min.css',
                '@youwol/fv-widgets#latest~dist/assets/styles/style.youwol.css',],
            aliases: { FV: "@youwol/flux-view", RX: "rxjs"},
            displayLoadingScreen: true,
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
        await pool.ready()
    
        const results$ = new RX.Subject()
        const perSecond$ = results$.pipe(buffer(RX.interval(1000)))
        const acc$ = results$.pipe(scan(({s, c},e)=>({s:s + e, c: c+1}), {s:0, c:0}))
    
        const compute = () => {
            for( let i=0; i<1000; i++){
                pool.schedule({title: 'PI', entryPoint: inWorker, args: {count:100000}})
                    .pipe(
                        takeWhile( ({type}) => type !== 'Exit', true),
                        last()
                    )
                    .subscribe(message => results$.next(message.data.result))
            }
        }
        const div = FV.render({
            children:[
                { class:'btn btn-primary', innerText: 'start 1000 runs', onclick: compute },
                { innerText: FV.attr$(pool.workers$, (workers) => 'Workers count: '+Object.keys(workers).length)},
                { innerText: FV.attr$(acc$, ({s, c}) => 'Average: '+ s / c )},
                { innerText: FV.attr$(acc$, ({c}) => 'Simulation count: '+ c)},
                { innerText: FV.attr$(perSecond$, (results) => 'Results /s: '+ results.length)},
                view
            ]
        })
        document.body.appendChild(div)
    </script>
</html>`,
    },
]
