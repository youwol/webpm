import { VirtualDOM, ChildrenLike } from '@youwol/rx-vdom'
import { setup } from '../../auto-generated'

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

class Cell implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'col-md-4 d-flex  align-items-center'
    public readonly children: ChildrenLike
    constructor({ imageName, text, title }) {
        this.children = [
            {
                tag: 'img',
                width: 75,
                height: 75,
                src: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/${imageName}`,
            },
            {
                tag: 'div',
                class: 'd-flex flex-column m-2',
                children: [
                    {
                        tag: 'h6',
                        style: {
                            fontWeight: 600,
                        },
                        innerText: title,
                    },
                    { tag: 'div', class: 'text-justify', innerText: text },
                ],
            },
        ]
    }
}
class EmptyCell implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'col-md-4 d-flex  align-items-center'
    public readonly children: ChildrenLike
    constructor() {
        this.children = []
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
                    new EmptyCell(),
                    new Cell({
                        imageName: 'flexible.png',
                        title: 'On the fly install',
                        text: 'Runtimes can be extended dynamically, creating a range of new opportunities.',
                    }),
                    new EmptyCell(),
                ],
            },
            {
                tag: 'div',
                class: 'row',
                children: [
                    new Cell({
                        imageName: 'browsers.png',
                        title: 'Install in any browser',
                        text: 'Share your code and runtime, ready to execute from a simple URL.',
                    }),
                    new EmptyCell(),
                    new Cell({
                        imageName: 'dependencies.png',
                        title: 'Dependencies graph resolution',
                        text: 'Properly handle direct and indirect dependencies along with dynamic linking.',
                    }),
                ],
            },
            {
                tag: 'div',
                class: 'row mt-5',
                children: [
                    new EmptyCell(),
                    new Cell({
                        imageName: 'multi-versions.png',
                        title: 'Mixin versions support',
                        text: 'Installed runtimes can feature library with multiple versions.',
                    }),
                    new EmptyCell(),
                ],
            },
        ]
    }
}
