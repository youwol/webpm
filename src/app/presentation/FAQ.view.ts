import { attr$, child$, VirtualDOM } from '@youwol/flux-view'
import { BehaviorSubject } from 'rxjs'

type FAQ = {
    question: string
    response: string
}
const FAQs = [
    {
        question: 'How dependencies resolution is handled?',
        response:
            'The dynamic resolution of dependencies depends on a strict adherence to the rules of semantic versioning,' +
            ' particularly with regard to breaking changes. This allows for fast resolution of dependency graphs for ' +
            'dynamic use cases while still maintaining the core principles of semantic versioning. Therefore, it is ' +
            'recommended to use the ^ symbol when indicating dependencies, as it signifies the earliest version that ' +
            'is compatible, with the last version being the one preceding any breaking changes.',
    },
    {
        question: "Does it impact the way I'm writing code?",
        response:
            'In essence, no. This is evidenced by the fact that npm packages are published in WebPM without any ' +
            'code changes. Specifically, for developers who rely on TypeScript typings, the dynamic resolution ' +
            'process does not result in the loss of typings definitions. ',
    },
    {
        question:
            'Can I take advantage of the ecosystem to speed-up development time?',
        response:
            'The approach provides more flexibility and agility in managing dependencies. Libraries can be updated and' +
            ' added without requiring changes to other libraries/apps as their bundle is dependencies free.' +
            ' It allows for more modular and scalable development, as well as easier maintenance and upgrades over time. ' +
            'Also, with a runtime installer that ships libraries and their dependencies individually, ' +
            'it becomes much easier to lazy load specific libraries at any point in the code.' +
            ' This is because each library is packaged and shipped as a standalone module, with its own set of ' +
            'dependencies. So, instead of having to load an entire monolithic bundle upfront, the installer can' +
            ' dynamically load just the libraries that are needed, when they are needed.',
    },
    {
        question: 'What about performances?',
        response:
            "The performance impact of our approach depends on the application's architecture and needs. When compared" +
            ' to monolithic applications that bundle only the required parts of their dependencies, our approach results ' +
            'in larger bundle sizes as the full code of the dependencies is loaded. ' +
            'However, when an application is modular and requires extensibility, our approach proves more efficient as ' +
            'the dependencies are shared between the various components. Additionally, having full access to the' +
            ' dependencies is crucial when doing some inlined coding.',
    },
]

export class FaqsView implements VirtualDOM {
    public readonly class = 'mx-auto px-4'
    public readonly style = {
        maxWidth: '800px',
    }
    public readonly children: VirtualDOM[]
    constructor() {
        this.children = [
            {
                style: {
                    fontWeight: 'bolder',
                },
                class: 'title text-center',
                innerText: 'Frequently Asked Questions',
            },
            { class: 'my-3' },
            ...FAQs.map((faq) => {
                return new FaqView({ faq })
            }),
        ]
    }
}

export class FaqView implements VirtualDOM {
    public readonly class = 'mb-3'
    public readonly faq: FAQ
    public readonly children: VirtualDOM[]
    public readonly expanded$ = new BehaviorSubject(false)
    constructor(params: { faq: FAQ }) {
        Object.assign(this, params)
        this.children = [
            {
                class: 'd-flex align-items-center fv-pointer sub-title',
                children: [
                    {
                        class: attr$(this.expanded$, (expanded) =>
                            expanded
                                ? 'fas fa-caret-down'
                                : 'fas fa-caret-right',
                        ),
                    },
                    { class: 'mx-2' },
                    {
                        innerText: this.faq.question,
                    },
                ],
                onclick: () => this.expanded$.next(!this.expanded$.value),
            },
            child$(this.expanded$, (expanded) =>
                expanded
                    ? {
                          class: 'text-justify',
                          style: { fontWeight: 'bolder', fontSize: 'larger' },
                          innerHTML: this.faq.response,
                      }
                    : {},
            ),
        ]
    }
}
