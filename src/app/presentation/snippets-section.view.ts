import { CodeEditorView } from './code-editor.view'
import { VirtualDOM } from '@youwol/flux-view'

export class SnippetsSectionView implements VirtualDOM {
    public readonly class = 'mx-auto'
    public readonly style = {
        maxWidth: '800px',
    }
    public readonly children: VirtualDOM[]

    public readonly connectedCallback: (elem: HTMLDivElement) => void
    private htmlElement: HTMLDivElement

    constructor() {
        const observerResize = new window['ResizeObserver'](() => {
            this.htmlElement.style.display =
                document.body.clientWidth > 800 ? '' : 'contents'
        })
        this.connectedCallback = (elem) => {
            this.htmlElement = elem
            observerResize.observe(document.body)
        }
        this.children = [
            {
                class: 'text-center',
                innerHTML:
                    'Following examples use the <a href="https://github.com/youwol/cdn-client">CdnClient package</a> to fetch run times from W3Swarm.',
            },
            new CodeEditorView(),
        ]
    }
}
