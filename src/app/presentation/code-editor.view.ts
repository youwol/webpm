import { VirtualDOM, ChildrenLike, AttributeLike } from '@youwol/rx-vdom'
import { Common } from '@youwol/rx-code-mirror-editors'
import { examples } from './examples'
import {
    BehaviorSubject,
    combineLatest,
    from,
    Observable,
    of,
    ReplaySubject,
    Subject,
} from 'rxjs'
import { map, mergeMap, tap, withLatestFrom } from 'rxjs/operators'
import { setup } from '../../auto-generated'
import { install } from '@youwol/webpm-client'
import { raiseHTTPErrors } from '@youwol/http-primitives'
import { AssetsGateway } from '@youwol/http-clients'

type Mode = 'code' | 'view' | 'video' | 'links'
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
    public readonly mode$ = new BehaviorSubject<Mode>('code')

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
        this.run$.next(undefined)
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
    public readonly class = 'w-100 d-flex flex-column rounded'
    public readonly children: ChildrenLike
    public readonly style = {
        position: 'relative' as const,
        backgroundColor: '#0c1021',
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
            }),
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
                        children: [ideView],
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
                                ? new ExplanationsView({
                                      filename: example.explanation,
                                      ...size,
                                  })
                                : { tag: 'div' }
                        },
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
    public readonly class = 'w-100 mb-2'
    public readonly children: ChildrenLike
    public readonly style = {
        fontWeight: 600,
        fontSize: '1.2em',
    }
    constructor(params: { state: State }) {
        Object.assign(this, params)
        const examplesHeader: VirtualDOM<'div'> =
            window.innerWidth >= 600
                ? {
                      tag: 'div',
                      class: 'w-100 d-flex align-items-center justify-content-around py-1',
                      children: examples.map((ex) => ({
                          tag: 'div',
                          style: {},
                          class: {
                              source$: this.state.currentExample$,
                              vdomMap: (current) =>
                                  current == ex ? 'fv-text-focus' : '',
                              wrapper: (classes) => `fv-pointer ${classes}`,
                          },
                          innerText: ex.title,
                          onclick: () => this.state.set(ex),
                      })),
                  }
                : {
                      tag: 'div',
                      class: 'w-100 d-flex justify-content-center py-1',
                      children: [
                          {
                              tag: 'select' as const,
                              class: 'mx-auto',
                              onchange: (ev) => {
                                  this.state.set(examples[ev.target['value']])
                              },
                              children: examples.map((ex, i) => ({
                                  tag: 'option' as const,
                                  style: {},
                                  value: `${i}`,
                                  innerText: ex.title,
                              })),
                          },
                      ],
                  }
        this.children = [
            examplesHeader,
            {
                tag: 'div',
                class: 'd-flex justify-content-center fv-bg-background fv-border-top-background-alt',
                children: [
                    new ActionMenuView({
                        state: params.state,
                        target: 'code',
                        icon: 'fa-code',
                        action: () => params.state.mode$.next('code'),
                    }),
                    new ActionMenuView({
                        state: params.state,
                        target: 'view',
                        icon: 'fa-play',
                        action: () => params.state.execute(),
                    }),
                    new ActionMenuView({
                        state: params.state,
                        target: 'links',
                        icon: 'fa-file-alt',
                        action: () => params.state.displayLinks(),
                    }),
                    new ActionMenuView({
                        state: params.state,
                        target: 'video',
                        icon: 'fa-video',
                        action: () => params.state.displayVideo(),
                    }),
                ],
            },
        ]
    }
}

const classesMenuItemEdition = 'p-1 mx-2 fv-hover-xx-lighter fv-pointer'

class ActionMenuView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class: AttributeLike<string>
    public readonly children: ChildrenLike
    public readonly onclick
    constructor(params: { state: State; target: Mode; icon: string; action }) {
        this.class = {
            source$: params.state.mode$,
            vdomMap: (mode: Mode) => {
                return mode == params.target ? 'fv-border-bottom-focus' : ''
            },
            wrapper: (d) => `${d} ${classesMenuItemEdition}`,
        }
        this.children = [
            {
                tag: 'i',
                class: `fas ${params.icon} fv-text-success`,
            },
        ]
        this.onclick = params.action
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

class ExplanationsView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'p-1 w-100'
    public readonly children: ChildrenLike
    public readonly style: {
        width: string
        height: string
        backgroundColor: string
        color: string
    }
    constructor(params: { filename: string; width: number; height: number }) {
        this.style = {
            width: `${params.width}px`,
            height: `${params.height}px`,
            backgroundColor: 'white',
            color: 'black',
        }
        this.children = [
            {
                source$: combineLatest([
                    from(install({ modules: ['marked#^4.2.3'] })),
                    new AssetsGateway.Client().cdn
                        .getResource$({
                            libraryId: setup.assetId,
                            version: setup.version,
                            restOfPath: `/assets/${params.filename}`,
                        })
                        .pipe(
                            raiseHTTPErrors(),
                            mergeMap((blob: string | Blob) =>
                                // Somehow when serving with webpack dev-server, the content is already decoded
                                typeof blob == 'string'
                                    ? of(blob)
                                    : from(blob.text()),
                            ),
                        ),
                ]),
                vdomMap: ([{ marked }, markdown]) => {
                    const parsed = marked.parse(markdown)
                    return { tag: 'div', innerHTML: parsed }
                },
            },
        ]
    }
}
