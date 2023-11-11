import { VirtualDOM } from '@youwol/flux-view'
import { CdnSectionView } from './cdn-section.view'
import { CodeEditorView } from './code-editor.view'
import { CombineSectionView } from './combine-npm-jsdlevr-section'
import { DeveloperSectionView } from './developer-section'
import { SearchPackageView } from './search-publish-section.view'
import { ApplicationsSectionView } from './applications-section.view'
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
                    new SeparatorSectionFirst(),
                    new SearchPackageView(),
                    new SeparatorSectionSecond(),
                    new CdnSectionView(),
                    new SeparatorSectionRight(),
                    new CombineSectionView(),
                    new SeparatorSectionLeft(),
                    new DeveloperSectionView(),
                    new SeparatorSectionLast(),
                    { class: 'my-5' },
                    new ApplicationsSectionView(),
                    { class: 'my-5' },
                ],
            },
            {
                class: 'mx-auto py-3',
                style: {
                    backgroundColor: 'rgba(175,175,175)',
                },
            },
        ]
    }
}
class SeparatorSectionFirst {
    public readonly class = 'd-flex w-100'
    public readonly style = {
        height: '5em',
    }
    public readonly children = [
        {
            class: 'w-50 border-right',
        },
    ]
}
class SeparatorSectionSecond {
    public readonly class = 'd-flex w-100'
    public readonly style = {
        height: '5em',
    }
    public readonly children = [
        {
            class: 'w-50 border-right border-bottom',
        },
    ]
}
class SeparatorSectionLast {
    public readonly class = 'd-flex w-100'
    public readonly style = {
        height: '5em',
    }
    public readonly children = [
        {
            class: 'w-50 border-right border-top',
        },
    ]
}
class SeparatorSectionLeft {
    public readonly class = 'border-left'
    public readonly style = {
        height: '5em',
    }
}
class SeparatorSectionRight {
    public readonly class = 'border-right'
    public readonly style = {
        height: '5em',
    }
}
