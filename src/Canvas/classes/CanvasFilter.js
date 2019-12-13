export class CanvasFilter {
    constructor() {
        this.reset();
    }

    getFilter() {
        return this.filter;
    }

    reset() {
        this.filter = "none";
        this.filterArray = [];
    }

    addCustomFilter(value) {
        this.addFilter(value);
    }

    addBlur(length) {
        this.addFilter(`blur(${length}px)`);
    }

    addBrightness(percentage) {
        this.addFilter(`brightness(${percentage}%)`);
    }

    addContrast(percentage) {
        this.addFilter(`contrast(${percentage}%)`);
    }

    addDropShadow(offsetX, offsetY, radius, color) {
        this.addFilter(`drop-shadow(${offsetX}px ${offsetY}px ${radius}px ${color})`);
    }

    addGrayscale(percentage) {
        this.addFilter(`grayscale(${percentage}%)`);
    }

    hueRotation(degree) {
        this.addFilter(`hue-rotate(${degree}deg)`);
    }

    invert(percentage) {
        this.addFilter(`invert(${percentage}%)`);
    }

    opacity(percentage) {
        this.addFilter(`opacity(${percentage}%)`);
    }

    saturation(percentage) {
        this.addFilter(`saturation(${percentage}%)`);
    }

    sepia(percentage) {
        this.addFilter(`sepia(${percentage}%)`);
    }

    addFilter(filter) {
        this.filterArray.push(filter);
        this.filter = this.filterArray.join(" ");
    }
}
