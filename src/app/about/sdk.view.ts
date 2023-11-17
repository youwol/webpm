import { ChildrenLike, VirtualDOM } from '@youwol/rx-vdom'
import { paragraphStyle, SectionTitle } from './common'
import { setup } from '../../auto-generated'

export class SdkView implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class = 'mx-auto border-left p-5'
    public readonly children: ChildrenLike
    constructor() {
        this.children = [
            new SectionTitle({
                title: 'Software Development Kit',
                subtitle: 'Code as you like, deploy as you want',
            }),
            { tag: 'div', class: 'my-4' },
            {
                tag: 'div',
                class: 'd-flex justify-content-center',
                children: [
                    {
                        tag: 'img',
                        style: {
                            height: '250px',
                        },
                        src: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/assets/dev-portal.png`,
                    },
                ],
            },
            { tag: 'div', class: 'my-4' },
            {
                tag: 'div',
                class: 'w-75 mx-auto',
                style: paragraphStyle,
                children: [
                    {
                        tag: 'div',
                        innerHTML: `<b>YouWol on Your PC</b> <br>
                        YouWol provides the <a href="https://pypi.org/project/youwol/" target="_blank">python package youwol</a>,
                         it's the foundation of our SDK as it allows to run all YouWol infrastructure in your PC.
                        This local development environment allows for testing and building applications before deploying them to a broader audience.
                        It also allows including software tools and datasets in your projects that are only available on your machine.  `,
                    },
                    { tag: 'div', class: 'my-2' },
                    {
                        tag: 'div',
                        innerHTML: `<b>Developer Portal: Bring Your Stack and Deploy Your Solution</b><br>
                        The developer portal is a central hub where developers can manage their projects and solutions. 
                        It offers a convenient space to bring together various components of your tech stack.
                         Developers can deploy their solutions directly from this portal, simplifying the deployment 
                         process and ensuring a seamless experience.`,
                    },
                    { tag: 'div', class: 'my-2' },
                    {
                        tag: 'div',
                        class: 'text-center',
                        innerHTML: `Check this <a href='' target="_blank">video</a> to deploy an app in 3 minutes.`,
                    },
                ],
            },
        ]
    }
}
