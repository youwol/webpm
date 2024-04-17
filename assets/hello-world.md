# Objective

This example illustrates how webPM simplifies and robustifies the consumption of libraries
directly from the browser.

Let's examine a simple example of displaying a dropdown menu using the bootstrap library.

## Using regular CDN

```html
<head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
  />
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"></script>
</head>
```

## Using webPM CDN

```html
<script type="module">
  await webpm.install({
    modules: ['bootstrap#^4.4.1'],
    css: ['bootstrap#^4.4.1~bootstrap.min.css'],
    displayLoadingScreen: true,
  })
</script>
```
