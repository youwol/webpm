export const examples = [
    {
        title: 'C++ and Javascript hand to hand',
        src: `
return async (cdnClient) => {

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
} 
`,
        description: {
            innerHTML:
                'This example shows the seaming less coupling between C++ and javascript. It uses the C++ ' +
                ' <a href="https://www.pmp-library.org/">PMP</a> library to execute the remeshing step.',
        },
    },
    {
        title: 'Display current run-time',
        src: `
return async (cdnClient) => {

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
} 
`,
        description: {
            innerHTML:
                'Libraries are installed as distinct entities and not included in applications. ' +
                'This snippet presents the state of the CDN client: the modules installed.',
        },
    },
]
