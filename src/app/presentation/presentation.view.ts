import { VirtualDOM } from '@youwol/flux-view'
import { CdnSectionView } from './cdn-section.view'
import { PublishPackagesSection } from './publish-package-section.view'
import { WhatMoreSection } from './what-more-section.view'
import { WoAreWeView } from './who-are-we.view'
import { CodeEditorView } from './code-editor.view'
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
                                tag: 'h1',
                                class: 'text-center',
                                innerText: 'Package manager for browsers',
                                style: {
                                    fontWeight: '600',
                                },
                            },
                            { class: 'my-1' },
                            {
                                tag: 'p',
                                class: 'text-justify text-column-width',
                                style: {
                                    fontWeight: '400',
                                    fontSize: '16px',
                                },
                                innerText:
                                    'Think about NPM, but running directly in your browser',
                            },
                            { class: 'my-4' },
                            {
                                class: 'mx-auto px-2 border p-2',
                                style: { width: '1040px' },
                                children: [new CodeEditorView()],
                            },
                        ],
                    },
                ],
            },
            {
                class: 'mx-auto px-2',
                style: { maxWidth: '1040px' },
                children: [
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
