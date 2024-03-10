
export const isElement = (element: HTMLElement | any) => {
    return typeof element === 'object' && element.nodeType === 1
}

export function createElement(
    tagName: string,
    options: Record<string, string>,
    children?: Record<string, string> | HTMLElement
    ) {
    const el = document.createElement(tagName);

    if (!options) {
        return el
    }


    if (typeof options === 'object') {
        const className = options.className

        if (Array.isArray(className)) {
          el.classList.add(...className);
        } else if (className) {
          el.classList.add(className);
        }

        Object.keys(options).forEach((attrName) => {
        if (attrName !== 'className') {
            el[attrName] = options[attrName];
        }
        });
    }
  
    return el;
  }