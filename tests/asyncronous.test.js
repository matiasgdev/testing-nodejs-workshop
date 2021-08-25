const fetcher = (cb) => {
    setTimeout(() => {
        cb('data')
    }, 300)
}

describe('fetchers', () => {
    test('fetcher should return data', () => {
        const callback = (data) => {
            expect(data).toBe('data')
        }
    
        fetcher(callback)
    })
})

