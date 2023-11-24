import { ChildrenLike, VirtualDOM } from '@youwol/rx-vdom'
import { paragraphStyle, SectionTitle } from './common'
import { setup } from '../../auto-generated'

export class NeedSectionView implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class = 'mx-auto border-right border-bottom p-5'
    public readonly children: ChildrenLike
    constructor() {
        this.children = [
            new SectionTitle({
                title: 'The need',
                subtitle: 'Customization of PC, accessibility of servers',
            }),
            { tag: 'div', class: 'my-4' },
            {
                tag: 'div',
                class: 'd-flex ',
                children: [new PCView(), new ServersView()],
            },
            { tag: 'div', class: 'my-5' },
            {
                class: 'w-75 mx-auto',
                style: paragraphStyle,
                tag: 'p',
                innerHTML: `The need YouWol aims fulfill is to provide a computing solution that sits between traditional 
                PCs and cloud platforms. 
                It shall make runtime widely accessible while also ensuring that users, regardless of their expertise,
                 can easily customize and extend it to meet their specific needs.`,
            },
        ]
    }
}

class ItemView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'd-flex align-items-center'
    public readonly children: ChildrenLike
    constructor({ text, classes }: { text: string; classes: string }) {
        this.children = [
            {
                tag: 'i',
                class: classes,
            },
            { tag: 'div', class: 'mx-2' },
            {
                tag: 'div',
                innerText: text,
            },
        ]
    }
}

const classItems = 'd-flex justify-content-center'

class PCItemsView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = classItems
    public readonly children: ChildrenLike

    constructor() {
        this.children = [
            {
                tag: 'div',
                class: 'mx-auto',
                children: [
                    new ItemView({
                        text: 'User customizable',
                        classes: 'fas fa-check fv-text-success',
                    }),
                    new ItemView({
                        text: 'Widely accessible',
                        classes: 'fas fa-times fv-text-error',
                    }),
                ],
            },
        ]
    }
}

class ServersItemsView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = classItems
    public readonly children: ChildrenLike

    constructor() {
        this.children = [
            {
                tag: 'div',
                class: 'mx-auto',
                children: [
                    new ItemView({
                        text: 'User customizable',
                        classes: 'fas fa-times fv-text-error',
                    }),
                    new ItemView({
                        text: 'Widely accessible',
                        classes: 'fas fa-check fv-text-success',
                    }),
                ],
            },
        ]
    }
}

class ServersView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'w-50'
    public readonly children: ChildrenLike

    constructor() {
        this.children = [
            {
                tag: 'div',
                class: 'd-flex justify-content-center',
                children: [
                    {
                        tag: 'img',
                        style: {
                            height: '125px',
                        },
                        src: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/servers.png`,
                    },
                ],
            },
            new ServersItemsView(),
        ]
    }
}

class PCView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'w-50'
    public readonly children: ChildrenLike

    constructor() {
        this.children = [
            {
                tag: 'div',
                class: 'd-flex justify-content-center',
                children: [
                    {
                        tag: 'img',
                        style: {
                            height: '125px',
                        },
                        src: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/laptop.png`,
                    },
                ],
            },
            new PCItemsView(),
        ]
    }
}
