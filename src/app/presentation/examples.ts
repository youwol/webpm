const webpmUrl = 'https://webpm.org/^2.2.0/webpm-client.js'
const head = `<head><script src="${webpmUrl}"></script></head>`
export const examples = [
    {
        title: 'Hello World',
        youtube:
            'https://www.youtube.com/embed/evYkrIug0ck?si=xTyTr1eFA5WOSgBD',
        explanation: `hello-world.md`,
        src: `
<!-- All examples are standalones: you can copy/paste them in an 'index.html' file opened by browser -->
<!DOCTYPE html>
    <html lang="en">
        ${head}
        
        <script type="module">
            await webpm.install({
                modules:['bootstrap#^4.4.1'],
                css: ['bootstrap#^4.4.1~bootstrap.min.css'],
                displayLoadingScreen: true
            })
        </script>
        
        <body class="vh-100 vw-100">
           	<div class="dropdown">
                 <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 Dropdown button
                 </button>
                 <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item">Action</a>
                    <a class="dropdown-item">Another action</a>
                    <a class="dropdown-item">Something else here</a>
                 </div>
            </div>
        </body>
    </html>`,
    },
    //     {
    //         title: 'Hello WebPM',
    //         description: {
    //             innerHTML:
    //                 'Libraries installed comes as individual entities. ' +
    //                 'This snippet presents the state of the CDN client: the modules installed so far.',
    //         },
    //         src: `<!DOCTYPE html>
    // <html lang="en">
    //     ${head}
    //     <body></body>
    //     <script type="module">
    //         // Ask about what you want to install, provide aliases if you want
    //         // Dependencies resolutions, given what is already installed in your browser, is handled automatically
    //         const {rxVDOM} = await webpm.install({
    //             modules:[
    //                 'bootstrap#^4.0.0',
    //                 '@youwol/rx-vdom#^1.0.0 as rxVDOM',
    //                 'rxjs#^7.0.0 as rxjs7',
    //                 'rxjs#^6.2.0 as rxjs6'
    //             ],
    //             aliases: {
    //                 popper: 'Popper'
    //             },
    //             css: ['bootstrap#^4.4.0~bootstrap.min.css',
    //                   'fontawesome#5.12.1~css/all.min.css'],
    //             displayLoadingScreen: true,
    //         })
    //         // Then use your packages at will
    //         document.body.appendChild(
    //             rxVDOM.render({tag:'div', class:'p-5', children: [webpm.monitoring().view]})
    //         )
    //     </script>
    // </html>`,
    //     },
    {
        title: 'Real World',
        youtube:
            'https://www.youtube.com/embed/irZ5ZsJny04?si=QboZwRUtGPVqRO4A',
        explanation: `real-world.md`,
        src: `<!DOCTYPE html>
<html lang="en">
    ${head}
    <body class="vw-100 vh-100"></body>
    <script type="module">
        const {VSF, Canvas, rxDom, rxjs} = await webpm.install({
            modules:[
                '@youwol/vsf-core#^0.2.4 as VSF', 
                '@youwol/rx-vdom as rxDom', 
                '@youwol/vsf-canvas#^0.2.2 as Canvas'],
            css: [
                'bootstrap#^4.4.0~bootstrap.min.css', 
                'fontawesome#5.12.1~css/all.min.css', 
                '@youwol/fv-widgets#latest~dist/assets/styles/style.youwol.css'],
            displayLoadingScreen: true
        })
        let project = new VSF.Projects.ProjectState()
        project = await project.with({
            toolboxes:["@youwol/vsf-three", '@youwol/vsf-pmp', '@youwol/vsf-rxjs'],
            workflow: {
            	branches:[
                    "(of#of)>>(torusKnot#geom)>>(fromThree#three->pmp)>>(uniformRemeshing#remesh)>>(toThree#pmp->three)>>0(combineLatest#combine)>>(mesh#threeMesh)>>(viewer#viewer)",
                    "(#of)>>(standardMaterial#material)>>1(#combine)"
                ],
            	configurations:{
                    material: { wireframe: true },
                    remesh: { edgeFactor: 0.7 }
                }
            }
        })
        
        document.body.append(rxDom.render({
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
        title: 'Python',
        youtube:
            'https://www.youtube.com/embed/Q0tdKI22qLc?si=WcsMZVN98x5wrPIu',
        explanation: `python.md`,
        src: `<!DOCTYPE html>
<html lang="en">
    ${head}
    <body style="height: 100%;width: 100%;background-color: white;">
        <div id="content"></div>
    </body>
    <script type="module">
        const {PY, FV} = await webpm.install({
            customInstallers: [
                {
                    module: "@youwol/cdn-pyodide-loader#^0.1.2",
                    installInputs: {
                        modules: [ "numpy" ],
                        exportedPyodideInstanceName: "PY",
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
        document.getElementById('content').innerText = 'PI approximation: '+pi
    </script>
</html>`,
    },
    {
        title: 'Workers',
        youtube:
            'https://www.youtube.com/embed/ST81HHBcR9s?si=DjQsSfuw4ITSd3Se',
        explanation: `workers.md`,
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
        const WPool = await webpm.installWorkersPoolModule()
        
        const {rxVDOM, rxjs} = await webpm.install({
            modules: ['@youwol/rx-vdom#^1.0.0 as rxVDOM', 'rxjs#^7.5.6 as rxjs'],
            css: [
                'bootstrap#^4.4.0~bootstrap.min.css',                
                'fontawesome#5.12.1~css/all.min.css', 
                '@youwol/fv-widgets#latest~dist/assets/styles/style.youwol.css'
            ],
            displayLoadingScreen: true,
        })
        const pool = new WPool.WorkersPool({
            install:{
                modules:[],
                customInstallers:[{
                    module: "@youwol/cdn-pyodide-loader#^0.1.2",
                    installInputs: {
                        modules: [ "numpy" ], 
                        exportedPyodideInstanceName: "PY"
                    }
                }]
            },
            pool: { startAt: 1, stretchTo: 10 }
        })
        
        const results$ = new rxjs.Subject()
        
        function task({args, workerScope}){
            const {PY} = workerScope
            PY.registerJsModule('jsModule', {count: args.count})
            return PY.runPython(\`
                import numpy as np
                from jsModule import count
                data = np.random.uniform(-0.5, 0.5, size=(count, 2))
                len(np.argwhere(np.linalg.norm(data, axis=1)<0.5)) / count * 4\`)
        }
        
        const scheduleThousandTasks = () => {
            for( let i=0; i<1000; i++){
                pool.schedule({title: 'PI approx.', entryPoint: task, args: {count:100000}})
                    .pipe(last())
                    .subscribe(message => results$.next(message.data.result))
            }
        }
        
        const { scan, buffer, takeWhile, last, filter, map }   = rxjs
        const resultsRate$ = results$.pipe(buffer(rxjs.interval(1000)))
        const sumAndCount$ = results$.pipe(scan(({s, c},e)=>({s:s + e, c: c+1}), {s:0, c:0}))    
        const workerCount$ = pool.workers$.pipe(map( workers => Object.keys(workers).length))
        
        const button = {
            tag: 'div', class:'btn btn-primary fv-pointer', innerText: 'start 1000 runs', 
            onclick: scheduleThousandTasks
        }
        const div = rxVDOM.render({
            tag: 'div', 
            class:'p-5',
            children:[
                {
                    source$: workerCount$.pipe( filter((count) => count > 0)),
                    vdomMap: () => button,
                    untilFirst: ({ innerHTML: '<i>Waiting for first worker readyness...</i>' })
                },
                { tag:'div', innerText: workerCount$.pipe( map( count => 'Workers count: '+ count))},
                { tag:'div', innerText: sumAndCount$.pipe( map(({s, c}) => 'Average: '+ s / c ))},
                { tag:'div', innerText: sumAndCount$.pipe( map(({c}) => 'Simulation count: '+ c ))},
                { tag:'div', innerText: resultsRate$.pipe( map(results=> 'Results /s: '+ results.length))},
                pool.view()
            ]
        })
        document.body.appendChild(div)
        await pool.ready()
    
    </script>
</html>`,
    },
]
