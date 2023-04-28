import { VirtualDOM } from '@youwol/flux-view'

export class CdnSectionView {
    public readonly class = 'text-center text-justify mx-auto'
    public readonly children: VirtualDOM[]
    constructor() {
        this.children = [
            {
                class: 'separator',
            },
            { class: 'my-5' },
            {
                innerText: 'A dependencies aware CDN...',
                style: {
                    fontSize: '2rem',
                    fontWeight: 'bolder',
                },
            },
            { class: 'my-3' },
            {
                class: 'text',
                innerHTML:
                    'Unlike regular CDNs that only provide access to specific isolated resources, W3Swarm offers a ' +
                    'proper dependencies resolution and linking feature. In fact, just like in a node environment, ' +
                    'different versions of a particular library may co-exist in the runtime and linked to the appropriate consumer. ' +
                    'This versatility can be leveraged by applications to enable powerful custom code injection, ' +
                    'making it particularly valuable for plugin-based architectures and fields like numerical science. ' +
                    'By-the-way, all applications are expose through a simple URL:' +
                    '<pre> w3swarm/applications/{name-of-package}/{semver-query}</pre>',
            },
        ]
    }
}
