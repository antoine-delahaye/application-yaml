function getIndexName(input) {
    return input.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_').toLowerCase()
}

export default getIndexName
