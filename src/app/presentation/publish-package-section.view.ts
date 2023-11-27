import { ChildrenLike, VirtualDOM } from '@youwol/rx-vdom'

export class PublishPackagesSection implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class = 'text-center mx-auto'
    public readonly children: ChildrenLike

    constructor() {
        this.children = [
            { tag: 'div', class: 'my-5' },
            {
                tag: 'div',
                innerText: 'Package publication',
                style: {
                    fontSize: '2rem',
                    fontWeight: 'bolder' as const,
                },
            },
            { tag: 'div', class: 'my-3' },
            {
                tag: 'div',
                class: 'text',
                innerHTML:
                    'In order to exploit to the full extends the WebPM solution, packages have to be properly configured; ' +
                    ' especially regarding the management of the external dependencies. Note that no changes in the source code is' +
                    " required (at least for ESM modules), and the WebPM configuration can be added separately from a 'regular' one. " +
                    ' We propose two options to publish a package.',
            },
            { tag: 'div', class: 'my-2' },
            {
                tag: 'div',
                class: 'text',
                innerHTML:
                    'It is possible to directly publish packages that are available in the NPM repository: ' +
                    '<li> navigate under the section "browse packages" in the top banner </li>' +
                    '<li> search for the package you want to make available in WebPM</li>' +
                    '<li> request publication if it is not already available</li></ul>',
            },
            { tag: 'div', class: 'my-2' },
            {
                tag: 'div',
                class: 'text',
                innerHTML:
                    "The other options involve the installation of the <a href='https://pypi.org/project/youwol/'>youwol</a> python package." +
                    ' Among others, it emulates WebPM in a PC, and provides developers solutions to facilitate' +
                    ' building and publishing projects.',
            },
        ]
    }
}
