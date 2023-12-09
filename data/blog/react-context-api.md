---
title: 'Managing a Shopping Cart with the Context API'
date: '2023-12-08'
tags: ['Code', 'React']
draft: false
summary: 'Discover how to master state management in React using the Context API in detail with practical examples and essential tips.'
---

[In the previous post](https://rafaelcamillo.com/blog/react-management-state) we briefly covered the state management options in React. In this article, we'll explore in more detail the Context API, one of the most popular options for global state management in React.

# What is the Context API?

Context API is a React API that allows you to share data between components without the need to manually pass props between each component. It's an alternative to state management with Redux, for example.

# When to use the Context API?

The Context API is useful for sharing data between components that are not directly connected. For example, a button component that needs to access the application's current theme, or a form component that needs to access the user's authentication state.

## List of Context API Usage Examples

The Context API can be applied in various situations in a React application. Here are some practical examples:

- \*\*Theme Management: Allowing themes (light/dark) to be changed throughout the application.
- **Authentication Data**: Sharing logged-in user information and controlling access to restricted areas.
- **Language Settings**: For multilingual applications, managing language changes and localization.
- **Form Data Sharing**: In complex or multi-step forms, maintaining the status of the data entered.
- **Layout Control**: Managing the visibility and status of layout components, such as sidebars or modals.
- **Notifications and Messages**: Distributing global messages or alerts, such as API errors or confirmations.
- **Shopping Cart Status**: In e-commerce, to manage items added to the cart.

# How to use the Context API?

The Context API is made up of three main parts: the context, the provider and the consumer.

The context is the object that contains the data that will be shared between the components. The provider is the component that supplies the context data. The consumer is the component that consumes the context data.

# Managing a Shopping Cart

Let's use the Context API to create and manage a shopping cart in a React application.

## Step 1: Creating the Context

First, we need to create a context for our shopping cart:

```jsx
import React from 'react'

const ShoppingCartContext = React.createContext()

export default ShoppingCartContext
```

## Step 2: Creating the Context Provider

Next, we create a provider that will manage the state of the cart:

```jsx
import React, { useState } from 'react'
import ShoppingCartContext from './ShoppingCartContext'

function ShoppingCartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (item) => {
    setCart((currentCart) => [...currentCart, item])
  }

  const removeFromCart = (itemId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== itemId))
  }

  return (
    <ShoppingCartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

export default ShoppingCartProvider
```

## Passo 3: Consumindo o Contexto

Agora, qualquer componente que necessite interagir com o carrinho de compras pode consumir nosso contexto:

```jsx
import React, { useContext } from 'react'
import ShoppingCartContext from './ShoppingCartContext'

function CartButton() {
  const { addToCart } = useContext(ShoppingCartContext)

  return (
    <button onClick={() => addToCart({ id: 1, name: 'Produto X', price: 100 })}>
      Adicionar ao Carrinho
    </button>
  )
}

export default CartButton
```

## Passo 4: Visualizando o Carrinho

Por fim, para visualizar os itens no carrinho:

```jsx
import React, { useContext } from 'react'
import ShoppingCartContext from './ShoppingCartContext'

function CartItems() {
  const { cart } = useContext(ShoppingCartContext)

  return (
    <div>
      {cart.map((item) => (
        <div key={item.id}>
          <p>
            {item.name}: ${item.price}
          </p>
        </div>
      ))}
    </div>
  )
}

export default CartItems
```

# Conclusão

Usar a Context API para gerenciar um carrinho de compras em React torna o compartilhamento de estado entre componentes uma tarefa simples e eficiente. Este exemplo mostra como a Context API pode ser utilizada para gerenciar estados complexos e compartilhados em uma aplicação.

Não esqueça de me seguir no [Twitter](https://twitter.com/rafaelcamillo_) ou [LinkedIn](https://www.linkedin.com/in/rafael-camillo/) pra saber de todos os novos artigos ou insights.
