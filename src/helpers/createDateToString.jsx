function createDateToString(created) {
    const date = new Date(created);
    return date.toLocaleDateString('nl-NL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

export default createDateToString;