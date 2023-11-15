import { ChildrenLike, VirtualDOM } from '@youwol/rx-vdom'
import { YouWolLogo } from './common'

export class FinalView implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class = 'mx-auto p-2'
    public readonly children: ChildrenLike
    public readonly style = {
        fontWeight: 600,
        fontSize: '2em',
    }
    constructor() {
        this.children = [
            {
                tag: 'div',
                class: 'd-flex justify-content-center',
                children: [
                    {
                        tag: 'div',
                        class: 'border p-4',
                        style: {
                            width: '500px',
                            height: '300px',
                        },

                        children: [
                            {
                                tag: 'div',
                                class: 'mx-auto text-center',
                                innerText: 'WebPM',
                            },
                            { tag: 'div', class: 'my-4' },
                            {
                                tag: 'div',
                                class: 'd-flex justify-content-center',
                                children: [
                                    { tag: 'div', innerHTML: YouWolLogo },
                                ],
                            },
                            {
                                tag: 'div',
                                class: 'd-flex',
                                children: [
                                    {
                                        tag: 'div',
                                        class: 'w-100 text-right',
                                        innerText: 'WebOS',
                                    },
                                    { tag: 'div', class: 'w-100' },
                                    {
                                        tag: 'div',
                                        class: 'w-100',
                                        innerText: 'WebSDK',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ]
    }
}

class YouwolCell implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'col-md-2 d-flex  flex-column align-items-center'
    public readonly children: ChildrenLike
    constructor() {
        this.children = [
            {
                tag: 'div',
                class: 'mx-auto my-auto',
                children: [
                    {
                        tag: 'div',
                        class: 'd-flex justify-content-center w-100 my-3',
                        innerHTML: YouWolLogo,
                    },
                ],
            },
        ]
    }
}

class Cell implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'col-md-2 d-flex flex-column align-items-center'
    public readonly children: ChildrenLike
    public readonly style = {
        fontWeight: 600,
        fontSize: '2em',
    }
    constructor({ text, textAlign }) {
        this.children = [
            {
                tag: 'div',
                class: 'w-100 ' + textAlign,
                innerHTML: text,
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
                    new EmptyCell(),
                    new Cell({
                        text: `WebPM`,
                        textAlign: 'text-center mb-5',
                    }),
                    new EmptyCell(),
                ],
            },
            {
                tag: 'div',
                class: 'row',
                children: [new EmptyCell(), new YouwolCell(), new EmptyCell()],
            },
            {
                tag: 'div',
                class: 'row',
                children: [
                    new Cell({
                        text: `WebOS `,
                        textAlign: 'text-right',
                    }),
                    new EmptyCell(),
                    new Cell({
                        text: `WebSDK `,
                        textAlign: 'text-left',
                    }),
                ],
            },
        ]
    }
}
class EmptyCell implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'col-md-2 d-flex  align-items-center'
    public readonly children: ChildrenLike
    constructor() {
        this.children = []
    }
}
