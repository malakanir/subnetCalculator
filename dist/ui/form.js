/** DOM access for the input form. Only this module knows the element ids. */
export function getFormElements() {
    const form = document.getElementById("subnet-form");
    const addressInput = document.getElementById("subnet-address");
    const maskInput = document.getElementById("subnet-mask");
    const cidrInput = document.getElementById("subnet-cidr");
    const cidrValue = document.getElementById("subnet-cidr-value");
    if (!(form instanceof HTMLFormElement) ||
        !(addressInput instanceof HTMLInputElement) ||
        !(maskInput instanceof HTMLInputElement) ||
        !(cidrInput instanceof HTMLInputElement) ||
        !(cidrValue instanceof HTMLElement)) {
        throw new Error("Subnet form markup is missing one of the required element ids.");
    }
    return { form, addressInput, maskInput, cidrInput, cidrValue };
}
