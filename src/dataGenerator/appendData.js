function randNum(range) {
    return Math.floor(Math.random() * Math.floor(range))
}

function appendSetData(data, id, newData) {
    return data.map((obj, indx) => {
        if (indx % 7 === 0) {
            //every indice w/ remainder 0 add entire set of data
            return { ...obj, [id]: newData }
        }

        let a = randNum(newData.length)
        let b = randNum(newData.length)
        //when a > b: a - b -> produces an empty array []
        //currently Nested Filter assumes that empty rows are undefined
        let arr = newData.slice(a, b)
        return { ...obj, [id]: arr.length === 0 ? isEmpty(newData) : arr }
    })

    function isEmpty(arr) {
        return randNum(2) === 1
            ? [arr[randNum(arr.length)]]
            : undefined
    }
}

function appendData(data, id, newData) {
    return data.map(obj => {
        let a = randNum(newData.length)
        return { ...obj, [id]: newData[a] }
    })
}

export {
    appendSetData,
    appendData,
}