import { attr$, child$, VirtualDOM } from '@youwol/flux-view'
import { BehaviorSubject, from, Subject } from 'rxjs'
import { Topic } from './app.view'
import { install } from '@youwol/webpm-client'

function installBootstrap$() {
    return from(install({ modules: ['bootstrap#^4.4.1'] }))
}
type ScreenMode = 'small' | 'large'

const topicButtons = (topic$) => [
    new Button({
        icon: '',
        target: 'Presentation',
        title: 'Presentation',
        topic$,
    }),
    new Button({
        icon: 'fas fa-search',
        target: 'Browse',
        title: 'Browse packages',
        topic$,
    }),
    new Button({
        icon: 'fab fa-js-square',
        target: 'Playground',
        title: 'Js playground',
        topic$,
    }),
]

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
    public readonly class = 'mx-3 my-auto'
    public readonly innerText: string

    constructor({ title }: { title: string }) {
        this.innerText = title
    }
}
export class DropDownBannerItem implements VirtualDOM {
    public readonly class = 'dropdown mx-auto '
    public readonly children: VirtualDOM[]

    constructor({
        title,
        options,
        topic$,
    }: {
        title: string
        options: string[]
        topic$: BehaviorSubject<Topic>
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
                class: 'dropdown-menu fv-border-primary fv-bg-background',
                customAttributes: {
                    'aria-labelledby': 'dropdownMenuButton',
                },
                children: options.map((option) => {
                    return new Button({
                        icon: '',
                        target: undefined,
                        title: option,
                        topic$,
                    })
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
            new DropDownBannerItem({
                title: 'Tools',
                options: ['Publish from NPM', 'Publish by yourself'],
                topic$,
            }),
            new SeparatorView(),
            new DropDownBannerItem({
                title: 'Resources',
                options: ['Blog', 'webpm JS client API'],
                topic$,
            }),
            new SeparatorView(),
            new BannerItem({ title: 'About us' }),
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

class Button implements VirtualDOM {
    public readonly class
    public readonly style = {
        width: '200px',
        height: 'fit-content',
        fontFamily: 'Poppins',
        letterSpacing: '0.3px',
        outlineOffset: '3px',
        fontWeight: 'bold',
    }
    public readonly children: VirtualDOM[]
    public readonly onclick: (ev: MouseEvent) => void
    constructor(params: {
        icon: string
        target: Topic
        title: string
        topic$: BehaviorSubject<Topic>
    }) {
        this.class = attr$(
            params.topic$,
            (topic): string => {
                return topic == params.target ? 'fv-border-bottom-focus' : ''
            },
            {
                wrapper: (d) =>
                    `${d} my-auto p-1 fv-text-primary fv-pointer mx-2  d-flex fv-hover-text-focus`,
            },
        )
        this.children = [
            {
                class: params.icon,
            },
            {
                class: 'mx-2',
            },
            {
                innerText: params.title,
            },
        ]
        this.onclick = () => params.topic$.next(params.target)
    }
}

export class MenuDropDown implements VirtualDOM {
    public readonly class = 'dropdown mx-auto'
    public readonly children: VirtualDOM[]
    public readonly topic$: BehaviorSubject<Topic>

    constructor(params: { topic$: BehaviorSubject<Topic> }) {
        Object.assign(this, params)
        const buttons = topicButtons(this.topic$)
        this.children = [
            {
                tag: 'button',
                class: 'btn btn-secondary dropdown-toggle fv-border-bottom-focus',
                type: 'button',
                style: { backgroundColor: 'black' },
                customAttributes: {
                    'data-toggle': 'dropdown',
                    'aria-haspopup': 'true',
                    'aria-expanded': 'false',
                },
                innerText: attr$(this.topic$, (t) => t),
            },
            {
                class: 'dropdown-menu fv-border-primary fv-bg-background',
                customAttributes: {
                    'aria-labelledby': 'dropdownMenuButton',
                },
                children: buttons,
            },
        ]
    }
}

export class MenuExpanded implements VirtualDOM {
    public readonly class = 'flex-grow-1 my-auto d-flex justify-content-around'
    public readonly children: VirtualDOM[]
    public readonly topic$: BehaviorSubject<Topic>

    constructor(params: { topic$: BehaviorSubject<Topic> }) {
        Object.assign(this, params)
        this.children = topicButtons(this.topic$)
    }
}

// <div class="dropdown">
// <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//     Dropdown button
// </button>
// <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
// <a class="dropdown-item">Action</a>
//     <a class="dropdown-item">Another action</a>
// <a class="dropdown-item">Something else here</a>
// </div>
// </div>
