import {
    AnyVirtualDOM,
    ChildrenLike,
    render,
    RxHTMLElement,
    VirtualDOM,
} from '@youwol/rx-vdom'
import { setup } from '../../auto-generated'
import { Modal } from '@youwol/rx-group-views'
import { from, merge } from 'rxjs'
import { take } from 'rxjs/operators'
import { install } from '@youwol/webpm-client'

export class CellHeader implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'd-flex flex-wrap align-items-center'
    public readonly children: ChildrenLike
    constructor({
        imageName,
        title,
        scaleFactor,
    }: {
        imageName: string
        title: string
        scaleFactor?: number
    }) {
        const s = scaleFactor || 1
        this.children = [
            {
                tag: 'img',
                width: s * 75,
                height: s * 75,
                src: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/${imageName}`,
            },
            {
                class: 'm-2',
                tag: 'h6',
                style: {
                    fontWeight: 600,
                    fontSize: `${s * 16}px`,
                },
                innerText: title,
            },
        ]
    }
}
export class CardView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class =
        'd-flex  flex-column align-items-center text-justify p-2 m-2 rounded'
    public readonly children: ChildrenLike
    public readonly style = {
        width: '250px',
    }
    constructor({
        imageName,
        abstract,
        title,
        more,
    }: {
        imageName: string
        abstract: AnyVirtualDOM
        title: string
        more?: string
    }) {
        this.children = [
            new CellHeader({ imageName, title }),
            {
                tag: 'div',
                class: 'm-2 h-100 d-flex flex-column',
                children: [
                    abstract,
                    { tag: 'div', class: 'flex-grow-1' },
                    more
                        ? new MoreButton(title, more, imageName)
                        : { tag: 'div' },
                ],
            },
        ]
    }
}

export class EmptyCard implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'col-md-4 d-flex  align-items-center'
    public readonly children: ChildrenLike
    constructor() {
        this.children = []
    }
}

class MoreButton implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'w-100 d-flex justify-content-center'
    public readonly children = [
        {
            tag: 'div' as const,
            class: 'text-center rounded fas fa-ellipsis-h fv-pointer border p-2',
        },
    ]
    public readonly onclick: (ev: MouseEvent) => void
    constructor(title: string, markdown: string, imageName: string) {
        this.onclick = () => {
            popupModal(() => ({
                tag: 'div',
                class: 'border p-5 rounded overflow-auto',
                style: {
                    position: 'relative',
                    color: 'black',
                    backgroundColor: 'white',
                    width: '75vw',
                    maxWidth: '800px',
                    maxHeight: '75vh',
                },
                children: [
                    new CellHeader({ imageName, title, scaleFactor: 2 }),
                    { tag: 'div', class: 'my-5' },
                    {
                        source$: from(install({ modules: ['marked#^4.2.3'] })),
                        vdomMap: ({ marked }) => {
                            const parsed = marked.parse(markdown)
                            return {
                                tag: 'div',
                                class: 'text-justify',
                                innerHTML: parsed,
                            }
                        },
                    },
                ],
            }))
        }
    }
}

export function popupModal(
    contentView: (modalState) => VirtualDOM<'div'>,
    sideEffect = (_htmlElement: HTMLDivElement, _state: Modal.State) => {
        /* noop*/
    },
) {
    const modalState = new Modal.State()

    const view = new Modal.View({
        state: modalState,
        contentView,
        connectedCallback: (elem: RxHTMLElement<'div'>) => {
            sideEffect(elem, modalState)
            elem.children[0].classList.add('fv-text-primary')
            // https://stackoverflow.com/questions/63719149/merge-deprecation-warning-confusion
            merge(...[modalState.cancel$, modalState.ok$])
                .pipe(take(1))
                .subscribe(() => {
                    modalDiv.remove()
                })
        },
    })
    const modalDiv = render(view)
    document.querySelector('body').appendChild(modalDiv)
}