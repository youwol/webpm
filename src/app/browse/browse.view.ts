import { VirtualDOM, children$, child$ } from '@youwol/flux-view'
import { BehaviorSubject } from 'rxjs'
import { NpmPackageResponse, NpmSearchResponse } from './npm.models'
import { AssetsGateway } from '@youwol/http-clients'
import { onHTTPErrors } from '@youwol/http-primitives'

class State {
    public readonly packages$ = new BehaviorSubject<NpmSearchResponse>({
        objects: [],
    })

    search(term: string) {
        fetch(`https://registry.npmjs.com/-/v1/search?text=${term}&size=20`)
            .then((resp) => resp.json())
            .then((d) => {
                this.packages$.next(d)
            })
    }
}
export class BrowseView implements VirtualDOM {
    public readonly state = new State()
    public readonly class = 'w-100 flex-grow-1 d-flex flex-column'
    public readonly style = {
        minHeight: '0px',
        fontFamily: 'Lexend, sans-serif',
    }
    public readonly children: VirtualDOM[]

    constructor() {
        this.children = [
            new SearchBar({ state: this.state }),
            new ResultsView({ state: this.state }),
        ]
    }
}

export class SearchBar implements VirtualDOM {
    public readonly state: State
    public readonly class = 'my-2 w-100'
    public readonly children = []
    constructor(params: { state: State }) {
        Object.assign(this, params)

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
                                onchange: (ev) => {
                                    this.state.search(ev.target.value)
                                },
                            },
                        ],
                    },
                ],
            },
        ]
    }
}

export class ResultsView implements VirtualDOM {
    public readonly class = 'w-100 flex-grow-1 overflow-auto px-2'

    public readonly state: State
    public readonly children: VirtualDOM

    constructor(params: { state: State }) {
        Object.assign(this, params)
        this.children = [
            {
                class: 'mx-auto',
                style: {
                    maxWidth: '800px',
                },
                children: children$(this.state.packages$, (response) => {
                    return response.objects.map(
                        (item) => new PackageView(item.package),
                    )
                }),
            },
        ]
    }
}

export class PackageView implements VirtualDOM {
    public readonly class = 'fv-border-bottom-disabled py-4'
    public readonly children: VirtualDOM[]

    constructor(params: NpmPackageResponse) {
        const client = new AssetsGateway.Client()
        this.children = [
            {
                class: 'd-flex align-items-center',
                children: [
                    {
                        style: { fontSize: '1.25rem', fontWeight: 'bolder' },
                        innerText: params.name,
                    },
                    { class: 'mx-2' },
                    {
                        style: { fontSize: '1.25rem', weight: 'bolder' },
                        innerText: params.version,
                    },
                    { class: 'flex-grow-1' },
                ],
            },
            {
                innerText: params.description,
            },
            child$(
                client.cdn
                    .getLibraryInfo$({
                        libraryId: window.btoa(params.name),
                    })
                    .pipe(onHTTPErrors((_error) => undefined)),
                (info) => {
                    if (info == undefined) {
                        return new PackageNotAvailableView()
                    }
                    if (info.versions[0] != params.version) {
                        console.log(info.versions[0], params.version)
                        return new UpgradeAvailableView({
                            latest: info.versions[0],
                        })
                    }
                    return new VersionAvailableView()
                },
                { untilFirst: { class: 'fas fa-spinner fa-spin' } },
            ),
        ]
    }
}

class VersionAvailableView {
    public readonly class =
        'border p-2 d-flex align-items-center fv-text-success  fv-pointer'
    public readonly style = {
        width: 'fit-content',
    }
    public readonly children: VirtualDOM[]
    constructor() {
        this.children = [
            {
                class: 'fas fa-check',
            },
            { class: 'mx-2' },
            {
                innerText: 'Version available',
            },
        ]
    }
}
class UpgradeAvailableView {
    public readonly class = 'border p-2 d-flex align-items-center  fv-pointer'
    public readonly style = {
        width: 'fit-content',
    }
    public readonly children: VirtualDOM[]
    constructor(params: { latest }) {
        this.children = [
            {
                class: 'fas fa-cloud-upload-alt',
            },
            { class: 'mx-2' },
            {
                innerText: `Request publication (latest: ${params.latest})`,
            },
        ]
    }
}
class PackageNotAvailableView {
    public readonly class = 'border p-2 d-flex align-items-center fv-pointer'
    public readonly style = {
        width: 'fit-content',
    }
    public readonly children: VirtualDOM[]
    constructor() {
        this.children = [
            {
                class: 'fas fa-cloud-upload-alt',
            },
            { class: 'mx-2' },
            {
                innerText: 'Request publication',
            },
        ]
    }
}
