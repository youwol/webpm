## Hello world

<!-- Taken from online example using standard cdn solution (here jsdelivr)-->

<!DOCTYPE html>

    <html lang="en">

        <head>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css">

            <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"></script>
        </head>

        <body class="vh-100 vw-100">
            <div class="dropdown">
                 <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 Dropdown button
                 </button>
                 <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item">Action</a>
                    <a class="dropdown-item">Another action</a>
                    <a class="dropdown-item">Something else here</a>
                 </div>
            </div>
        </body>
    </html>

## Real world

### intro

Let's look at this second example of WebPM.
It's a good example of what it allows to do in a somewhat complex scenario.

This complex scenario happens to be here the construction of a small algorithm that a remesh a 3D objects using a low code solution.
It does not really matter what the scenario is, it is just a good example that illustrate the capabilities of webpm.

The low code application is constructing a small workflow that connects modules here.
Let's have a quick glance at the output to get a better idea of wht it is.

### Look at the output

Let's look first at the result.
On the top the result of the algo.
On the bottom is the representation of the flowchart: basically a torus geometry, remeshed by the C++ library polygon mesh library ... visualization

### Back to the code

In the code three sections:

- first is installed the core libraries required by the low code solution, each libraries here comes with their dependencies.
- second the construction of the low code algorithm, we can recognize the steps.
- At the end we display the graphical element of the viewer on the top, and the flow chart on the bottom.

- going back to the second step. Behind the wood WebPM, when the module will be instantiated,
  will install the required dependencies of each modules. It is not an easy task some of them are or will be already available with a
  compatible, some others will have to be installed, and we may very end up with multiple version of one library.
  This is the point of webpm: handling robust on the fly install in such complex scenatio.

The important point here is that we install some dependencies that we did not know in advance.
For such scenario in which you don't know the dependencies in advance you would not be able to use NPM, precisely because you don't
know which dependencies to install. Installing in a robust way dynamically is the point of webpm.

A kind of CDN based solution with on the fly installation is the only way, and to our knowledge webpm is the only one that allows to do handle all this complexity for you.

And again, this code will run the same way on ervery computer without having to install anything:
you copy this content into a file, send it to your friend, and that's it he can open it with its browser and see the result.

## Workers

### Introduction

This example is a demonstration on how easy it is to run multi-threaded computations using webPM and
its WorkersPoolModule.

A worker pool is a common concept in software development that facilitate offloading computation from the main thread to
others thread running on different CPUs.

This particular scenario is about using python to compute an approximation of PI, just like the previous example,
but this time at a much bigger scale.
It is a bit longer than the previous ones, about 70 lines of code, which is actually not that much considering for what it does.

Let's look at the application running.

### Run the code

### Explain the code

Let's go back to the code.

The workers pool module is an opt-in feature of webpm, and its installation has to be explicitly triggered.
This is goal of this line of code.

In the part next part of the code, we install the runtime of the main thread:

- a library to create the views, here a library call rx-vdom
- and rxjs used to manipulate streams of data.

Then is created a workers pool by specifying its runtime and its size:

- like in the previous example we use the custom installer cdn-pyodide-loader to require the python runtime and the numpy packages, no js packages
- its size: we want at least one worker ready, and a maximum of ten workers. That means we'll be able to run ten computation in // in maximum

Next piece of code is the definition of one task: we use python to approximate PI using the same methode described in the previous example.

The variable 'result$' is introduced to facilitate computing statistics on the results, we'll see that in a second.

The function 'scheduleThousandTasks' well... schedule a thousand tasks in the worker pool.
That means that whenever a worker is available it will pick the task, and, if no worker
are available, new one will be created, up until the maximum pool size.
From each task's output, the result is extracted from the last message and send into the variable result$.

The next block of code is to prepare various observables from result$ to be displayed on screen.

And finally we can construct the view displayed on screen:

- the button that trigger the thousand runs, it will be displayed as soon as at least one worker is ready,
  and before that a waiting message is displayed
- then display the various observables
- and a view provided by the worker pool module, that basically displays the various workers state.
