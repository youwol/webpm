import { VirtualDOM } from '@youwol/flux-view'

export class OnPremiseView implements VirtualDOM {
    public readonly class = ''
    public readonly children: VirtualDOM[]
    constructor() {
        this.children = [
            {
                innerText: 'TODO',
            },
        ]
    }
}
