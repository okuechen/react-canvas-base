export class CanvasFont {
    constructor(size, family = "Arial", style = "normal", weight = "normal") {
        this.fontStyle = style;
        this.fontWeight = weight;
        this.fontSize = size;
        this.fontFamily = family;
    }
}
