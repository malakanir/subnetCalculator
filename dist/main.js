import { toDotted } from "./core/format.js";
import { prefixToMask } from "./core/ip.js";
import { parseMask, parseSubnetFields } from "./core/input.js";
import { computeSubnet } from "./core/subnet.js";
import { getFormElements } from "./ui/form.js";
import { renderError, renderResult } from "./ui/render.js";
const DEFAULT_ADDRESS = "192.168.10.37";
const DEFAULT_MASK = "/26";
function getOutput() {
    const output = document.getElementById("subnet-output");
    if (!output)
        throw new Error("Subnet output container is missing (#subnet-output).");
    return output;
}
function start() {
    const elements = getFormElements();
    const { form, addressInput, maskInput, cidrInput, cidrValue } = elements;
    const output = getOutput();
    /** Show the prefix on the slider and its label. */
    function showPrefix(prefix) {
        cidrInput.value = String(prefix);
        cidrValue.textContent = `/${prefix}`;
    }
    /** Recalculate from the current field values and redraw the results. */
    function refresh() {
        const parsed = parseSubnetFields(addressInput.value, maskInput.value);
        if (!parsed.ok) {
            renderError(output, parsed.error);
            return;
        }
        renderResult(output, computeSubnet(parsed.value.address, parsed.value.prefix));
    }
    /** Typing in the mask field moves the slider when the mask is valid. */
    function onMaskTyped() {
        const parsed = parseMask(maskInput.value);
        if (parsed.ok)
            showPrefix(parsed.value);
        refresh();
    }
    /** Moving the slider rewrites the mask field as a dotted mask. */
    function onSliderMoved() {
        const prefix = Number(cidrInput.value);
        maskInput.value = toDotted(prefixToMask(prefix));
        showPrefix(prefix);
        refresh();
    }
    addressInput.addEventListener("input", refresh);
    maskInput.addEventListener("input", onMaskTyped);
    cidrInput.addEventListener("input", onSliderMoved);
    form.addEventListener("submit", (event) => event.preventDefault());
    if (addressInput.value.trim() === "")
        addressInput.value = DEFAULT_ADDRESS;
    if (maskInput.value.trim() === "")
        maskInput.value = DEFAULT_MASK;
    const initial = parseMask(maskInput.value);
    if (initial.ok) {
        showPrefix(initial.value);
        maskInput.value = toDotted(prefixToMask(initial.value));
    }
    refresh();
}
start();
