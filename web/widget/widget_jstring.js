/**
 * File: widget_spinner.js
 * Project: Jovimetrix
 */

import { app } from "/scripts/app.js"
import * as util from '../core/util.js'

export const JStringWidget = (app, inputName, inputData) => {
    const fontSize = 16
    const w = {
        name: inputName,
        type: inputData[0],

        draw: function (ctx, node, widgetWidth, widgetY, height) {
            shared.offsetDOMWidget(this, ctx, node, widgetWidth, widgetY, height)
        },
        computeSize(width) {
            if (!this.value) {
                return [32, 32]
            }
            if (!width) {
                console.debug(`No width ${this.parent.size}`)
            }
            let dimensions
            withFont(app.ctx, `${fontSize}px monospace`, () => {
                dimensions = calculateTextDimensions(app.ctx, this.value, width)
            })
            const widgetWidth = Math.max(width || this.width || 32, dimensions.maxLineWidth)
            const widgetHeight = dimensions.textHeight * 1.5
            return [widgetWidth, widgetHeight]
        },
        onRemoved: function () {
            if (this.inputEl) {
                this.inputEl.remove()
            }
        },
        get value() {
            return this.inputEl.innerHTML
        },
        set value(val) {
            this.inputEl.innerHTML = val
            this.parent?.setSize?.(this.parent?.computeSize())
        },
    }

    w.inputEl = document.createElement('p')
    w.inputEl.style = `
        text-align: center;
        font-size: ${fontSize}px;
        color: var(--input-text);
        line-height: 0;
        font-family: monospace;
    `
    w.value = val
    document.body.appendChild(w.inputEl)
    return w
}

const widgets = {
    name: "jovimetrix.widget.jstring",
    async getCustomWidgets(app) {
        return {
            JSTRING: (node, inputName, inputData, app) => ({
                widget: node.addCustomWidget(JStringWidget(app, inputName, inputData)),
            })
        }
    }
}
app.registerExtension(widgets)
