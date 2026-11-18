import { toDotted, toDottedBinary } from "../core/format.js";
const KIND_LABELS = {
    network: "Normal subnet",
    "point-to-point": "Point-to-point (RFC 3021)",
    "single-host": "Single host (RFC 3021)",
};
function rowsFor(info) {
    return [
        ["Address", toDotted(info.address)],
        ["Network", toDotted(info.network)],
        ["Broadcast", toDotted(info.broadcast)],
        ["Subnet mask", `${toDotted(info.mask)} (/${info.prefix})`],
        ["Mask (binary)", toDottedBinary(info.mask)],
        ["Wildcard mask", toDotted(info.wildcard)],
        ["First usable", toDotted(info.firstUsable)],
        ["Last usable", toDotted(info.lastUsable)],
        ["Usable hosts", info.usableHosts.toLocaleString("en-US")],
        ["Total addresses", info.totalAddresses.toLocaleString("en-US")],
        ["Subnet type", KIND_LABELS[info.kind]],
        ["Class", info.addressClass],
        ["Private (RFC 1918)", info.isPrivate ? "Yes" : "No"],
    ];
}
/** Replace the output area with a result table. Values use textContent only. */
export function renderResult(output, info) {
    output.replaceChildren();
    const table = document.createElement("table");
    const body = document.createElement("tbody");
    for (const [label, value] of rowsFor(info)) {
        const row = document.createElement("tr");
        const th = document.createElement("th");
        th.scope = "row";
        th.textContent = label;
        const td = document.createElement("td");
        td.textContent = value;
        row.append(th, td);
        body.append(row);
    }
    table.append(body);
    output.append(table);
}
/** Show an error message in the output area. */
export function renderError(output, message) {
    output.replaceChildren();
    const p = document.createElement("p");
    p.className = "error";
    p.setAttribute("role", "alert");
    p.textContent = message;
    output.append(p);
}
