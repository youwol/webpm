import { VirtualDOM, ChildrenLike, FluxViewVirtualDOM } from '@youwol/rx-vdom'
import { Common } from '@youwol/fv-code-mirror-editors'
import { examples } from './examples'
import {
    BehaviorSubject,
    combineLatest,
    Observable,
    ReplaySubject,
    Subject,
} from 'rxjs'
import { map, tap, withLatestFrom } from 'rxjs/operators'
import { setup } from '../../auto-generated'

class State {
    public readonly currentExample$ = new BehaviorSubject(examples[0])
    public readonly ideState = new Common.IdeState({
        files: [
            {
                path: './main',
                content: examples[0].src,
            },
        ],
        defaultFileSystem: Promise.resolve(new Map<string, string>()),
    })
    public readonly run$ = new Subject()
    public readonly result$: Observable<string>
    public readonly mode$ = new BehaviorSubject<
        'code' | 'view' | 'video' | 'links'
    >('code')

    constructor() {
        this.result$ = this.run$.pipe(
            withLatestFrom(this.ideState.updates$['./main']),
            map(([_, file]) => {
                return file.content
            }),
            tap(() => {
                this.mode$.next('view')
            }),
        )
    }

    execute() {
        this.run$.next()
    }

    set(example) {
        this.mode$.next('code')
        this.ideState.update({
            path: './main',
            content: example.src,
            updateOrigin: { uid: 'State' },
        })
        this.currentExample$.next(example)
    }
    displayVideo() {
        this.mode$.next('video')
    }
    displayLinks() {
        this.mode$.next('links')
    }
}

export class CodeEditorView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly state = new State()
    public readonly class = 'w-100 d-flex flex-column py-2 rounded'
    public readonly children: ChildrenLike
    public readonly style = {
        position: 'relative' as const,
    }
    public readonly currentHTMLElement$ = new ReplaySubject<HTMLElement>(1)
    public readonly size$ = new ReplaySubject<{
        width: number
        height: number
    }>(1)
    constructor() {
        const ideView = new Common.CodeEditorView({
            ideState: this.state.ideState,
            path: './main',
            language: 'htmlmixed',
            config: {
                extraKeys: {
                    'Ctrl-Enter': () => {
                        this.state.execute()
                    },
                },
            },
        })
        this.children = [
            new EditorBannerView({
                state: this.state,
            }) as FluxViewVirtualDOM,
            {
                tag: 'div',
                class: 'w-100 overflow-auto',
                style: {
                    maxHeight: '700px',
                },
                connectedCallback: (elem) => {
                    this.currentHTMLElement$.next(elem)
                },
                children: [
                    {
                        tag: 'div',
                        class: this.state.mode$.pipe(
                            map((mode) =>
                                mode == 'code'
                                    ? 'flex-grow-1 text-left d-flex'
                                    : 'd-none',
                            ),
                        ),
                        children: [ideView as FluxViewVirtualDOM],
                    },
                    {
                        tag: 'div',
                        class: this.state.mode$.pipe(
                            map((mode) =>
                                mode == 'view' ? 'flex-grow-1' : 'd-none',
                            ),
                        ),
                        children: [
                            {
                                tag: 'iframe',
                                width: '100%',
                                style: { height: '49vh' },
                                srcdoc: this.state.result$,
                            },
                        ],
                    },
                    {
                        source$: combineLatest([
                            this.state.mode$,
                            this.state.currentExample$,
                            this.size$,
                        ]),
                        vdomMap: ([mode, example, size]): VirtualDOM<'div'> => {
                            return mode === 'video'
                                ? new EmbeddedYoutube({
                                      url: example.youtube,
                                      ...size,
                                  })
                                : { tag: 'div' }
                        },
                    },
                    {
                        source$: combineLatest([
                            this.state.mode$,
                            this.state.currentExample$,
                            this.size$,
                        ]),
                        vdomMap: ([mode, example, size]): VirtualDOM<'div'> => {
                            return mode === 'links'
                                ? new LinksView({
                                      links: example.links,
                                      ...size,
                                  })
                                : { tag: 'div' }
                        },
                    },
                    {
                        source$: this.state.mode$,
                        vdomMap: (mode: 'code' | 'view') =>
                            mode == 'code'
                                ? new MenuViewEdition(this.state)
                                : new MenuViewRun(this.state),
                    },
                ],
            },
        ]
        combineLatest([
            this.state.currentExample$,
            this.currentHTMLElement$,
        ]).subscribe(([_, elem]) => {
            this.size$.next({
                width: elem.offsetWidth,
                height: elem.offsetHeight,
            })
        })
    }
}

