import { child$, VirtualDOM } from '@youwol/flux-view'
import { BehaviorSubject, from, Subject } from 'rxjs'
import { Topic } from './app.view'
import { install } from '@youwol/webpm-client'

function installBootstrap$() {
    return from(install({ modules: ['bootstrap#^4.4.1'] }))
}
type ScreenMode = 'small' | 'large'

export class Logo implements VirtualDOM {
    public readonly class = 'my-auto'
    public readonly style = {
        backgroundColor: 'black',
        fontFamily: 'Lexend',
        letterSpacing: '0.3px',
        outlineOffset: '3px',
        fontWeight: 'bold',
        fontSize: '20px',
    }
    public readonly innerText = 'WebPM'
}

export class BannerItem implements VirtualDOM {
    public readonly tag = 'div'
    public readonly class = 'mx-3 my-auto fv-pointer'
    public readonly innerText: string
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
        this.onclick = () => {
            topic$.next(target)
        }
    }
}
export class DropDownBannerItem implements VirtualDOM {
    public readonly class = 'dropdown mx-auto '
    public readonly children: VirtualDOM[]

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
                style: { backgroundColor: 'black', border: 'none' },
                customAttributes: {
                    'data-toggle': 'dropdown',
                    'aria-haspopup': 'true',
                    'aria-expanded': 'false',
                },
                innerText: title,
            },
            {
                class: 'dropdown-menu fv-border-primary fv-bg-background fv-text-primary px-3',
                style: { width: '200px' },
                customAttributes: {
                    'aria-labelledby': 'dropdownMenuButton',
                },
                children: options.map((option) => {
                    if (option.type == 'link') {
                        return {
                            class: 'd-flex align-items-center',
                            children: [
                                {
                                    innerText: option.title,
                                },
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
                            class: 'text-center mt-3 mb-2',
                            innerText: option.title,
                        }
                    }
                }),
            },
        ]
    }
}

export class SeparatorView {
    class = 'mx-4'
}
export class BannerItems implements VirtualDOM {
    public readonly class = 'd-flex px-5 my-auto'
    public readonly children: VirtualDOM[]
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
                        title: 'client',
                        url: '/api/assets-gateway/raw/package/QHlvdXdvbC93ZWJwbS1jbGllbnQ=/2.2.0/dist/docs/modules/MainModule.html',
                    },
                    { type: 'link', title: 'backend', url: '' },
                ],
            }),
            new SeparatorView(),
            new BannerItem({ title: 'About us', topic$, target: 'About' }),
        ]
    }
}

export class TopBannerView implements VirtualDOM {
    public readonly id = 'top-banner'
    public readonly class = 'w-100 fv-text-primary'
    public readonly style = {
        minHeight: '40px',
        backgroundColor: 'black',
        fontFamily: 'Lexend',
        letterSpacing: '0.3px',
        outlineOffset: '3px',
        fontWeight: 'bold',
    }
    public readonly screenMode$ = new Subject<ScreenMode>()
    public readonly children: VirtualDOM[]
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
            child$(installBootstrap$(), () => ({
                class: 'w-75 d-flex justify-content-center mx-auto',
                children: [
                    new Logo(),
                    {
                        class: 'flex-grow-1',
                    },
                    new BannerItems({ topic$ }),
                ],
            })),
        ]
    }
}
