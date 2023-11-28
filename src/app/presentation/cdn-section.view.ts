import { VirtualDOM, ChildrenLike } from '@youwol/rx-vdom'
import { CardView } from '../common/card.view'
export class CdnSectionView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'mx-auto border-left border-bottom p-5'
    public readonly children: ChildrenLike
    constructor() {
        this.children = [
            {
                tag: 'div',
                innerText: 'Flexible and robust',
                style: {
                    fontSize: '1.7rem',
                    fontWeight: 'bolder',
                },
            },
            { tag: 'div', class: 'my-4' },
            new GridView(),
        ]
    }
}

class GridView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'd-flex flex-wrap justify-content-center'
    public readonly children: ChildrenLike
    constructor() {
        this.children = [
            new CardView({
                imageName: 'flexible.png',
                title: 'On the fly install',
                abstract: {
                    tag: 'div',
                    innerText:
                        'Runtimes can be extended dynamically, creating a range of new opportunities.',
                },
            }),
            new CardView({
                imageName: 'browsers.png',
                title: 'Any browser',
                abstract: {
                    tag: 'div',
                    innerText:
                        'Share your code and runtime, ready to execute from a simple URL.',
                },
            }),
            new CardView({
                imageName: 'dependencies.png',
                title: 'Dynamic linking',
                abstract: {
                    tag: 'div',
                    innerText:
                        'Properly handle direct and indirect dependencies along with dynamic linking.',
                },
            }),
            new CardView({
                imageName: 'multi-versions.png',
                title: 'Mixin versions',
                abstract: {
                    tag: 'div',
                    innerText:
                        'Installed runtimes can feature library with multiple versions.',
                },
            }),
        ]
    }
}
