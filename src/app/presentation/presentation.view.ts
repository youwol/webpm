import { VirtualDOM } from '@youwol/flux-view'
import { CdnSectionView } from './cdn-section.view'
import { CombineSectionView } from './combine-npm-jsdlevr-section'
import { DeveloperSectionView } from './developer-section'
import { SearchPackageView } from './search-publish-section.view'
import { ApplicationsSectionView } from './applications-section.view'
import { HeaderView } from './header.view'
export {}

export class PresentationView implements VirtualDOM {
    public readonly class = 'w-100 flex-grow-1 overflow-auto'
    public readonly style = {
        minHeight: '0px',
    }
    public readonly children: VirtualDOM[]

    constructor() {
        this.children = [
            {
                id: 'background',
                class: 'background py-3',
                children: [new HeaderView()],
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
