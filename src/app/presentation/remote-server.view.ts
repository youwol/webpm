import { VirtualDOM } from '@youwol/flux-view'

export class RemoteServerSection implements VirtualDOM {
    public readonly class = 'text-center mx-auto'
    public readonly children: VirtualDOM[]

    constructor() {
        this.children = [
            { class: 'my-5' },
            {
                innerText: 'as well as in any K8s cluster. ',
                style: {
                    fontSize: '2rem',
                    fontWeight: 'bolder',
                },
            },
            { class: 'my-3' },
            {
                class: 'text',
                innerHTML:
                    'Nebula can also be installed as a Helm chart in your K8s cluster. Similar to the python ' +
                    'package, it allows you to extend your applications with custom tools and integrate with your ' +
                    'own set of backends - only this time shared with your community. ' +
                    'New Nebula instances are backed up automatically & lazily by the public instance, ' +
                    'however, you can also publish libraries, applications, and assets that exist only in your cluster. ' +
                    'The chart uses standard technologies such as Minio, ScyllaDB, Keycloak, and PostgreSQL, ' +
                    'making it easy to install and configure while minimizing resource consumption.',
            },
        ]
    }
}
