const fetcher = (cb) => {
    setTimeout(() => {
        cb('data')
    }, 300)
}

const promiseFetcher = (type) => 
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (type === 'throw')
                reject('An error ocurred')
            if (type === 'throw new error')
                reject(new Error('An error ocurred'))
            resolve('promise data')
        }, 400)
    })

describe('fetchers', () => {

    test('fetcher should return data', (done) => {
        expect.assertions(1)

        const callback = (data) => {
            expect(data).toBe('data')
            done()
        }
    
        fetcher(callback)
    })

    test('promiseFetcher should return data', async () => {
        expect.assertions(1)

        return promiseFetcher().then(data => {
            expect(data).toBe('promise data')
        })

        // return expect(promiseFetcher()).resolves.toBe('promise data')

        // try {
        //     const data = await promiseFetcher()
        //     expect(data).toBe('promise data')
        // } catch (error) {
        //     throw error
        //     // expect(error).toMatch('error')
        // }

        // await expect(promiseFetcher()).resolves.toBe('promise data')
    })

    test('promiseFetcher should fails', () => {
        expect.assertions(1)

        return promiseFetcher('throw').catch(error => {
            expect(error).toMatch(/error/)
        })

        // return expect(promiseFetcher()).resolves.toBe('promise data')

        // try {
        //     const data = await promiseFetcher()
        //     expect(data).toBe('promise data')
        // } catch (error) {
        //     throw error
        //     // expect(error).toMatch('error')
        // }

        // await expect(promiseFetcher()).resolves.toBe('promise data')
    })

    test('promiseFetcher should fails rejects version', () => {
        expect.assertions(1)

        return expect(promiseFetcher('throw')).rejects.toMatch(/error/)
    })

    test('promiseFetcher should fails rejects instance', () => {
        expect.assertions(1)

        return expect(promiseFetcher('throw new error')).rejects.toThrow('error')
    })
    
})

