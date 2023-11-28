import { ChildrenLike, VirtualDOM } from '@youwol/rx-vdom'
import { paragraphStyle, SectionTitle } from './common'
import { Cell } from './cell.view'

export class ConceptView implements VirtualDOM<'div'> {
    public readonly tag: 'div'
    public readonly class = 'mx-auto border-left border-bottom p-5'
    public readonly children: ChildrenLike
    constructor() {
        this.children = [
            new SectionTitle({
                title: 'The concept',
                subtitle:
                    'Browsers: customizable, accessible, connected & performant',
            }),
            { tag: 'div', class: 'my-4' },
            {
                tag: 'div',
                class: 'd-flex flex-column justify-content-around align-items-center',
                children: [
                    {
                        class: 'w-100',
                        style: paragraphStyle,
                        tag: 'p',
                        innerHTML: `Positioned between your PC and the cloud is capable of merging the customizability of PC with the accessibility of cloud solutions.
                 Also, it inherently possesses the capability to execute a variety of computations.`,
                    },
                    new GridView(),
                    { tag: 'div', class: 'my-4' },
                    {
                        class: 'w-100',
                        style: paragraphStyle,
                        tag: 'p',
                        innerHTML: `The concept? Extending local & cloud solutions by running and sharing code 
                 through web-browser. The only lacking component was a robust package manager able to install and link
                 runtimes dynamically directly into web-browsers. It is the essence of <a href="https://webpm.org" target="_blank">WebPM</a>:
                 promote an install-free, customizable & extendable runtime environment for browsers.`,
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
                imageName: 'adaptor.png',
                title: `Standardized API & universal compilation target.`,
                text: `
Web browsers play a pivotal role in adhering to standardized practices, both in terms of APIs 
(Application Programming Interfaces) and as compilation targets. 
### Benefits:
#### **Cross-Browser Compatibility:**
   Standardized APIs ensure that web applications work consistently across different browsers, providing a seamless user experience without compatibility issues.
#### **Language Diversity:**
   With Wasm as a compilation target, developers can choose from a variety of languages to write performance-critical code, promoting language diversity and flexibility in web development.
#### **Easier Maintenance:**
   Standardized APIs simplify the maintenance of web applications, as developers can rely on a set of well-defined interfaces. This reduces the effort required for adapting code to different browser environments.
#### **Innovation and Compatibility:**
   Standards foster innovation by providing a stable foundation for web development. They enable developers to create cutting-edge applications while ensuring compatibility across diverse platforms and devices.
`,
            }),
            new Cell({
                imageName: 'connected.png',
                title: 'Connection to PC, servers & peripherals.',
                text: `
Web browsers serve as versatile platforms that facilitate seamless connections to PC servers and peripherals.
They provide a unified environment for connecting to PC, servers and peripherals. This unified approach streamlines 
the development of web applications that need to interact with server-side resources and external devices.
They also expose APIs that allow web applications to access hardware capabilities on the user's PC, including cameras,
 microphones, and sensors.
### Benefits:
#### a. **Remote Server Access:**
   Web browsers enable users to access and interact with PC servers remotely. This is particularly advantageous for scenarios where centralized server resources need to be leveraged for processing or data storage.
#### b. **Hardware Integration:**
   The availability of APIs for hardware access allows web applications to integrate seamlessly with peripherals. This includes capturing audio or video input, accessing device sensors, and interacting with external devices connected to the PC.
#### c. **Cross-Device Compatibility:**
   The standardized approach of web browsers ensures that applications can connect to PC servers and peripherals consistently across different devices and operating systems, enhancing cross-device compatibility.
#### d. **Real-Time Interactivity:**
   Web browsers support real-time interactivity with PC servers and peripherals, facilitating dynamic and responsive user experiences. This is crucial for applications that require timely data updates or user interactions with connected devices.
#### e. **Device Agnosticism:**
   The browser environment abstracts underlying hardware complexities, allowing applications to be device-agnostic. Developers can create applications that seamlessly connect to various peripherals without the need for device-specific implementations.
`,
            }),
            new Cell({
                imageName: 'siwss-knife.png',
                title: 'Just-in-time compilation, various languages support.',
                text: `
Web browsers exhibit remarkable flexibility through features such as just-in-time compilation and support for a diverse
 array of programming languages.
Just-in-time compilation allows a dynamic translation of programs into machine code during runtime. 
This dynamic optimization provides the opportunity to install new runtimes at any times during execution.
Web browsers are also designed to support a variety of programming languages, extending beyond the traditional realm
 of JavaScript. This includes languages like C, C++, Rust, and others. 
 
### Benefits:
#### **Runtime Optimization:**
   JIT compilation optimizes code execution at runtime, significantly improving the flexibility of web applications.
    This ensures that applications run efficiently, even when incorporating functionalities from languages other than JavaScript.
#### **Web Assembly (Wasm):**
   Wasm as a compilation target further expands the language choices for developers. It empowers them to utilize 
   languages traditionally associated with system-level programming, unlocking new possibilities for high-performance 
   computing directly within the browser.
#### **Easier Integration:**
   Web browsers seamlessly integrate code written in different languages, promoting interoperability. 
   This allows developers to leverage the strengths of each language, contributing to a modular and extensible architecture.
`,
            }),
            new Cell({
                imageName: 'rocket.png',
                title: 'Multi-threading, GPU, Web-Assembly ...',
                text: `
Web browsers leverage advanced technologies, including multi-threading, GPU support, and Web Assembly (Wasm), 
to deliver enhanced performance and capabilities. 

### Benefits:

#### **Improved Responsiveness:**
   Web browsers implement multi-threading, allowing concurrent execution of tasks. This parallel processing enhances
    responsiveness and efficiency, especially for computationally intensive operations,
     by leveraging multiple threads to handle different aspects of a web application simultaneously.

#### **Graphics Performance:**
   Web browsers tap into the power of Graphics Processing Units (GPUs) to offload graphics-intensive tasks.
    GPU acceleration accelerates rendering and improves the performance of visually rich content, such as 3D graphics,
     animations, and complex visualizations.

#### **High-Performance Computing:**
  Web browsers support Web Assembly as a compilation target, enabling high-performance execution of code written in 
  languages like C, C++, and Rust. Wasm allows developers to harness the full potential of low-level optimizations, 
  delivering near-native speed for critical computations within the browser environment.

#### **Efficient Resource Utilization:**
   Multi-threading and GPU support enable browsers to utilize system resources more efficiently, distributing
    workloads across multiple cores and offloading graphics processing to specialized hardware.

#### **Versatile Application Capabilities:**
   The combination of multi-threading, GPU support, and Web Assembly broadens the scope of applications 
   that can be run within the browser. From immersive graphics to complex calculations, web applications can deliver 
   a wide range of functionalities with high performance.
`,
            }),
        ]
    }
}
