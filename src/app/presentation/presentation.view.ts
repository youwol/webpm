import { ChildrenLike, VirtualDOM } from '@youwol/rx-vdom'
import { CdnSectionView } from './cdn-section.view'
import { CombineSectionView } from './combine-npm-jsdlevr-section'
import { DeveloperSectionView } from './developer-section'
import { SearchPackageView } from './search-publish-section.view'
import { ApplicationsSectionView } from './applications-section.view'
import { HeaderView } from './header.view'
export {}

export class PresentationView implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class = 'w-100 flex-grow-1 overflow-auto'
    public readonly style = {
        minHeight: '0px',
    }
    public readonly children: ChildrenLike

    constructor() {
        this.children = [
            {
                tag: 'div',
                id: 'background',
                children: [new HeaderView()],
            },
            {
                tag: 'div',
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
                    { tag: 'div', class: 'my-5' },
                    new ApplicationsSectionView(),
                    { tag: 'div', class: 'my-5' },
                ],
            },
            {
                tag: 'div',
                class: 'mx-auto py-3',
                style: {
                    backgroundColor: 'rgba(175,175,175)',
                },
            },
        ]
    }
}
class SeparatorSectionFirst implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class = 'd-flex w-100'
    public readonly style = {
        height: '5em',
    }
    public readonly children: ChildrenLike = [
        { tag: 'div', class: 'w-50 border-right' },
    ]
}
class SeparatorSectionSecond implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class = 'd-flex w-100'
    public readonly style = {
        height: '5em',
    }
    public readonly children: ChildrenLike = [
        { tag: 'div', class: 'w-50 border-right border-bottom' },
    ]
}
class SeparatorSectionLast implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class = 'd-flex w-100'
    public readonly style = {
        height: '5em',
    }
    public readonly children: ChildrenLike = [
        { tag: 'div', class: 'w-50 border-right border-top' },
    ]
}
class SeparatorSectionLeft implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class = 'border-left'
    public readonly style = {
        height: '5em',
    }
}
class SeparatorSectionRight implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class = 'border-right'
    public readonly style = {
        height: '5em',
    }
}
