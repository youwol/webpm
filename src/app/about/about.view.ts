import { VirtualDOM, AnyVirtualDOM, ChildrenLike } from '@youwol/rx-vdom'
import { NeedSectionView } from './need.view'
import { BrowserAsOSSectionView } from './browser-as-os.view'
import { ConceptView } from './concept.view'
import { HeaderView } from './header.view'
import { GettingWildView } from './getting-wild.view'
import { FooterView } from './footer.view'
import { maxColumnWidth } from '../common/section.view'
/**
 * 1 - the idea: a flexible and collaborative env for numerical sciences
 *
 * 2 - the need: something in between cloud computing and PC
 *
 * 3 - the solution: takes advantage of the browser
 *
 * 4 - the foundation: libraries as a service (WebPM)
 *
 * 5 - the YouWol platform: stretch the idea up to applications
 *
 *
 */
export class AboutView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'w-100 mx-auto overflow-auto'
    public readonly children: AnyVirtualDOM[]
    public readonly style = {
        position: 'relative' as const,
    }
    constructor() {
        this.children = [
            {
                tag: 'div',
                class: 'mx-auto',
                children: [
                    //{ tag: 'div', style: { height: '170px' } },
                    new HeaderView(),
                    {
                        tag: 'div',
                        class: 'p-2 mx-auto',
                        style: {
                            maxWidth: maxColumnWidth,
                        },
                        children: [
                            new SeparatorSectionFirst(),
                            new NeedSectionView(),
                            new ConceptView(),
                            new BrowserAsOSSectionView(),
                            new GettingWildView(),
                            new SeparatorSectionLast(),
                            new FooterView(),
                        ],
                    },
                ],
            },
        ]
    }
}

class SeparatorSectionFirst implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'd-flex w-100'
    public readonly style = {
        height: '5em',
    }
    public readonly children: ChildrenLike = [
        { tag: 'div', class: 'w-50' },
        { tag: 'div', class: 'w-50 border-left border-bottom' },
    ]
}

class SeparatorSectionLast implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'd-flex w-100'
    public readonly style = {
        height: '5em',
    }
    public readonly children: ChildrenLike = [
        { tag: 'div', class: 'w-50 border-right border-top' },
    ]
}
