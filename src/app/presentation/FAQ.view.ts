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
            'The dynamic resolution of dependencies force the use of the ',
    },
    {
        question: "Does it impact the way I'm writing code?",
        response: '',
    },
    {
        question: 'How can I share running examples of my library?',
        response: '',
    },
    {
        question: 'What if W3Swarn goes away?',
        response: '',
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
    public readonly class = 'sub-title mb-3'
    public readonly faq: FAQ
    public readonly children: VirtualDOM[]
    public readonly expanded$ = new BehaviorSubject(false)
    constructor(params: { faq: FAQ }) {
        Object.assign(this, params)
        this.children = [
            {
                class: 'd-flex align-items-center fv-pointer',
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
                          innerText: this.faq.response,
                      }
                    : {},
            ),
        ]
    }
}
