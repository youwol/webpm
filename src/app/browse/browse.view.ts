import { VirtualDOM, child$ } from '@youwol/flux-view'
import { from } from 'rxjs'
import { install } from '@youwol/cdn-client'

export class BrowseView implements VirtualDOM {
    public readonly class = 'h-100 w-100'
    public readonly children: VirtualDOM[]
    constructor() {
        this.children = [
            child$(
                from(install({ modules: ['@youwol/os-core#^0.1.10'] })),
                () => ({
                    tag: 'iframe',
                    class: 'w-100 h-100',
                    src: '/applications/@youwol/npm-explorer/latest',
                }),
            ),
        ]
    }
}
