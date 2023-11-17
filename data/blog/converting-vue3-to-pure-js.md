---
title: 'How I Solved the Micro Frontend Compatibility Issue'
date: '2023-10-24'
image: '/static/images/transform.jpg'
tags:
  [
    'Vue.js',
    'JavaScript',
    'transpilation',
    'microfrontends',
    'vue 3',
    'real world problem',
    'Quasar',
  ]
draft: false
summary: 'Facing challenges with incompatible Vue 3 components in microfrontends? Discover a creative approach to transpile Vue 3 components into pure JavaScript, ensuring seamless integration across projects.'
---

![Descrição](/static/images/transform.jpg)

As soon as I joined the company, the team was working with microfrontends, refactoring our sidenav and integrating it into our design system. Our UI library was written in Vue 3, but some of our projects were not yet Vue 3 compatible. The sidenav, which we use across all products, became a question mark.
So,
The solution they came up with was to use pure JavaScript to build the sidenav and export that file. Initially, it worked well, but soon we were dealing with issues we knew other libraries we were already using had solved, such as animations, dropdowns with pop-ups, and so on.

# Light at the End of the Tunnel

So, I had an idea: why not create a script that would convert our Vue 3 component into good old pure JavaScript? This way, we could break through the compatibility barrier and also open doors to use other libraries, like a dropdown one.

## Getting Hands Dirty

To demonstrate how I solved this issue, I decided to rebuild the projects and walk you through it. The final project can be found in the (Github repository.)[https://github.com/camillodev/sidenav-vue3]

## Preparations:

Before getting started, it's essential to have Node.js and Vue CLI installed in your environment. If you already have Vue CLI, make sure it's updated to version 4.5.11 or higher.

```
npm install -g @vue/cli
```

## Vue 3 Project:

We'll create a Vue 3 project and a sidenav component that utilizes Quasar, a UI library for Vue 3.

```
vue create sidenav-vue3
cd vue3-project
```

**Installing Quasar**

```
vue add quasar
```

**Create Sidenav Component**

```
<!-- SideNav.vue -->
<template>
    <q-drawer show-if-above :value="true" class="bg-primary text-white">
        <q-list>
            <q-item clickable v-ripple>
                <q-item-section>Item 1</q-item-section>
            </q-item>

            <q-item>
                <q-item-section>
                    Item 2
                </q-item-section>
                <q-menu anchor="top end" self="top start">
                    <q-list class="bg-primary">
                        <q-item clickable class="bg-primary text-white">
                            <q-item-section>Sub-item 1</q-item-section>
                        </q-item>
                        <q-item clickable class="bg-primary text-white">
                            <q-item-section>Sub-item 2</q-item-section>
                        </q-item>
                        <q-item clickable class="bg-primary text-white">
                            <q-item-section>Sub-item 3</q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-item>

            <q-item clickable v-ripple>
                <q-item-section>Item 3</q-item-section>
            </q-item>
        </q-list>
    </q-drawer>
</template>

<script>
export default {
    name: 'SideNav',
    props: {
        drawer: Boolean
    },
    computed: {
        drawerModel: {
            get() {
                return this.drawer;
            },
            set(value) {
                this.$emit('update:drawer', value);
            }
        }
    }
}
</script>

<style lang="scss" >
.q-drawer {

    .q-item {
        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }

    .q-btn-dropdown {
        .q-item {
            &:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
        }
    }
}
</style>

```

# Transpiling to Pure JavaScript

Now, instead of manually transpiling the Vue 3 component to pure JavaScript, we can leverage the feature of (Vue Build Targets.)[https://cli.vuejs.org/guide/build-targets.html]

In the **vue.config.js** file, make the following changes:

```
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: ['quasar'],
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: true,
    },
  },
  configureWebpack: {
    entry: {
      sidenav: './src/components/SideNav.vue',
    },
    output: {
      filename: '[name].js',
      libraryExport: 'default',
    },
  },
  productionSourceMap: false,
});
```

This will configure the Vue CLI to compile the Vue 3 component into a pure JavaScript file, making it easily usable in projects not based on Vue 3.

With this approach, you extend the utility of Vue components beyond the framework's boundaries, simplifying integration with incompatible micro frontends.

# Conclusion

Solving compatibility issues in micro frontends can be challenging, but with the right creativity and the use of appropriate tools, it's possible to overcome these barriers. By adopting the build target capabilities of the Vue CLI, you can ensure that your Vue 3 components are easily integrable in various contexts, making your development more flexible and efficient.

Remember to consult the Vue CLI documentation for more details on the use of build targets and other powerful features.

With this updated approach, you'll be better prepared to face the challenges of developing micro frontends with Vue 3 components in incompatible projects.

Don't forget to follow me on [Twitter](https://twitter.com/rafaelcamillo_) or [LinkedIn](https://www.linkedin.com/in/rafael-camillo/) to know about all the new articles or insights.
