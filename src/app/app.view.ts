import { child$, VirtualDOM } from '@youwol/flux-view'
import { TopBannerView } from './top-banner.view'
import { PresentationView } from './presentation/presentation.view'
import { BehaviorSubject } from 'rxjs'

export type Topic = 'Presentation'

export class AppView implements VirtualDOM {
    public readonly topic$ = new BehaviorSubject<Topic>('Presentation')
    public readonly class = 'h-100  w-100 d-flex flex-column'

    public readonly children: VirtualDOM[]

    constructor() {
        this.children = [
            new TopBannerView({ topic$: this.topic$ }),
            child$(this.topic$, (topic) => {
                if (topic == 'Presentation') {
                    return new PresentationView()
                }
            }),
        ]
    }
}
