import { child$, VirtualDOM } from '@youwol/flux-view'
import { from, Subject } from 'rxjs'
import { CdnBackend } from '@youwol/http-clients'
import { mergeMap, tap } from 'rxjs/operators'
import { onHTTPErrors } from '@youwol/http-primitives'
import { setup } from '../../auto-generated'

export class SearchPackageView implements VirtualDOM {
    public readonly class =
        'col-md-6 d-flex  flex-column align-items-center mx-auto p-4'
    public readonly children: VirtualDOM[]
    public readonly versions$ = new Subject<string[] | 'noNPM' | 'noWebPM'>()
    constructor() {
        const client = new CdnBackend.Client()
        this.children = [
            new CellHeader({
                imageName: 'easy-npm.svg',
                title: 'Looking for a NPM package?',
            }),
            {
                class: 'm-2',
                innerHTML: `Check whether it is available below:`,
            },
            {
                tag: 'input',
                type: 'text',
                value: '@youwol/webpm-client',
                placeholder: `@youwol/webpm-client`,
                onkeydown: (event) => {
                    if (event.key === 'Enter') {
                        from(
                            fetch(
                                `https://registry.npmjs.com/-/v1/search?text=${event.target.value}&size=20`,
                            ),
                        )
                            .pipe(
                                mergeMap((resp) => from(resp.json())),
                                tap((resp) => {
                                    console.log('Response', resp)
                                    if (resp.objects.length == 0) {
                                        this.versions$.next('noNPM')
                                        throw Error('No npm')
                                    }
                                }),
                                mergeMap(() =>
                                    client.getLibraryInfo$({
                                        libraryId: window.btoa(
                                            event.target.value,
                                        ),
                                    }),
                                ),
                                onHTTPErrors(() => {
                                    return 'error' as const
                                }),
                            )
                            .subscribe((d) => {
                                this.versions$.next(
                                    d == 'error' ? 'noWebPM' : d.versions,
                                )
                            })
                    }
                },
            },
            child$(this.versions$, (versions) => {
                if (versions == 'noWebPM') {
                    return {
                        children: [
                            {
                                class: 'fv-text-error my-1',
                                innerText:
                                    'The package is not available in WebPM',
                            },
                            {
                                class: 'fv-text-success',
                                innerHTML:
                                    "Ask for publication <a href='https://platform.youwol.com/applications/@youwol/npm-explorer/latest'>here</a>.",
                            },
                        ],
                    }
                }
                if (versions == 'noNPM') {
                    return {
                        children: [
                            {
                                class: 'fv-text-error my-1',
                                innerText:
                                    'The package is not available in NPM',
                            },
                        ],
                    }
                }
                return {
                    class: 'my-1',
                    children: [
                        {
                            class: 'd-flex justify-items-center',
                            children: [
                                {
                                    innerText: 'versions available:',
                                },
                                {
                                    tag: 'select',
                                    children: versions.map((version) => ({
                                        tag: 'option',
                                        innerText: version,
                                    })),
                                },
                            ],
                        },
                        { class: 'my-1' },
                        {
                            innerHTML:
                                "Want another version? Ask for publication <a href='https://platform.youwol.com/applications/@youwol/npm-explorer/latest'>here</a>.",
                        },
                    ],
                }
            }),
        ]
    }
}
class CellHeader implements VirtualDOM {
    public readonly class = 'd-flex align-items-center'
    public readonly children: VirtualDOM[]
    constructor({ imageName, title }) {
        this.children = [
            {
                tag: 'img',
                width: 75,
                height: 75,
                src: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/${imageName}`,
            },
            {
                class: 'm-2',
                tag: 'h6',
                style: {
                    fontSize: '1.5em',
                    fontWeight: '600',
                },
                innerText: title,
            },
        ]
    }
}
