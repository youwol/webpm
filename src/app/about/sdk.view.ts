import { ChildrenLike, VirtualDOM } from '@youwol/rx-vdom'
import { paragraphStyle, SectionTitle } from './common'
import { Cell } from './cell.view'

export class SdkView implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class = 'mx-auto border-left p-5'
    public readonly children: ChildrenLike
    constructor() {
        this.children = [
            new SectionTitle({
                title: 'Pushing the boundaries',
                subtitle: 'Access local data/programs, custom backends, SDK',
            }),
            { tag: 'div', class: 'my-4' },
            {
                tag: 'div',
                class: 'w-75 mx-auto',
                style: paragraphStyle,
                children: [
                    {
                        tag: 'div',
                        innerHTML: `Because everything can not run in a browser, be it for technical or security reasons,
                        the all youwol environment can run in a personal computer. 
                        You get the best of what a hybrid local/cloud environment can provide.`,
                    },
                ],
            },

            new GridView(),
            { tag: 'div', class: 'my-4' },
            {
                tag: 'div',
                class: 'w-75 mx-auto',
                style: paragraphStyle,
                children: [
                    {
                        tag: 'div',
                        innerHTML: `Want to get started? Execute the command: <pre><b><i>pipx run youwol</i></b></pre>
 and visit our interactive tours presented <a href="">here</a>`,
                    },
                    // {
                    //     tag: 'div',
                    //     innerHTML: `<b>YouWol on Your PC</b> <br>
                    //     YouWol provides the <a href="https://pypi.org/project/youwol/" target="_blank">python package youwol</a>,
                    //      it's the foundation of our SDK as it allows to run all YouWol infrastructure in your PC.
                    //     This local development environment allows for testing and building applications before deploying them to a broader audience.
                    //     It also allows including software tools and datasets in your projects that are only available on your machine.  `,
                    // },
                    // { tag: 'div', class: 'my-2' },
                    // {
                    //     tag: 'div',
                    //     innerHTML: `<b>Developer Portal: Bring Your Stack and Deploy Your Solution</b><br>
                    //     The developer portal is a central hub where developers can manage their projects and solutions.
                    //     It offers a convenient space to bring together various components of your tech stack.
                    //      Developers can deploy their solutions directly from this portal, simplifying the deployment
                    //      process and ensuring a seamless experience.`,
                    // },
                    // { tag: 'div', class: 'my-2' },
                    // {
                    //     tag: 'div',
                    //     class: 'text-center',
                    //     innerHTML: `Check this <a href='' target="_blank">video</a> to deploy an app in 3 minutes.`,
                    // },
                ],
            },
        ]
    }
}

class GridView implements VirtualDOM<'div'> {
    public readonly tag = 'div'
    public readonly class = ' d-flex justify-content-center flex-wrap mt-4'
    public readonly children: ChildrenLike
    constructor() {
        this.children = [
            new Cell({
                imageName: 'youwol-in-pc.png',
                title: `Bring YouWol in your PC`,
                text: `
Running the entire infrastructure locally offers several practical benefits:

#### **Local Development Empowerment:**
Running YouWol services on a personal computer facilitates local development and testing.

#### **Efficient Resources Handling:**
All resources are lazily fetched and installed from the cloud. 
   They are only brought down on-demand, optimizing resource usage. They are also persisted locally for a consistent & optimized experience.

#### **Transparent Use of Custom Backends:**
Unlike the online version, the local setup enables the transparent use of custom backends. 
   Just like other resources, if a particular backend gets required in a workflow, it will be installed at a compatible version
   and persisted in your computer (along with the particular environment it requires).

#### **Configurability of Local Servers:**
Local servers are highly configurable, allowing users to adapt them to specific needs through middleware options, 
   custom commands, and flexible configuration adjustments.
`,
            }),
            new Cell({
                imageName: 'bring-pc-pieces.png',
                title: 'Use local resources',
                text: `
Because the local server run in your own PC, it opens up the ability to use in your workflow 
data, softwares or environments that are only available in your computer (or that can not be shared).
It is particularly relevant for instance to use data that can not be published online for security reasons,
use programs that can not be shared with others through webpm or a custom backends, or interacting with
your OS to provide access to development tools. 
                 `,
            }),
            new Cell({
                imageName: 'os-tools.png',
                title: 'Software Development Kit',
                text: `
In addition to the online services, the local iteration of YouWol introduces the concept of 
projects, representing a versatile formalization of an executable designed to run within the YouWol 
environment. These projects are backed by pipelines, which explicitly outline the procedures for
building, testing, publishing, and more. This framework offers a flexible and collaborative approach, 
simplifying the definition of development configurations.

Executables within projects fall into two categories: 
*  **browser-compatible**: derived from languages
                   like JavaScript or TypeScript that transpile to JavaScript or WebAssembly and can be executed in a browser, 
*  **browser-incompatible**: formalized as backend services but currently unavailable online (yet installed transparently in the local version of youwol).`,
            }),
        ]
    }
}
