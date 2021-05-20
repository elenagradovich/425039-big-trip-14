import Abstract from '../views/abstract';
import { RenderPosition } from '../const';

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
    case RenderPosition.BEFOREEND:
      return container.append(child);
    case RenderPosition.AFTERBEGIN:
      return container.prepend(child);
  }
};

export const renderTemplate = (container, template, place = RenderPosition.BEFOREEND) => {
  container.insertAdjacentHTML(place, template);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

