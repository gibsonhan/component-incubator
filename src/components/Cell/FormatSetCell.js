export default function FormatSetCell({ value }) {
    if (!value) return <></>
    let str = ''
    value.forEach(ele => str += ' ' + ele)
    return <>{str}</>
}