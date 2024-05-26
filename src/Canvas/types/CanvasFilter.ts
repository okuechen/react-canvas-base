export class CanvasFilter {
    protected filter: string = "";
    protected filterArray: string[] = [];

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

    addCustomFilter(value: string) {
        this.addFilter(value);
    }

    addBlur(length: number) {
        this.addFilter(`blur(${length}px)`);
    }

    addBrightness(percentage: number) {
        this.addFilter(`brightness(${percentage}%)`);
    }

    addContrast(percentage: number) {
        this.addFilter(`contrast(${percentage}%)`);
    }

    addDropShadow(offsetX: number, offsetY: number, radius: number, color: string) {
        this.addFilter(`drop-shadow(${offsetX}px ${offsetY}px ${radius}px ${color})`);
    }

    addGrayscale(percentage: number) {
        this.addFilter(`grayscale(${percentage}%)`);
    }

    hueRotation(degree: number) {
        this.addFilter(`hue-rotate(${degree}deg)`);
    }

    invert(percentage: number) {
        this.addFilter(`invert(${percentage}%)`);
    }

    opacity(percentage: number) {
        this.addFilter(`opacity(${percentage}%)`);
    }

    saturation(percentage: number) {
        this.addFilter(`saturation(${percentage}%)`);
    }

    sepia(percentage: number) {
        this.addFilter(`sepia(${percentage}%)`);
    }

    protected addFilter(filter: string) {
        this.filterArray.push(filter);
        this.filter = this.filterArray.join(" ");
    }
}
