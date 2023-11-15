import { VirtualDOM, ChildrenLike, FluxViewVirtualDOM } from '@youwol/rx-vdom'
import { Common } from '@youwol/fv-code-mirror-editors'
import { examples } from './examples'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { map, tap, withLatestFrom } from 'rxjs/operators'

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
    public readonly mode$ = new BehaviorSubject<'code' | 'view'>('code')
    public readonly message$ = new Subject()
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

    next() {
        const index = examples.indexOf(this.currentExample$.value)
        index < examples.length - 1 && this.set(examples[index + 1])
    }
    prev() {
        const index = examples.indexOf(this.currentExample$.value)
        index > 0 && this.set(examples[index - 1])
    }
    private set(example) {
        this.mode$.next('code')
        this.ideState.update({
            path: './main',
            content: example.src,
            updateOrigin: { uid: 'State' },
        })
        this.currentExample$.next(example)
    }
}

export class CodeEditorView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly state = new State()
    public readonly class = 'w-100 d-flex flex-column py-2 rounded'
    public readonly children: ChildrenLike
    public readonly infoToggled$ = new BehaviorSubject<boolean>(false)
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
                infoToggled$: this.infoToggled$,
            }) as FluxViewVirtualDOM,
            {
                tag: 'div',
                class: 'w-100 overflow-auto',
                style: {
                    maxHeight: '1000px',
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
                        //style: { height: '50vh' },
                        children: [
                            ideView as FluxViewVirtualDOM,
                            {
                                source$: this.infoToggled$,
                                vdomMap: (displayed) => {
                                    return displayed
                                        ? {
                                              tag: 'div',
                                              class: 'w-100',
                                              innerHTML:
                                                  this.state.currentExample$
                                                      .value.description
                                                      .innerHTML,
                                          }
                                        : {}
                                },
                            },
                            {
                                source$: this.state.mode$,
                                vdomMap: (mode) => {
                                    return mode == 'view'
                                        ? { tag: 'div' }
                                        : {
                                              tag: 'div',
                                              class: 'd-flex align-items-center p-1 px-2 fv-pointer fv-hover-text-focus',
                                              children: [
                                                  {
                                                      tag: 'div',
                                                      class: this.infoToggled$.pipe(
                                                          map((toggled) =>
                                                              toggled
                                                                  ? 'fas fa-chevron-left fv-text-background'
                                                                  : 'fas fa-chevron-left fv-text-focus',
                                                          ),
                                                      ),
                                                  },
                                                  {
                                                      tag: 'div',
                                                      class: 'fas fa-info-circle',
                                                  },
                                                  {
                                                      tag: 'div',
                                                      class: this.infoToggled$.pipe(
                                                          map((toggled) =>
                                                              toggled
                                                                  ? 'fas fa-chevron-right fv-text-focus'
                                                                  : 'fas fa-chevron-right fv-text-background',
                                                          ),
                                                      ),
                                                  },
                                              ],
                                              onclick: () => {
                                                  this.infoToggled$.next(
                                                      !this.infoToggled$.value,
                                                  )
                                              },
                                          }
                                },
                            },
                        ],
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
                ],
            },
        ]
    }
}

export class MessageView implements VirtualDOM<'pre'> {
    public readonly tag = 'pre'
    public readonly class = 'd-flex align-items-center'
    public readonly children: ChildrenLike

    constructor(message) {
        if (message == 'done') {
            return
        }
        this.children = [
            {
                tag: 'div',
                class: 'fas fa-spinner fa-spin mx-2',
            },
            { tag: 'div', innerText: message },
        ]
    }
}

export class EditorBannerView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly state: State
    public readonly class =
        'w-100 d-flex align-items-center justify-content-center py-1 mb-2'
    public readonly children: ChildrenLike
    public readonly infoToggled$: BehaviorSubject<boolean>
    constructor(params: {
        state: State
        infoToggled$: BehaviorSubject<boolean>
    }) {
        Object.assign(this, params)
        this.children = [
            {
                tag: 'div',
                class: 'flex-grow-1 d-flex flex-column',
                children: [
                    {
                        tag: 'div',
                        class: 'w-100 d-flex align-items-center',
                        children: [
                            {
                                tag: 'div',
                                class: {
                                    source$: this.state.currentExample$,
                                    vdomMap: (
                                        ex: typeof this.state.currentExample$.value,
                                    ): string =>
                                        examples.indexOf(ex) > 0
                                            ? 'fv-text-focus fv-pointer fv-hover-x-lighter'
                                            : 'fv-text-disabled fv-xx-darker',
                                    wrapper: (d) =>
                                        `${d} fas fa-step-backward fa-2x`,
                                },
                                onclick: () => this.state.prev(),
                            },
                            {
                                tag: 'div',
                                class: 'flex-grow-1 fv-border-primary mx-2',
                            },
                            {
                                tag: 'div',
                                style: {
                                    fontSize: '1.3rem',
                                    fontWeight: 'bolder',
                                },
                                innerText: this.state.currentExample$.pipe(
                                    map((ex) => ex.title),
                                ),
                            },
                            { tag: 'div', class: 'mx-3' },
                            {
                                tag: 'div',
                                class: 'd-flex align-items-center p-1 px-2 fv-pointer fv-text-success fv-hover-x-lighter',
                                children: [
                                    {
                                        tag: 'div',
                                        class: this.state.mode$.pipe(
                                            map((mode) =>
                                                mode == 'code'
                                                    ? 'fas fa-play'
                                                    : 'fas fa-pen',
                                            ),
                                        ),
                                    },
                                ],
                                onclick: () => {
                                    this.state.mode$.value == 'code'
                                        ? this.state.execute()
                                        : this.state.mode$.next('code')
                                },
                            },
                            { tag: 'div', class: 'mx-2' },
                            {
                                tag: 'div',
                                class: 'flex-grow-1 fv-border-primary mx-2',
                            },
                            {
                                tag: 'div',
                                class: {
                                    source$: this.state.currentExample$,
                                    vdomMap: (
                                        ex: typeof this.state.currentExample$.value,
                                    ): string =>
                                        examples.indexOf(ex) <
                                        examples.length - 1
                                            ? 'fv-text-focus fv-pointer fv-hover-x-lighter'
                                            : 'fv-text-disabled fv-xx-darker',
                                    wrapper: (d) =>
                                        `${d} fas fa-step-forward fa-2x`,
                                },
                                onclick: () => this.state.next(),
                            },
                        ],
                    },
                ],
            },
        ]
    }
}
