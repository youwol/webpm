import { VirtualDOM, children$ } from '@youwol/flux-view'
export {}
import { AssetsGateway } from '@youwol/http-clients'
import { forkJoin, Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { raiseHTTPErrors } from '@youwol/http-primitives'
class State {
    public readonly items$: Observable<{ name: string }[]>
    public readonly folders = [
        '0d4cbe1e-7792-4d9b-a2f1-cc4242d098a6',
        '2b89091f-eb62-441b-9253-1870e6fe35e0',
        '9916e0db-3b07-4699-a2c8-bbc9727727f7',
        '6a0b0c24-d8bf-463e-b694-a69b3751e0bf',
        '445005a2-c69c-416a-becb-6bf5f7a04010',
        'f4aa0761-d008-4ac3-9406-58fc3c7bb188',
    ]
    constructor() {
        const client = new AssetsGateway.Client()
        this.items$ = forkJoin(
            this.folders.map((parentId) => {
                return client.explorer
                    .queryChildren$({
                        parentId,
                    })
                    .pipe(raiseHTTPErrors())
            }),
        ).pipe(
            map((results) => {
                return results.map((resp) => resp.items).flat()
            }),
            tap((d) => console.log(d)),
            map((d) =>
                [...new Set(d.map((l) => l.name))]
                    .sort()
                    .map((name) => ({ name })),
            ),
        )
    }
}
export class BrowseView implements VirtualDOM {
    public readonly state = new State()
    public readonly class = 'w-100 flex-grow-1 overflow-auto'
    public readonly style = {
        minHeight: '0px',
        fontFamily: 'Lexend, sans-serif',
    }
    public readonly children: VirtualDOM[]

    constructor() {
        this.children = [
            new SearchBar(),
            new ResultsView({ state: this.state }),
        ]
    }
}

export class SearchBar implements VirtualDOM {
    public readonly class = 'my-2 w-100'
    public readonly children = []
    constructor() {
        this.children = [
            {
                class: 'w-50 d-flex align-items-center mx-auto',
                children: [
                    {
                        class: 'd-flex align-items-center p-2 w-100',
                        style: {
                            backgroundColor: '#f2f2f2',
                        },
                        children: [
                            {
                                class: 'fas fa-search',
                            },
                            {
                                style: {
                                    background: 'none',
                                    fontFamily:
                                        "'Fira Mono', 'Andale Mono', 'Consolas', monospace",
                                    fontSize: '16px',
                                    letterSpacing: '0px',
                                    border: 'none',
                                    outline: 'unset',
                                    height: '40px',
                                    paddingLeft: '10px',
                                    borderRadius: '0',
                                },
                                class: 'flex-grow-1',
                                tag: 'input',
                                type: 'text',
                                placeholder: 'Search packages',
                            },
                        ],
                    },
                ],
            },
        ]
    }
}

export class ResultsView implements VirtualDOM {
    public readonly class = 'mx-auto'
    public readonly style = {
        maxWidth: '800px',
    }
    public readonly state: State
    public readonly children
    constructor(params: { state: State }) {
        Object.assign(this, params)
        this.children = children$(this.state.items$, (items) => {
            return items.map((item) => ({
                innerText: item.name,
            }))
        })
    }
}
