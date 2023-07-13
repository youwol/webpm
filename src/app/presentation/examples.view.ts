import { VirtualDOM } from '@youwol/flux-view'
import { SnippetsSectionView } from './snippets-section.view'

export class ExamplesSection implements VirtualDOM {
    public readonly class = 'text-center mx-auto'
    public readonly children: VirtualDOM[]

    constructor() {
        this.children = [
            { class: 'my-5' },
            {
                innerText: 'Some examples',
                style: {
                    fontSize: '2rem',
                    fontWeight: 'bolder',
                },
            },
            { class: 'my-3' },
            new SnippetsSectionView(),
        ]
    }
}
