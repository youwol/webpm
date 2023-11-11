import { VirtualDOM } from '@youwol/flux-view'

export class AssetsStoreView {
    public readonly class = 'text-center mx-auto'
    public readonly children: VirtualDOM[]
    constructor() {
        this.children = [
            { class: 'my-5' },
            {
                innerText: 'managing data...',
                style: {
                    fontSize: '2rem',
                    fontWeight: 'bolder',
                },
            },
            { class: 'my-3' },
            {
                class: 'text',
                innerText:
                    'In the modern world, applications are heavily reliant on data as it enables software systems to ' +
                    'function and integrate seamlessly. The concept of data is so central to many applications that ' +
                    'they are built around it. WebPM recognizes the importance of data and offers a flexible ' +
                    'solution in the form of "assets". Assets are a generic concept that consist of a set of files ' +
                    '(and soon indexed documents), which can be persisted and shared. ' +
                    'They are exposed like a filesystem, authorized using a concept of group, and can be associated' +
                    ' with different behaviors using applications or libraries.',
                //'In fact WebPM is built upon a generic assets store; libraries and applications being a particular kind of them. New kind of assets can be defined on the fly by users, associated to files - soon to be indexed documents - and shared using a concept of groups. Assets are organized like a filesystem and can be associated to behaviors using applications or libraries.',
            },
        ]
    }
}
