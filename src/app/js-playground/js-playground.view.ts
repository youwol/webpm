import { VirtualDOM } from '@youwol/flux-view'

export class JsPlaygroundView implements VirtualDOM {
    public readonly class = 'flex-grow-1'
    public readonly children: VirtualDOM[]
    constructor() {
        this.children = [
            {
                tag: 'iframe',
                class: 'w-100 h-100',
                src: '/applications/@youwol/js-playground/latest',
            },
        ]
    }
}
