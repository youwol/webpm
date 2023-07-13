import { VirtualDOM } from '@youwol/flux-view'

export class PublishPackagesSection implements VirtualDOM {
    public readonly class = 'text-center mx-auto'
    public readonly children: VirtualDOM[]

    constructor() {
        this.children = [
            { class: 'my-5' },
            {
                innerText: 'Package publication',
                style: {
                    fontSize: '2rem',
                    fontWeight: 'bolder',
                },
            },
            { class: 'my-3' },
            {
                class: 'text',
                innerHTML:
                    'In order to exploit to the full extends the WebPM solution, packages have to be properly configured; ' +
                    ' especially regarding the management of the external dependencies. Note that no changes in the source code is' +
                    " required (at least for ESM modules), and the WebPM configuration can be added separately from a 'regular' one. " +
                    ' We propose two options to publish a package.',
            },
            { class: 'my-2' },
            {
                class: 'text',
                innerHTML:
                    'It is possible to directly publish packages that are available in the NPM repository: ' +
                    '<li> navigate under the section "browse packages" in the top banner </li>' +
                    '<li> search for the package you want to make available in WebPM</li>' +
                    '<li> request publication if it is not already available</li></ul>',
            },
            { class: 'my-2' },
            {
                class: 'text',
                innerHTML:
                    "The other options involve the installation of the <a href='https://pypi.org/project/youwol/'>youwol</a> python package." +
                    ' Among others, it emulates WebPM in a PC, and provides developers solutions to facilitate' +
                    ' building and publishing projects.',
            },
        ]
    }
}
