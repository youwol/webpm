import { VirtualDOM } from '@youwol/flux-view'

export class LocalServerSection implements VirtualDOM {
    public readonly class = 'text-center mx-auto'
    public readonly children: VirtualDOM[]

    constructor() {
        this.children = [
            { class: 'my-5' },
            {
                innerText: 'running on a PC...',
                style: {
                    fontSize: '2rem',
                    fontWeight: 'bolder',
                },
            },
            { class: 'my-3' },
            {
                class: 'text',
                innerHTML:
                    'The <a href="https://pypi.org/project/youwol/">youwol</a> Python package allows you to emulate the entire WebPM environment on ' +
                    'your PC, with assets installed lazily into local databases as needed. ' +
                    'This local environment provides numerous benefits, including an unlimited cache for the browser, ' +
                    'no-latency access to files of any size, secure storage, and the ability to use locally ' +
                    'installed programs in applications. ' +
                    'It is also highly configurable and can meet a broad range of requirements: think of it as local ' +
                    '& easy to use k8s cluster. ' +
                    'These make it a perfect fit for developers to easily publish their code within WebPM remote ' +
                    'instance(s).',
            },
        ]
    }
}
