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
                class: 'text',
                innerHTML:
                    'Below are self-contained examples that you can simply copy and paste into an <i>index.html</i> ' +
                    'file and open it in your browser. Documentation about the <a href="https://github.com/youwol/cdn-client">@youwol/cdn-client</a> ' +
                    'API can be found <a href="https://platform.youwol.com/applications/@youwol/cdn-explorer/latest?package=@youwol/cdn-client&tab=doc">here</a>.',
            },
            new CodeEditorView(),
        ]
    }
}
