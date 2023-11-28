import { VirtualDOM, RxAttribute, ChildrenLike } from '@youwol/rx-vdom'
import { BehaviorSubject, from, Subject } from 'rxjs'
import { Topic } from './app.view'
import { install } from '@youwol/webpm-client'

function installBootstrap$() {
    return from(install({ modules: ['bootstrap#^4.4.1'] }))
}
type ScreenMode = 'small' | 'large'

export class Logo implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class = 'my-auto'
    public readonly style = {
        backgroundColor: 'black',
        letterSpacing: '0.3px',
        outlineOffset: '3px',
        fontWeight: 'bold' as const,
        fontSize: '20px',
    }
    public readonly innerText = 'WebPM'
}

export class BannerItem implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class: RxAttribute<string, string>
    public readonly innerText: string
    public readonly style = {
        whiteSpace: 'nowrap' as const,
    }

    onclick: (ev: MouseEvent) => void
    constructor({
        title,
        topic$,
        target,
    }: {
        title: string
        topic$: BehaviorSubject<Topic>
        target: Topic
    }) {
        this.innerText = title
        this.class = {
            source$: topic$,
            vdomMap: (selectedTopic) =>
                selectedTopic === target ? 'fv-text-focus' : '',
            wrapper: (d) => `${d} mx-1 my-auto fv-pointer `,
        }
        this.onclick = () => {
            topic$.next(target)
        }
    }
}
export class DropDownBannerItem implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class = 'dropdown mx-auto '
    public readonly children: ChildrenLike

    constructor({
        title,
        options,
    }: {
        title: string
        options: { title: string; type: string; url?: string }[]
    }) {
        this.children = [
            {
                tag: 'button',
                class: 'btn btn-secondary dropdown-toggle',
                type: 'button',
                style: {
                    backgroundColor: 'black',
                    border: 'none',
                    fontWeight: 800,
                },
                customAttributes: {
                    'data-toggle': 'dropdown',
                    'aria-haspopup': 'true',
                    'aria-expanded': 'false',
                },
                innerText: title,
            },
            {
                tag: 'div',
                class: 'dropdown-menu fv-border-primary fv-bg-background fv-text-primary px-3',
                style: { width: '200px' },
                customAttributes: {
                    'aria-labelledby': 'dropdownMenuButton',
                },
                children: options.map((option) => {
                    if (option.type == 'link') {
                        return {
                            tag: 'div',
                            class: 'd-flex align-items-center',
                            children: [
                                { tag: 'div', innerText: option.title },
                                {
                                    tag: 'a',
                                    class: 'fas fa-external-link-square-alt mx-2',
                                    href: option.url,
                                },
                            ],
                        }
                    }
                    if (option.type == 'delimiter') {
                        return {
                            tag: 'div',
                            class: 'text-center mt-3 mb-2',
                            innerText: option.title,
                            style: {
                                fontWeight: 100,
                            },
                        }
                    }
                }),
            },
        ]
    }
}

export class SeparatorView implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class = 'mx-1'
}
export class BannerItems implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class = 'd-flex my-auto align-items-center flex-grow-1'
    public readonly children: ChildrenLike
    constructor({ topic$ }: { topic$: BehaviorSubject<Topic> }) {
        this.children = [
            new BannerItem({ title: 'Home', topic$, target: 'Home' }),
            new SeparatorView(),
            new DropDownBannerItem({
                title: 'Resources',
                options: [
                    { type: 'link', title: 'Blog', url: '' },
                    { type: 'delimiter', title: 'API Documentation' },
                    {
                        type: 'link',
                        title: 'WebPM client',
                        url: '/api/assets-gateway/raw/package/QHlvdXdvbC93ZWJwbS1jbGllbnQ=/^2.2.0/dist/docs/modules/MainModule.html',
                    },
                ],
            }),
            new SeparatorView(),
            new BannerItem({ title: 'About us', topic$, target: 'About' }),
        ]
    }
}

export class TopBannerView implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly id = 'top-banner'
    public readonly class = 'w-100 fv-text-primary'
    public readonly style = {
        minHeight: '40px',
        backgroundColor: 'black',
        letterSpacing: '0.3px',
        outlineOffset: '3px',
        fontWeight: 'bold' as const,
    }
    public readonly screenMode$ = new Subject<ScreenMode>()
    public readonly children: ChildrenLike
    public readonly connectedCallback: (elem: HTMLDivElement) => void
    private htmlElement: HTMLDivElement

    constructor({ topic$ }: { topic$: BehaviorSubject<Topic> }) {
        const observerResize = new window['ResizeObserver'](() => {
            const width = this.htmlElement.clientWidth
            this.screenMode$.next(width > 1000 ? 'large' : 'small')
        })
        this.connectedCallback = (elem) => {
            this.htmlElement = elem
            observerResize.observe(this.htmlElement)
        }
        installBootstrap$().subscribe()
        this.children = [
            {
                source$: installBootstrap$(),
                vdomMap: () => ({
                    tag: 'div',
                    class: 'w-100 d-flex justify-content-center mx-auto px-2',
                    children: [
                        { tag: 'div', class: 'flex-grow-1' },
                        new Logo(),
                        {
                            tag: 'div',
                            class: 'flex-grow-1',
                            style: {
                                minWidth: '10px',
                            },
                        },
                        new BannerItems({ topic$ }),
                        { tag: 'div', class: 'flex-grow-1' },
                    ],
                }),
            },
        ]
    }
}
