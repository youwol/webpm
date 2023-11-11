import { VirtualDOM, attr$, child$ } from '@youwol/flux-view'
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
    public readonly result$: Observable<unknown>
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

export class CodeEditorView implements VirtualDOM {
    public readonly state = new State()
    public readonly class = 'w-100 d-flex flex-column py-2 rounded'
    public readonly children: VirtualDOM[]
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
            }),
            //child$(this.state.message$, (message) => new MessageView(message)),
            {
                class: 'w-100 overflow-auto',
                style: {
                    maxHeight: '1000px',
                },
                children: [
                    {
                        class: attr$(this.state.mode$, (mode) =>
                            mode == 'code'
                                ? 'flex-grow-1 text-left d-flex'
                                : 'd-none',
                        ),
                        //style: { height: '50vh' },
                        children: [
                            ideView,
                            child$(this.infoToggled$, (displayed) => {
                                return displayed
                                    ? {
                                          class: 'w-100',
                                          innerHTML:
                                              this.state.currentExample$.value
                                                  .description.innerHTML,
                                      }
                                    : {}
                            }),
                        ],
                    },
                    {
                        class: attr$(this.state.mode$, (mode) =>
                            mode == 'view' ? 'flex-grow-1' : 'd-none',
                        ),
                        children: [
                            {
                                tag: 'iframe',
                                width: '100%',
                                style: { height: '49vh' },
                                srcdoc: attr$(this.state.result$, (r) => r),
                            },
                        ],
                    },
                ],
            },
        ]
    }
}

export class MessageView implements VirtualDOM {
    public readonly tag = 'pre'
    public readonly class = 'd-flex align-items-center'
    public readonly children: VirtualDOM[]

    constructor(message) {
        if (message == 'done') {
            return
        }
        this.children = [
            {
                class: 'fas fa-spinner fa-spin mx-2',
            },
            {
                innerText: message,
            },
        ]
    }
}

export class EditorBannerView implements VirtualDOM {
    public readonly state: State
    public readonly class =
        'w-100 d-flex align-items-center justify-content-center py-1 mb-2'
    public readonly children: VirtualDOM[]
    public readonly infoToggled$: BehaviorSubject<boolean>
    constructor(params: {
        state: State
        infoToggled$: BehaviorSubject<boolean>
    }) {
        Object.assign(this, params)
        this.children = [
            {
                class: 'flex-grow-1 d-flex flex-column',
                children: [
                    {
                        class: 'w-100 d-flex align-items-center',
                        children: [
                            {
                                class: attr$(
                                    this.state.currentExample$,
                                    (ex): string =>
                                        examples.indexOf(ex) > 0
                                            ? 'fv-text-focus fv-pointer fv-hover-x-lighter'
                                            : 'fv-text-disabled fv-xx-darker',
                                    {
                                        wrapper: (d) =>
                                            `${d} fas fa-step-backward fa-2x`,
                                    },
                                ),
                                onclick: () => this.state.prev(),
                            },
                            { class: 'flex-grow-1 fv-border-primary mx-2' },
                            {
                                class: 'fv-text-focus',
                                style: {
                                    fontSize: '1.3rem',
                                    fontWeight: 'bolder',
                                },
                                innerText: attr$(
                                    this.state.currentExample$,
                                    (example) => example.title,
                                ),
                            },
                            { class: 'mx-3' },
                            {
                                class: 'd-flex align-items-center p-1 px-2 fv-pointer fv-text-success fv-hover-x-lighter',
                                children: [
                                    {
                                        class: attr$(
                                            this.state.mode$,
                                            (mode) =>
                                                mode == 'code'
                                                    ? 'fas fa-play'
                                                    : 'fas fa-pen',
                                        ),
                                    },
                                ],
                                onclick: () => {
                                    this.state.mode$.value == 'code'
                                        ? this.state.execute()
                                        : this.state.mode$.next('code')
                                },
                            },
                            { class: 'mx-2' },
                            child$(this.state.mode$, (mode) => {
                                return mode == 'view'
                                    ? {}
                                    : {
                                          class: attr$(
                                              this.infoToggled$,
                                              (toggled): string =>
                                                  toggled
                                                      ? 'fv-text-focus'
                                                      : 'fv-hover-text-focus',
                                              {
                                                  wrapper: (d) =>
                                                      `${d} d-flex align-items-center p-1 px-2 fv-pointer fv-hover-x-lighter`,
                                              },
                                          ),
                                          children: [
                                              {
                                                  class: 'fas fa-info-circle',
                                              },
                                          ],
                                          onclick: () => {
                                              this.infoToggled$.next(
                                                  !this.infoToggled$.value,
                                              )
                                          },
                                      }
                            }),

                            { class: 'flex-grow-1 fv-border-primary mx-2' },
                            {
                                class: attr$(
                                    this.state.currentExample$,
                                    (ex): string =>
                                        examples.indexOf(ex) <
                                        examples.length - 1
                                            ? 'fv-text-focus fv-pointer fv-hover-x-lighter'
                                            : 'fv-text-disabled fv-xx-darker',
                                    {
                                        wrapper: (d) =>
                                            `${d} fas fa-step-forward fa-2x`,
                                    },
                                ),
                                onclick: () => this.state.next(),
                            },
                        ],
                    },
                    // {
                    //     class: 'text-small rounded',
                    //     style: {
                    //         //backgroundColor: 'rgba(255,255,255,0.8)',
                    //         fontStyle: 'italic',
                    //         fontFamily: "Arimo', sans-serif;",
                    //         textAlign: 'justify',
                    //     },
                    //     //class: 'text-justify py-1',
                    //     children: [
                    //         child$(
                    //             this.state.currentExample$,
                    //             (example) => example.description,
                    //         ),
                    //     ],
                    // },
                ],
            },
        ]
    }
}
