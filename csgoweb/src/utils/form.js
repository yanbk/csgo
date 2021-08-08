export const formData = (data) => {
    let form = new FormData()
    for (let key in data) {
        form.append(key, data[key])
    }
    return form
}