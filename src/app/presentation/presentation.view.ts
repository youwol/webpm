import { VirtualDOM } from '@youwol/flux-view'
import { AssetsStoreView } from './assets-store.view'
import { CdnSectionView } from './cdn-section.view'
import { LocalServerSection } from './local-server.view'
import { IntroView } from './intro.view'
import { CodeEditorView } from './code-editor.view'
import { RemoteServerSection } from './remote-server.view'
export {}

export class PresentationView implements VirtualDOM {
    public readonly class = 'w-100 flex-grow-1 overflow-auto'
    public readonly style = {
        minHeight: '0px',
        fontFamily: 'Lexend, sans-serif',
    }
    public readonly children: VirtualDOM[]

    constructor() {
        this.children = [
            {
                id: 'background',
                class: 'background py-3',
                children: [
                    {
                        class: 'h-100 d-flex fv-text-primary flex-column justify-content-center mx-auto p-3',
                        children: [
                            {
                                style: {
                                    fontWeight: 'bolder',
                                },
                                class: 'title text-center',
                                innerText: 'Run-time provider for browsers',
                            },
                            {
                                class: 'sub-title text-center',
                                innerText:
                                    'Install, linker & run browser-compatible ecosystems.',
                            },
                            {
                                class: 'sub-title text-center',
                                innerText: 'Free & open source.',
                            },
                            { class: 'my-3' },
                            {
                                class: 'mx-auto',
                                style: {
                                    maxWidth: '800px',
                                },
                                children: [
                                    {
                                        class: 'text-center',
                                        innerHTML:
                                            'Following examples use the <a href="https://github.com/youwol/cdn-client">CdnClient package</a> to fetch run times from W3Swarm.',
                                    },
                                    new CodeEditorView(),
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                class: 'mx-auto',
                style: { maxWidth: '800px' },
                children: [
                    new IntroView(),
                    { class: 'my-5' },
                    new CdnSectionView(),
                    { class: 'my-5' },
                    new AssetsStoreView(),
                    { class: 'my-5' },
                    new LocalServerSection(),
                    { class: 'my-5' },
                    new RemoteServerSection(),
                ],
            },
        ]
    }
}
