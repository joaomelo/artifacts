# Calystone

Self management system based on your file system.

# Architecture

## Layers

The arrows represent wich modules depends on. In that case the control module depends on the view module but the view knows nothing about the control.

```mermaid
graph TD
  main
  subgraph core
    direction LR
    domain
    display
  end
  utils
  main --> core
  main --> utils
  core --> utils
  display --> domain
```

## Design strategies

Nothing in this app, even utils, is coded with a mindset to be later used in other apps or libs. this kind of design bring complexity. This app code has to be as focuses as possible. Complexity is added only when indispensible to achive some app known and present goal.

## Main

Starts the applicaton, initializes app level state and stablish runtime dependencies.

## Display

Make the app move. It grabs and transform state from `domain` and show it to the user, then captures events triggered by the user ans translates them into funtion or method calls to `domain`.

```mermaid
graph LR;
  subgraph router
    routeA --> routeA1;
    routeA --> routeA2;
    routeB
  end
  subgraph views
    frameW;
    pageX;
    pageU;
  end
  subgraph widgets
    widgetN
    widgetM
  end
  subgraph external
    component
  end

  routeA1 --> frameW;
  routeA2 --> pageX;
  routeB --> pageU
  pageX --> widgetN
  frameW --> widgetN;
  pageU --> widgetM;
  widgetM --> component
```

### Routes

The top structure starts at the route level. Routes are objects that define the entry points available to the user. The shape of the route objects are defined by the vue-router library API.

The route will render zero or one view component. Routes can have children routes to enable view nesting. It can render a control for a frame in case of a shared layout and then a child route with the corresponding main page.

### Views

Views are what the user see in the end. They access the domain via a central construct called Store. All data they need they grab from the store user signals are convert to calls to the store inner methods.

Views can be complex structures in order to deal with data orchestrations. They can abstract its capacities into subcomponets or composables to streamline code.

### Widgets

They are shared resources (components and composables) used by more than one view or other widgets.

Widgets are also used to function as single entry points for outside UI dependencies. Like if some button from a UI library is used in the app, for example. On that case, the button should be imported in a proxy ButtonBase widget and then used in pages, even if for a single page.

### Styles

Styles are guided by design tokens that came from the Prime Vue UI library (mainly colors) and from the Open Props library (mainly sizes).

The project uses vanilla CSS with design tokens coming from custom properties. The project does not use utility classes even when available. That is way open props is used instead of TailwindCss.

## Domain

Domain is the bussiness logic running in a vacum without care about `views`.

Its has as concise as possible properties and methods to allow state mutation, asserting business rules, and exposing essencial data to the view.

These types are not meant to be flexible or adapt to every needs of the UI. The point here is simplicity and communality. Views will extedend upon the domain to reach their needs.

When adding something to the domain ask yourself, does the domain doesn't already expose this? if so, create the capability in the consumer.

## Utils

Language or technology helpers that don't need to be aware of bussiness rules and don't need runtime state goes here. Utils only knows about utils and nothing else.