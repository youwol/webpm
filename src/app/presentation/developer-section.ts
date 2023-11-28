import { VirtualDOM, ChildrenLike } from '@youwol/rx-vdom'
import { setup } from '../../auto-generated'
import { CardView, EmptyCard } from '../common/card.view'
import { SectionView } from '../common/section.view'

export class DeveloperSectionView extends SectionView {
    constructor() {
        super({
            title: new TitleView(),
            subtitle: '',
            withClasses: 'border-left',
            paragraphs: [new GridView()],
        })
    }
}

class TitleView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'd-flex align-items-center'
    public readonly style = {
        fontSize: '1.7rem',
        fontWeight: 'bolder' as const,
    }
    public readonly children: ChildrenLike

    constructor() {
        this.children = [
            {
                tag: 'img',
                height: 60,
                src: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/dev.svg`,
            },
            { tag: 'div', class: 'mx-2' },
            {
                tag: 'div',
                innerText: 'A solution that scales with your libraries ...',
            },
        ]
    }
}

class GridView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'container mt-4'
    public readonly children: ChildrenLike
    constructor() {
        this.children = [
            {
                tag: 'div',
                class: 'row',
                children: [
                    new CardView({
                        imageName: 'TS.png',
                        title: 'Typescript friendly',
                        abstract: {
                            tag: 'div',
                            innerHTML: `Dynamic does not mean "any": type checking, completion, <i>etc.</i> are 
                            available transparently in your project. Check for instance <a href='https://github.com/youwol/todo-app-ts'>here </a>`,
                        },
                    }),
                    new EmptyCard(),
                    new CardView({
                        imageName: 'laptop.png',
                        title: 'WebPM in your PC',
                        abstract: {
                            tag: 'div',
                            innerHTML: `WebPM backend can run in your PC to facilitate working with your own projects.
                                Interested? Check a presentation <a href=''>here</a>.`,
                        },
                    }),
                ],
            },
            {
                tag: 'div',
                class: 'row',
                children: [
                    new EmptyCard(),
                    new CardView({
                        imageName: 'debug-browser.png',
                        title: 'In-browser debug',
                        abstract: {
                            tag: 'div',
                            innerText: `We strive to provide the best experience to debug within the browser.
                        Check for instance the 'youwol' libraries in the 'Sources' panel of your debug tool console.`,
                        },
                    }),
                    new EmptyCard(),
                ],
            },
        ]
    }
}
