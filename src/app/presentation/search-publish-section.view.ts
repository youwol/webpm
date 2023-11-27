import { VirtualDOM, ChildrenLike } from '@youwol/rx-vdom'
import { from, Subject } from 'rxjs'
import { CdnBackend } from '@youwol/http-clients'
import { mergeMap, tap } from 'rxjs/operators'
import { onHTTPErrors } from '@youwol/http-primitives'
import { setup } from '../../auto-generated'

export class SearchPackageView implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class =
        'col-md-6 d-flex  flex-column align-items-center mx-auto p-4'
    public readonly children: ChildrenLike
    public readonly versions$ = new Subject<string[] | 'noNPM' | 'noWebPM'>()
    constructor() {
        const client = new CdnBackend.Client()
        this.children = [
            new CellHeader({
                imageName: 'search-npm.png',
                title: 'Looking for a NPM package?',
            }),
            {
                tag: 'div',
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
                                `https://registry.npmjs.com/-/v1/search?text=${event.target['value']}&size=20`,
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
                                            event.target['value'],
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
            {
                source$: this.versions$,
                vdomMap: (versions: string[] | 'noWebPM' | 'noNPM') => {
                    if (versions == 'noWebPM') {
                        return {
                            tag: 'div',
                            children: [
                                {
                                    tag: 'div',
                                    class: 'fv-text-error my-1',
                                    innerText:
                                        'The package is not available in WebPM',
                                },
                                {
                                    tag: 'div',
                                    class: 'fv-text-success',
                                    innerHTML:
                                        "Ask for publication <a href='https://platform.youwol.com/applications/@youwol/npm-explorer/latest'>here</a>.",
                                },
                            ],
                        }
                    }
                    if (versions == 'noNPM') {
                        return {
                            tag: 'div',
                            children: [
                                {
                                    tag: 'div',
                                    class: 'fv-text-error my-1',
                                    innerText:
                                        'The package is not available in NPM',
                                },
                            ],
                        }
                    }
                    return {
                        tag: 'div',
                        class: 'my-1',
                        children: [
                            {
                                tag: 'div',
                                class: 'd-flex justify-items-center',
                                children: [
                                    {
                                        tag: 'div',
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
                            { tag: 'div', class: 'my-1' },
                            {
                                tag: 'div',
                                innerHTML:
                                    "Want another version? Ask for publication <a href='https://platform.youwol.com/applications/@youwol/npm-explorer/latest'>here</a>.",
                            },
                        ],
                    }
                },
            },
        ]
    }
}
class CellHeader implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class = 'd-flex align-items-center'
    public readonly children: ChildrenLike
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
                    fontWeight: 600,
                },
                innerText: title,
            },
        ]
    }
}
