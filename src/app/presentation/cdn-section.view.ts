import { VirtualDOM } from '@youwol/flux-view'

export class CdnSectionView {
    public readonly class = 'text-center text-justify mx-auto'
    public readonly children: VirtualDOM[]
    constructor() {
        this.children = [
            {
                class: 'separator',
            },
            { class: 'my-5' },
            {
                innerText: 'Difference with a regular CDN',
                style: {
                    fontSize: '2rem',
                    fontWeight: 'bolder',
                },
            },
            { class: 'my-3' },
            {
                class: 'text',
                innerHTML:
                    "It's all about managing dependencies, a critical aspect of scalable project development. " +
                    'Regular CDNs offer two options for handling them: including them in the bundle or leaving it up to the consumer to handle.<br>' +
                    'Bundling dependencies with libraries leads to scalability issues: shared dependencies are duplicated, increasing payload sizes and introducing potential bugs. ' +
                    'Avoiding this is the very reason why package managers exists.<br>' +
                    'On the other hand, relying on consumers to include dependencies manually and in the correct order is not scalabile neither: ' +
                    'it becomes challenging to manage and maintain, especially as the number of dependencies and their interdependencies grow.<br>' +
                    "Addressing this challenge is at the heart of WebPM's mission. " +
                    'Through its infrastructure and client, WebPM enables the effortless installation of dependency trees. ' +
                    'Libraries can be published as self-contained entities, ' +
                    'while ensuring long-term scalability and maintainability of projects. <br>' +
                    'The downside of WebPM is that it is not possible to directly consume projects from GitHUB or NPM. ' +
                    'However, it is most of the time a straigthforward process as explained in the next section. ',
            },
        ]
    }
}
