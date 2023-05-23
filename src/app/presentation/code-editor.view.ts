import { VirtualDOM, child$, attr$ } from '@youwol/flux-view'
import { Common } from '@youwol/fv-code-mirror-editors'
import { examples } from './examples'
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs'
import { catchError, mergeMap, tap, withLatestFrom } from 'rxjs/operators'
import * as cdnClient from '@youwol/cdn-client'

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
            mergeMap(([, file]) => {
                try {
                    const fct = new Function(file.content)()
                    const result = fct(cdnClient, this.message$)
                    return from(result).pipe(
                        catchError((err) => {
                            console.log('Got an error 0', err)
                            return of(undefined)
                        }),
                    )
                } catch (err) {
                    console.log(err)
                    return of(undefined)
                }
            }),
            catchError((err) => {
                console.log('Got an error', err)
                return of(undefined)
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
    public readonly class = 'w-100 d-flex flex-column p-3 rounded'
    public readonly children: VirtualDOM[]

    constructor() {
        const ideView = new Common.CodeEditorView({
            ideState: this.state.ideState,
            path: './main',
            language: 'javascript',
            config: {
                extraKeys: {
                    'Ctrl-Enter': () => {
                        this.state.execute()
                    },
                },
            },
        })
        this.children = [
            new EditorBannerView({ state: this.state }),
            child$(this.state.message$, (message) => new MessageView(message)),
            {
                class: attr$(this.state.mode$, (mode) =>
                    mode == 'code' ? 'flex-grow-1' : 'd-none',
                ),
                style: { height: '800px' },
                children: [ideView],
            },
            {
                class: attr$(this.state.mode$, (mode) =>
                    mode == 'view' ? 'flex-grow-1' : 'd-none',
                ),
                style: { height: '800px' },
                children: [child$(this.state.result$, (vDom) => vDom)],
            },
            { class: 'my-2' },
        ]
    }
}

export class MessageView implements VirtualDOM {
    public readonly tag = 'pre'
    public readonly class = 'd-flex align-items-center fv-text-primary'
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
        'w-100 d-flex align-items-center justify-content-center fv-text-primary py-1 mb-2'
    public readonly children: VirtualDOM[]

    constructor(params: { state: State }) {
        Object.assign(this, params)
        this.children = [
            {
                class: attr$(
                    this.state.currentExample$,
                    (ex): string =>
                        examples.indexOf(ex) > 0
                            ? 'fv-text-focus fv-pointer fv-hover-x-lighter'
                            : 'fv-text-disabled fv-xx-darker',
                    {
                        wrapper: (d) => `${d} fas fa-step-backward fa-2x`,
                    },
                ),
                onclick: () => this.state.prev(),
            },
            {
                class: 'flex-grow-1 d-flex flex-column',
                children: [
                    {
                        class: 'w-100 d-flex align-items-center',
                        children: [
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
                                class: 'd-flex align-items-center p-1 px-2 fv-pointer fv-text-focus fv-bg-background fv-hover-x-lighter fv-border-primary',
                                children: [
                                    {
                                        class: attr$(this.state.mode$, (mode) =>
                                            mode == 'code'
                                                ? 'fas fa-play'
                                                : 'fas fa-pen',
                                        ),
                                    },
                                    { class: 'mx-1' },
                                    {
                                        innerText: attr$(
                                            this.state.mode$,
                                            (mode) =>
                                                mode == 'code' ? 'run' : 'edit',
                                        ),
                                    },
                                ],
                                onclick: () => {
                                    this.state.mode$.value == 'code'
                                        ? this.state.execute()
                                        : this.state.mode$.next('code')
                                },
                            },
                            { class: 'flex-grow-1 fv-border-primary mx-2' },
                        ],
                    },
                    {
                        class: 'px-3 text-center py-1',
                        children: [
                            child$(
                                this.state.currentExample$,
                                (example) => example.description,
                            ),
                        ],
                    },
                ],
            },
            {
                class: attr$(
                    this.state.currentExample$,
                    (ex): string =>
                        examples.indexOf(ex) < examples.length - 1
                            ? 'fv-text-focus fv-pointer fv-hover-x-lighter'
                            : 'fv-text-disabled fv-xx-darker',
                    {
                        wrapper: (d) => `${d} fas fa-step-forward fa-2x`,
                    },
                ),
                onclick: () => this.state.next(),
            },
        ]
    }
}
