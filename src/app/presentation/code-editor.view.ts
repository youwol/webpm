import { VirtualDOM, ChildrenLike, FluxViewVirtualDOM } from '@youwol/rx-vdom'
import { Common } from '@youwol/fv-code-mirror-editors'
import { examples } from './examples'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
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
    public readonly mode$ = new BehaviorSubject<'code' | 'view' | 'video'>(
        'code',
    )

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
}

export class CodeEditorView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly state = new State()
    public readonly class = 'w-100 d-flex flex-column py-2 rounded'
    public readonly children: ChildrenLike
    public readonly style = {
        position: 'relative' as const,
    }
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
                        tag: 'div',
                        class: this.state.mode$.pipe(
                            map((mode) =>
                                mode == 'video'
                                    ? 'flex-grow-1 text-left d-flex'
                                    : 'd-none',
                            ),
                        ),
                        connectedCallback: (elem) => {
                            const iframe = document.createElement('iframe')
                            iframe.src =
                                'https://www.youtube.com/embed/fTJH72_wdSg?si=isW48l2rnMCfW9o1'
                            iframe['credentialless'] = true
                            elem.appendChild(iframe)
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
