import Abstract from '../views/abstract';
import { renderPosition } from '../const';

export const replace = (newChild, oldChild) => {
  if(oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if(newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if(parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting element');
  }

  parent.replaceChild(newChild, oldChild);
};

export const render = (container, child, place) => {
  if(container instanceof Abstract) {
    container = container.getElement();
  }

  if(child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case renderPosition.BEFOREEND:
      return container.append(child);
    case renderPosition.AFTERBEGIN:
      return container.prepend(child);
  }
};

export const renderTemplate = (container, template, place = renderPosition.BEFOREEND) => {
  container.insertAdjacentHTML(place, template);
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};


export const updatePoint = (items, update) => {
  debugger
  const index = items.findIndex((item) => item.id === update.id);

  if(index === -1) return items;

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index+1),
  ];
};
