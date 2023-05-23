import { VirtualDOM } from '@youwol/flux-view'
import { CdnSectionView } from './cdn-section.view'
import { LocalServerSection } from './local-server.view'
import { IntroView } from './intro.view'
import { RemoteServerSection } from './remote-server.view'
import { FaqsView } from './FAQ.view'
import { SnippetsSectionView } from './snippets-section.view'
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
                        class: 'h-100 d-flex fv-text-primary flex-column justify-content-center mx-auto py-3',
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
                                    'Install, link & run browser-compatible ecosystems.',
                            },
                            {
                                class: 'sub-title text-center',
                                innerText: 'Free & open source.',
                            },
                            { class: 'my-3' },
                            new SnippetsSectionView(),
                        ],
                    },
                ],
            },
            {
                class: 'mx-auto px-2',
                style: { maxWidth: '800px' },
                children: [
                    new IntroView(),
                    { class: 'my-5' },
                    new CdnSectionView(),
                    { class: 'my-5' },
                    new LocalServerSection(),
                    { class: 'my-5' },
                    new RemoteServerSection(),
                    { class: 'my-5' },
                ],
            },
            {
                class: 'mx-auto py-3',
                style: {
                    backgroundColor: 'rgba(175,175,175)',
                },
                children: [new FaqsView()],
            },
        ]
    }
}
