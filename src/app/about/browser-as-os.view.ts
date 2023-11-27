import { ChildrenLike, VirtualDOM } from '@youwol/rx-vdom'
import { paragraphStyle, SectionTitle } from './common'
import { Cell } from './cell.view'

export class BrowserAsOSSectionView implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class = 'mx-auto border-right border-bottom p-5'
    public readonly children: ChildrenLike
    constructor() {
        this.children = [
            new SectionTitle({
                title: 'Extending the concept',
                subtitle: 'Turn browsers into OS',
            }),
            { tag: 'div', class: 'my-4' },
            { tag: 'div', class: 'my-4' },
            {
                tag: 'div',
                class: 'w-75 mx-auto',
                style: paragraphStyle,
                children: [
                    {
                        tag: 'p',
                        innerHTML: `WebPM establishes the groundwork for an emulated OS within browsers.
                        Because applications encompass more than just installing runtimes (user management, persistent
                         storage, indexed databases, installers, environment, and more), YouWol offers for users and 
                         developers  a set of solutions to fully take advantage of this OS like environment.`,
                    },
                ],
            },
            new GridView(),

            {
                tag: 'div',
                class: 'w-75 mx-auto',
                style: paragraphStyle,
                children: [
                    {
                        tag: 'p',
                        innerHTML: `For a comprehensive understanding and detailed insights into the broader spectrum 
                        of the topic, encompassing areas such as HTTP clients, assisting libraries, testing configurations, 
                        and more, we encourage readers to explore the <a href="">dedicated page</a>.`,
                    },
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
                imageName: 'os-applications.png',
                title: `Essentials Apps`,
                text: `

Our innovative solution redefines the traditional computing paradigm by transforming a web browser into a 
fully functional operating system. This approach brings forth a collection of purpose-built applications, 
each designed to deliver essential functionalities within a familiar and intuitive user experience.

### Essential Applications for a Seamless User Experience:

#### **Desktop Application:**
   Our desktop application within the browser serves as the central hub for user interaction. 
   Mimicking the traditional desktop environment, it provides a familiar space for managing applications, 
   files, shortcuts, dashboard widgets, fostering a seamless transition for users accustomed to conventional 
   operating systems.

#### **Files Explorer Application:**
   The files explorer application enhances user productivity by offering an intuitive interface for organizing,
    accessing, and managing files within the browser-based operating system.
     Users can navigate folders, preview documents, and perform file-related tasks seamlessly.

#### **Application Hub:**
   Our solution includes an application hub that acts as a repository for a diverse range of web-based applications.
    Users can easily discover and launch applications directly from their browser, creating a unified ecosystem for 
    diverse computing needs.

#### **Usual UX Paradigm:**
   Emphasizing a usual User Experience (UX) paradigm, our solution ensures that users encounter a computing 
   environment that aligns with their expectations. The transition to a web browser as an operating system is smooth, 
   thanks to the incorporation of familiar application interfaces and navigation patterns.

#### **Collaboration and Integration:**
   Beyond individual applications, our solution fosters collaboration and integration. 
   Users can seamlessly switch between applications, share files, and collaborate in real-time, creating a cohesive and
    interconnected computing experience.
<!--
## 2. **Advantages of Browser-Based OS:**
   - **Platform Agnostic:** Accessible across different devices and operating systems.
   - **Easy Updates:** Applications and features are updated seamlessly without requiring manual intervention.
   - **Collaborative Workspace:** Facilitates collaborative work with shared documents and applications.
-->`,
            }),
            new Cell({
                imageName: 'os-backends.png',
                title: 'Backend APIs',
                text: `
Backend APIs play a pivotal role in empowering developers to construct new apps seamlessly.
 By providing a comprehensive set of APIs for essential backend functionalities, developers gain the foundation
  needed to create robust and feature-rich applications. 
#### **Storage Backend & Indexed Databases API:**
Through the concept of asset (or custom domain project), developers can effortlessly  manage user-uploaded files as
 well as  the creation of indexed databases, optimizing data access for improved 
     performance in applications that involve large datasets.
#### **Session Management API:**
   The Session Management API facilitates secure and reliable session handling. Developers can seamlessly integrate 
   session management capabilities into their apps, ensuring user authentication, authorization, and personalized 
   experiences across sessions.
#### **Data Management by Session API:**
   Going a step further, the Data Management by Session API enables developers to associate data directly with user 
   sessions. This allows for personalized data storage, retrieval, and modification based on user-specific contexts,
    enhancing the customization potential of applications.
#### **webPM Discovery API:**
   The webPM Discovery API streamlines content delivery by providing developers with a dynamic approach to discover
    and install libraries or applications. 
`,
            }),
            new Cell({
                imageName: 'os-projects.png',
                title: 'Custom Domain Project',
                text: `
The point of a custom domain project (or custom asset) is to provide developers and users with the flexibility to define and
 structure their projects according to their unique requirements, workflows, and objectives.

#### **Tailored to the needs**
 Custom domain projects allow developers to create projects that are specifically tailored to underlying requirements.
 They can formalize a project using specific files organization as well as associated indexed document to 
 access and manipulate data with speed and precision.

#### **Enhanced User Experience**: 
Custom domain projects can be bound to multiple applications and or libraries to enhance user experience.
It can be for instance associating right click actions from the files-explorer, provide standard previews.
Custom domain project usually comes with a concept of installer that gather multiple elements working together 
to be included in the user's environment. 

#### **Personalized Workflows**
 The concept enables users to establish workflows that align with their preferences and the nature of the project.
  This personalization can enhance efficiency and streamline the process of managing and collaborating on project-related tasks.
 `,
            }),
            // new Cell({
            //     imageName: 'os-tools.png',
            //     title: 'Various helpers for developpers',
            //     text: `The webOS ecosystem is also about a various set of HTTP-clients, helping libraries,
            //     testing configurations, and more. `,
            // }),
        ]
    }
}
