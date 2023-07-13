import { VirtualDOM } from '@youwol/flux-view'
import { CdnSectionView } from './cdn-section.view'
import { ExamplesSection } from './examples.view'
import { PublishPackagesSection } from './publish-package-section.view'
import { WhatMoreSection } from './what-more-section.view'
import { WoAreWeView } from './who-are-we.view'
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
                                innerText: 'WebPM',
                            },
                            {
                                class: 'title text-center',
                                innerText: 'Package manager for browsers',
                            },
                            { class: 'my-3' },
                            {
                                class: 'sub-title text-justify text-column-width',
                                innerText:
                                    'WebPM stands out as a CDN solution that enables on-the-fly package installation directly in a web browser. ' +
                                    'What sets it apart from other similar solutions is its unique capability to dynamically resolve dependency trees and ensure proper linking of requested resources.',
                            },
                            { class: 'my-2' },
                        ],
                    },
                ],
            },
            {
                class: 'mx-auto px-2',
                style: { maxWidth: '800px' },
                children: [
                    new ExamplesSection(),
                    { class: 'my-5' },
                    new CdnSectionView(),
                    { class: 'my-5' },
                    new PublishPackagesSection(),
                    { class: 'my-5' },
                    new WhatMoreSection(),
                    { class: 'my-5' },
                ],
            },
            {
                class: 'mx-auto py-3',
                style: {
                    backgroundColor: 'rgba(175,175,175)',
                },
                children: [new WoAreWeView()],
            },
        ]
    }
}
