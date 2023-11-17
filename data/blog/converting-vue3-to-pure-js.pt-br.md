---
title: 'Como resolvi o problema de incompatibilidade entre micro front ends'
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
summary: 'Enfrentando desafios com componentes Vue 3 em microfrontends não-compatíveis? Descubra uma abordagem criativa para transpilar componentes Vue 3 para JavaScript puro, garantindo integração perfeita entre projetos.'
---

![Descrição](/static/images/transform.jpg)

Assim que entrei na empresa, a equipe estava trabalhando com microfrontends, refatorando nosso sidenav e adicionar ele no nosso design system. Nossa biblioteca UI foi escrita em Vue 3, mas alguns dos nossos projetos não eram ainda Vue 3 ou compativeis. O sidenav, que a gente usa em todos os produtos, virou um ponto de interrogação.
Assim que
A solução que encontraram foi de usar JavaScript puro pra construir o sidenav e exportar esse arquivo. No inicio até que funcionou bem mas logo a gente estava lidando com problemas que sabiamos que outras bibliotecas que ja usavamos ja tinha resolvido o problema, como animacoes, dropdowns com popups etc.

# A Luz no Fim do Túnel

Então tive uma ideia: por que não criar um script que transformasse nosso componente Vue 3 em bom e velho JavaScript puro? Assim, a gente quebrava essa barreira da incompatibilidade e ainda abria as portas pra usar outras bibliotecas, tipo uma de dropdown.

# Mão na Massa

Para demonstrar como resolvi esse problema eu resolvi recriar os projetos e criar junto com vocês. O projeto final pode ser encontrado no (repositório do Github)[https://github.com/camillodev/sidenav-vue3]

## Preparativos:

Antes de começar, é essencial ter o Node.js e Vue CLI instalados no seu ambiente. Se você já tiver o Vue CLI, certifique-se de estar acima da versão 4.5.11+

```
npm install -g @vue/cli
```

## Projeto Vue 3:

Vamos criar um projeto Vue 3 e um componente sidenav que utiliza o Quasar, uma biblioteca UI para Vue 3.

```
vue create sidenav-vue3
cd vue3-project
```

**Instale o Quasar**

```
vue add quasar
```

**Crie o componente Sidenav.vue**

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

# Transpilação para JavaScript Puro

Agora, em vez de transpilar manualmente o componente Vue 3 para JavaScript puro, podemos aproveitar o recurso de (Vue Build Targets)[https://cli.vuejs.org/guide/build-targets.html].

No arquivo **vue.config.js**, faça as seguintes alterações:

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

Isso configurará o Vue CLI para compilar o componente Vue 3 em um arquivo JavaScript puro, tornando-o facilmente utilizável em projetos que não são baseados no Vue 3.

Com essa abordagem, você estende a utilidade dos componentes Vue para além das fronteiras do framework, simplificando a integração com micro frontends não compatíveis.

# Conclusão

Resolver problemas de incompatibilidade em microfrontends pode ser desafiador, mas com a criatividade certa e o uso das ferramentas adequadas, é possível superar essas barreiras. Ao adotar as capacidades de build targets do Vue CLI, você pode garantir que seus componentes Vue 3 sejam facilmente integráveis em diversos contextos, tornando seu desenvolvimento mais flexível e eficiente.

Lembre-se de consultar a documentação do Vue CLI para obter mais detalhes sobre o uso de build targets e outras funcionalidades poderosas.

Com essa abordagem atualizada, você estará melhor preparado para enfrentar os desafios do desenvolvimento de microfrontends com componentes Vue 3 em projetos não compatíveis.

Não esqueça de me seguir no (Twitter)[https://twitter.com/rafaelcamillo_] ou (LinkedIn)[https://www.linkedin.com/in/rafael-camillo/] pra saber de todos os novos artigos ou insights.
