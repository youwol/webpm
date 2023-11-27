import {
    ChildrenLike,
    render,
    RxHTMLElement,
    VirtualDOM,
} from '@youwol/rx-vdom'
import { setup } from '../../auto-generated'
import { from, merge } from 'rxjs'
import { Modal } from '@youwol/rx-group-views'
import { take } from 'rxjs/operators'
import { install } from '@youwol/webpm-client'

class CellHeader implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'lign-items-center'
    public readonly children: ChildrenLike
    constructor({ imageName, title }) {
        this.children = [
            {
                tag: 'div',
                class: 'd-flex justify-content-center ',
                children: [
                    {
                        tag: 'img',
                        src: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/${imageName}`,
                        style: {
                            opacity: 0.15,
                            height: '200px',
                        },
                    },
                ],
            },
            {
                tag: 'div',
                class: 'm-2 w-100 text-center d-flex justify-content-center',
                style: {
                    fontWeight: 600,
                    position: 'absolute',
                    top: '100px',
                    left: '0%',
                },
                children: [
                    {
                        tag: 'h5',
                        class: 'w-75',
                        style: {
                            fontWeight: 600,
                        },
                        innerText: title,
                    },
                ],
            },
        ]
    }
}

export class Cell implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class =
        'p-3 m-3 d-flex fv-border-background-alt rounded flex-column align-items-center fv-pointer fv-hover-border-focus'
    public readonly children: ChildrenLike
    public readonly style
    public readonly onclick
    constructor({ imageName, text, title }) {
        this.style = {
            width: '400px',
            position: 'relative' as const,
        }
        this.children = [new CellHeader({ imageName, title })]
        this.onclick = () => {
            popupModal(() => ({
                tag: 'div',
                class: 'border p-5 rounded',
                style: {
                    position: 'relative',
                    color: 'black',
                    backgroundColor: 'white',
                    width: '50vw',
                },
                children: [
                    new CellHeader({ imageName, title }),
                    {
                        source$: from(install({ modules: ['marked#^4.2.3'] })),
                        vdomMap: ({ marked }) => {
                            const parsed = marked.parse(text)
                            return { tag: 'div', innerHTML: parsed }
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