export class EditorBannerView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly state: State
    public readonly class =
        'w-100 d-flex align-items-center justify-content-around py-1 mb-2'
    public readonly children: ChildrenLike
    public readonly style = {
        backgroundColor: '#0c102100',
        fontWeight: 600,
        fontSize: '1.2em',
    }
    constructor(params: { state: State }) {
        Object.assign(this, params)
        this.children = examples.map((ex) => ({
            tag: 'div',
            class: {
                source$: this.state.currentExample$,
                vdomMap: (current) => (current == ex ? 'fv-text-focus' : ''),
                wrapper: (classes) => `fv-pointer ${classes}`,
            },
            innerText: ex.title,
            onclick: () => this.state.set(ex),
        }))
    }
}

const styleMenuEdition = {
    position: 'absolute' as const,
    top: '50px',
    right: '0%',
    zIndex: 1000,
    width: '150px',
}
const classesMenuEdition = 'fv-text-primary px-3 py-4 fv-xx-lighter'
const classesMenuItemEdition =
    'w-100 fv-bg-background-alt border rounded p-2 d-flex align-items-center justify-content-around fv-hover-xx-lighter fv-pointer'
class MenuViewEdition implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly children: ChildrenLike
    public readonly class = classesMenuEdition
    public readonly style = styleMenuEdition

    constructor(state: State) {
        this.children = [
            {
                tag: 'div',
                class: classesMenuItemEdition,
                onclick: () => state.execute(),
                children: [
                    {
                        tag: 'i',
                        class: 'fas fa-play fv-text-success',
                    },
                    {
                        tag: 'div',
                        innerText: 'Run',
                    },
                ],
            },
            { tag: 'div', class: 'my-3' },
            {
                tag: 'div',
                class: classesMenuItemEdition,
                onclick: () => state.displayVideo(),
                children: [
                    {
                        tag: 'img',
                        height: 25,
                        src: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/YouTube.png`,
                    },
                    {
                        tag: 'div',
                        innerText: 'Explain',
                    },
                ],
            },
            { tag: 'div', class: 'my-3' },
            {
                tag: 'div',
                class: classesMenuItemEdition,
                onclick: () => state.displayLinks(),
                children: [
                    {
                        tag: 'i',
                        class: 'fas fa-external-link-square-alt fv-text-success',
                    },
                    {
                        tag: 'div',
                        innerText: 'Links',
                    },
                ],
            },
        ]
    }
}

class MenuViewRun implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly children: ChildrenLike
    public readonly class = classesMenuEdition
    public readonly style = styleMenuEdition
    constructor(state: State) {
        this.children = [
            {
                tag: 'div',
                class: classesMenuItemEdition,
                onclick: () => state.mode$.next('code'),
                children: [
                    {
                        tag: 'i',
                        class: 'fas fa-pen mx-3 fv-text-success',
                    },
                    {
                        tag: 'div',
                        innerText: 'Edit',
                    },
                ],
            },
        ]
    }
}

class EmbeddedYoutube implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'flex-grow-1 text-left d-flex flex-column'
    public readonly connectedCallback: (elem: HTMLElement) => void
    public readonly children: ChildrenLike
    constructor(params: { url: string; width: number; height: number }) {
        // Check if the browser is Firefox
        const isFirefox = navigator.userAgent.toLowerCase().includes('firefox')
        // Check if the browser is Safari
        const isSafari = /^((?!chrome|android).)*safari/i.test(
            navigator.userAgent,
        )

        if (isSafari || isFirefox) {
            this.children = [
                {
                    tag: 'div',
                    class: 'p-5',
                    style: {
                        width: '' + params.width + 'px',
                        height: '' + params.height + 'px',
                    },
                    children: [
                        {
                            tag: 'div',
                            innerText:
                                'For now embedded video is not working on Safari or Firefox, please visit this link:',
                        },
                        {
                            tag: 'a',
                            href: params.url,
                            innerText: 'Youtube video',
                        },
                    ],
                },
            ]
            return
        }
        this.connectedCallback = (elem) => {
            const iframe = document.createElement('iframe')
            iframe.src = params.url
            iframe['credentialless'] = true
            iframe.width = '' + params.width + 'px'
            iframe.height = '' + params.height + 'px'
            elem.appendChild(iframe)
        }
    }
}

class LinksView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'p-5 w-100'
    public readonly children: ChildrenLike
    public readonly style: { width: string; height: string }
    constructor(params: {
        links: { title: string; url: string; description: string }[]
        width: number
        height: number
    }) {
        this.style = {
            width: `${params.width}px`,
            height: `${params.height}px`,
        }
        const introView = {
            tag: 'div' as const,
            class: 'my-2',
            innerText:
                'Below are supplementary contents for delving further into topics related to the example:',
        }
        const linksViews = params.links.map((link) => {
            return {
                tag: 'div' as const,
                class: 'd-flex align-items-center w-100',
                children: [
                    {
                        tag: 'a' as const,
                        innerText: link.title,
                        href: link.url,
                        target: '_blank',
                    },
                    { class: 'mx-2' },
                    {
                        tag: 'div' as const,
                        class: 'flex-grow-1',
                        innerHTML: link.description,
                    },
                ],
            }
        })
        this.children = [introView, ...linksViews]
    }
}
