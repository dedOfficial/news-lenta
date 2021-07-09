

export default function highlightFiltered(filter, str) {
    if (!filter) return str;

    const regexp = new RegExp(filter, 'ig');
    const matchValue = str.match(regexp);

    if (matchValue) {
        return str.split(regexp).map((s, index, arr) => {
            if(index < arr.length - 1) {
                const c = matchValue.shift();
                return <span key={index}>
                    {s}<span style={{backgroundColor: "yellow", whiteSpace: "nowrap"}}>{c}</span>
                </span>
            }
            return s;
        })
    }
    return str;
}