import { VirtualDOM, ChildrenLike } from '@youwol/rx-vdom'

import { TopBannerView } from './top-banner.view'
import { PresentationView } from './presentation/presentation.view'
import { BehaviorSubject } from 'rxjs'
import { AboutView } from './about/about.view'

export type Topic = 'Home' | 'About'

export class AppView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly topic$ = new BehaviorSubject<Topic>('Home')
    public readonly class = 'h-100  w-100 d-flex flex-column'
    public readonly style = {
        fontFamily: 'Lexend, sans-serif',
    }

    public readonly children: ChildrenLike

    constructor() {
        this.children = [
            new TopBannerView({ topic$: this.topic$ }),
            {
                source$: this.topic$,
                vdomMap: (topic: Topic) => {
                    if (topic == 'Home') {
                        return new PresentationView()
                    }
                    if (topic == 'About') {
                        return new AboutView()
                    }
                },
            },
        ]
    }
}
