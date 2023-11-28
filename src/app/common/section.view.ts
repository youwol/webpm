import { VirtualDOM, ChildrenLike, AnyVirtualDOM } from '@youwol/rx-vdom'
import { paragraphStyle } from '../about/common'

export class SectionTitle implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly children: ChildrenLike
    public readonly title: string
    public readonly subtitle: string
    constructor(params: { title: string; subtitle: string }) {
        Object.assign(this, params)
        this.children = [
            {
                tag: 'div',
                innerText: this.title,
                style: {
                    fontSize: '1.7rem',
                    fontWeight: 'bolder',
                },
                children: [
                    {
                        style: {
                            fontSize: '1.5rem',
                            fontWeight: 'bolder',
                        },
                        tag: 'div',
                        innerText: this.subtitle,
                    },
                ],
            },
        ]
    }
}
export class SectionView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'mx-auto p-5 '
    public readonly children: ChildrenLike

    constructor({
        title,
        subtitle,
        paragraphs,
        withClasses,
    }: {
        title: string | AnyVirtualDOM
        subtitle: string
        paragraphs: ChildrenLike
        withClasses: string
    }) {
        this.class += withClasses
        this.children = [
            typeof title === 'string'
                ? new SectionTitle({
                      title,
                      subtitle,
                  })
                : title,
            { tag: 'div', class: 'my-4' },
            {
                tag: 'div',
                class: 'd-flex flex-column justify-content-around align-items-center',
                children: paragraphs,
            },
        ]
    }
}

export class TextParagraphView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = 'w-100'
    public readonly style = paragraphStyle
    public readonly children: ChildrenLike

    constructor({ innerHTML }: { innerHTML: string }) {
        this.children = [
            {
                tag: 'div',
                innerHTML,
            },
        ]
    }
}
